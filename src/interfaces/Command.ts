import { Message, PermissionResolvable } from 'discord.js';
import { Prodige } from '..';
import { ProdigeArgument } from './Argument';
import { ProdigeCooldown } from './Cooldown';

interface ProdigeRunFunction {
  ({
    client,
    message,
    args,
    command,
  }: {
    client: Prodige;
    message: Message;
    args: Record<string, unknown> | undefined;
    command: ProdigeCommand;
  }): Promise<unknown>;
}

export interface ProdigeCommand {
  name: string;
  run: ProdigeRunFunction;
  args?: Array<ProdigeArgument>;
  aliases?: Array<string>;
  cooldown?: ProdigeCooldown;
  ownerOnly?: boolean;
  channels?: Array<string>;
  roles?: Array<string>;
  permissions?: Array<PermissionResolvable>;
  deleteMessage?: boolean;
}
