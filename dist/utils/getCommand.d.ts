import { Prodige } from '..';
import { Message } from 'discord.js';
import { ProdigeMessageCommand } from '../interfaces/MessageCommand';
export declare const getCommand: (client: Prodige, message: Message, prefix: string) => ProdigeMessageCommand;
