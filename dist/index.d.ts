import { Client, ClientOptions, Collection } from 'discord.js';
import { ProdigeConfig } from './interfaces/Config';
import { ProdigeCommand, ProdigeCommandCategory } from './interfaces/Command';
import { ProdigeColors } from './enums/Colors';
import { ProdigeEvent } from './interfaces/Event';
import { ProdigePrefixData } from './interfaces/MongoDB';
declare class Prodige extends Client {
    console: import("consola").Consola;
    colors: typeof ProdigeColors;
    config: ProdigeConfig;
    commands: Collection<string, ProdigeCommand>;
    aliases: Collection<string, string>;
    events: Collection<string, ProdigeEvent>;
    cooldowns: Collection<string, number>;
    categories: Collection<string, ProdigeCommandCategory[]>;
    dir: string | undefined;
    prefixes: Record<string, string[]>;
    clientOptions: ClientOptions;
    constructor(options: ClientOptions);
    start(configFile: ProdigeConfig): Promise<void>;
    setPrefix(guildId: string | undefined, prefix: string): Promise<ProdigePrefixData>;
    getGuildPrefix(guildId: string): string[];
}
export { Prodige };
