import { Client, ClientOptions, Collection } from 'discord.js';
import { ProdigeConfig } from './interfaces/Config';
import { ProdigeCommand, ProdigeCommandCategory } from './interfaces/Command';
import { ProdigeColors } from './enums/Colors';
import { messageEvent } from './events/message';
import { handleCommands } from './handlers/Commands';
import { handleEvents } from './handlers/Events';
import { handleConfig } from './handlers/Config';
import { ProdigeEvent } from './interfaces/Event';
import { ProdigeHandler } from './interfaces/Handler';
import { getPath } from './utils/getPath';
import { prefixSchema } from './schemas/prefix';
import { loadPrefixes } from './utils/loadPrefixes';
import { ProdigePrefixData } from './interfaces/MongoDB';
import { sortCategories } from './utils/sortCategories';
import { mongo } from './utils/mongoConnect';
import help from './commands/help';
import setprefix from './commands/setprefix';
import consola from 'consola';

class Prodige extends Client {
  public console = consola;
  public colors = ProdigeColors;
  public config!: ProdigeConfig;
  public commands: Collection<string, ProdigeCommand> = new Collection();
  public aliases: Collection<string, string> = new Collection();
  public events: Collection<string, ProdigeEvent> = new Collection();
  public cooldowns: Collection<string, number> = new Collection();
  public globalCooldowns: Collection<string, number> = new Collection();
  public categories: Collection<string, ProdigeCommandCategory[]> = new Collection();
  public dir: string | undefined;
  public prefixes: Record<string, string[]> = {};
  public clientOptions!: ClientOptions;
  constructor(options: ClientOptions) {
    super(options);
    this.clientOptions = options;
  }

  public async start(configFile: ProdigeConfig): Promise<void> {
    this.config = configFile;
    this.dir = await getPath();
    //Adding default events
    this.on(messageEvent.name, messageEvent.run.bind(null, this));

    //Checking the config, commands and events
    const config: ProdigeHandler = await handleConfig(this).catch(err => {
      this.console.fatal(err);
      return err;
    });
    if (config?.success) {
      const commands: ProdigeHandler = await handleCommands(this).catch(err => {
        this.console.fatal(err);
        return err;
      });
      if (commands?.success) {
        if (this.commands.size == 0) {
          this.console.warn('0 command loaded');
        } else {
          this.console.success(`${this.commands.size} command(s) successfully loaded`);
        }
        //Adding default commands if not disabled or overwritten
        if (
          this.config?.defaultCommands?.setprefix != false &&
          !this.commands.get('setprefix') &&
          this.config.prefixPerServer
        ) {
          this.commands.set(setprefix.name, setprefix);
        }

        if (this.config?.defaultCommands?.help != false && !this.commands.get('help')) {
          sortCategories(this);
          this.commands.set(help.name, help);
        }

        const events: ProdigeHandler = await handleEvents(this).catch(err => {
          this.console.fatal(err);
          return err;
        });
        if (events?.success) {
          if (this.events.size == 0) {
            this.console.warn('0 event loaded');
          } else {
            this.console.success(`${this.events.size} event(s) successfully loaded`);
          }
          this.login(this.config.token).then(() => {
            if (this.config?.prefixPerServer) {
              loadPrefixes(this).catch((err: string) => this.console.fatal(err));
            }
          });
        }
      }
    }
  }

  public setPrefix(
    guildId: string | undefined,
    prefix: string,
  ): Promise<ProdigePrefixData> {
    return new Promise(resolve => {
      if (!this.config?.mongodbURI) {
        return resolve({ success: false, data: { error: 'No MongoDb URI' } });
      }

      if (!this.config.prefixPerServer) {
        return resolve({
          success: false,
          data: { error: '"prefixPerServer" must be set to true' },
        });
      }

      if (!guildId) {
        return resolve({
          success: false,
          data: { error: 'guildId can not be null' },
        });
      }

      mongo(this.config.mongodbURI).then(async mongoose => {
        try {
          await prefixSchema
            .findOneAndUpdate(
              { _id: guildId },
              { _id: guildId, prefix },
              { upsert: true },
            )
            .then((data: { _id: string; prefix: string }) => {
              this.prefixes[guildId] = [prefix];
              //Mongoose returns null if the prefix is set for the first time
              //So lets "manually" send the previous prefix wich is in the config
              resolve({
                success: true,
                data: data ?? { _id: guildId, prefix: this.config?.prefix },
              });
            })
            .catch((error: string) => {
              resolve({ success: false, data: { error } });
            });
        } finally {
          mongoose.connection.close();
        }
      });
    });
  }

  public getGuildPrefix(guildId: string): string[] {
    return this.prefixes[guildId] ?? this.config?.prefix;
  }
}

export { Prodige };
