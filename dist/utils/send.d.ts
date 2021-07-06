import { Prodige } from '..';
import { ProdigeCommand } from '../interfaces/Command';
import { Message, MessageEmbed } from 'discord.js';
export declare const send: (embed: MessageEmbed, message: Message, client: Prodige, command?: ProdigeCommand | undefined) => Promise<unknown>;
