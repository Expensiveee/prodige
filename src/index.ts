import { Client, ClientOptions, Collection } from 'discord.js';
import consola from 'consola';
import { ProdigeConfig } from './interfaces/Config';
import { ProdigeCommand } from './interfaces/Command';
import { ProdigeColors } from './enums/Colors';
import { event } from './events/message';
import { handleCommands } from './loaders/Commands';
import { handleEvents } from './loaders/Events';
import { handleConfig } from './loaders/Config';
import { ProdigeEvent } from './interfaces/Event';
import { ProdigeHandler } from './interfaces/Handler';
import { getPath } from './utils/getPath';

class Prodige extends Client {
  public console = consola;
  public colors = ProdigeColors;
  public config!: ProdigeConfig;
  public commands: Collection<string, ProdigeCommand> = new Collection();
  public aliases: Collection<string, string> = new Collection();
  public events: Collection<string, ProdigeEvent> = new Collection();
  public cooldowns: Collection<string, number> = new Collection();
  public dir: string | undefined;
  constructor(options: ClientOptions) {
    super(options);
  }

  public async start(configFile: ProdigeConfig): Promise<void> {
    this.config = configFile;
    this.dir = await getPath();
    //Adding the default on message event for command handling
    this.on(event.name, event.run.bind(null, this));

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
        const events: ProdigeHandler = await handleEvents(this).catch(err => {
          this.console.fatal(err);
          return err;
        });
        if (events?.success) {
          //Login if all the checks are valid
          this.login(this.config.token);
        }
      }
    }
  }
}

export { Prodige };
