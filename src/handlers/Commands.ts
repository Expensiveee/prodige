/* eslint-disable @typescript-eslint/no-var-requires */
import * as fs from 'fs';
import { Prodige } from '..';
import { ProdigeCommand } from '../interfaces/Command';
import { ProdigePermissions } from '../enums/Permissions';
import { ProdigeHandler } from '../interfaces/Handler';
import { ProdigeArgumentType } from '../enums/ArgumentType';
import { ProdigeChannelType } from '../enums/ChannelsType';

export const handleCommands = (client: Prodige): Promise<ProdigeHandler> => {
  return new Promise((resolve, reject) => {
    //If a commandDir is specified in the config use it instead of the default dir
    const commandsDir = client.config.commandsDir
      ? `${client.dir}/${client.config.commandsDir}`
      : `${client.dir}/commands`;
    if (!fs.existsSync(commandsDir)) fs.mkdirSync(commandsDir);

    const commandsFiles = fs
      .readdirSync(commandsDir)
      .filter(file => file.endsWith('.ts') || file.endsWith('.js'));
    try {
      for (let i = 0; i < commandsFiles.length; i++) {
        const file = commandsFiles[i];
        const command: ProdigeCommand =
          require(`${commandsDir}/${file}`).default ?? require(`${commandsDir}/${file}`);

        if (!command.name || typeof command.name != 'string') {
          return reject({
            success: false,
            message: `You forgot to specify a command name in: ${file}`,
          });
        }
        if (!command.run || typeof command.run != 'function') {
          return reject({
            success: false,
            message: `You forgot to specify a run function in: ${file}`,
          });
        }

        if (command.cooldown && !command.cooldown.delay) {
          return reject({
            success: false,
            message: `You enabled cooldown in "${file}" but haven't specified a delay`,
          });
        }
        if (command.cooldown && typeof command.cooldown?.delay != 'number') {
          return reject({
            success: false,
            message: `Cooldown delay in "${file}" must be a number`,
          });
        }
        if (
          command.cooldown?.rolesBypass &&
          !Array.isArray(command.cooldown.rolesBypass)
        ) {
          return reject({
            success: false,
            message: `Cooldown roleBypass in "${file}" must be an array of role ids (string)`,
          });
        }
        if (command.cooldown?.rolesBypass) {
          command.cooldown?.rolesBypass.forEach(roleBypassId => {
            if (typeof roleBypassId != 'string') {
              return reject({
                success: false,
                message: `"${roleBypassId}" in "${file}" must be a number`,
              });
            }
          });
        }

        if (command.globalCooldown && typeof command.globalCooldown != 'number') {
          return reject({
            success: false,
            message: `globalCooldown in "${file}" must a number`,
          });
        }

        if (command.channels && !Array.isArray(command.channels)) {
          return reject({
            success: false,
            message: `Channels in "${file}" must be an array of channel ids (string)`,
          });
        }
        if (command.channels) {
          command.channels.forEach(channelId => {
            if (typeof channelId != 'string') {
              return reject({
                success: false,
                message: `"${channelId}" in "${file}" must be a string`,
              });
            }
          });
        }
        if (command.deleteMessage && typeof command.deleteMessage != 'boolean') {
          return reject({
            success: false,
            message: `deleteMessage in "${file}" must a boolean`,
          });
        }
        if (command.ownerOnly && typeof command.ownerOnly != 'boolean') {
          return reject({
            success: false,
            message: `ownerOnly in "${file}" must be a boolean`,
          });
        }
        if (command.ownerOnly && !client.config.ownerId) {
          return reject({
            success: false,
            message: `You enabled ownerOnly in "${file}" but haven't set an ownerId in your config file`,
          });
        }
        if (command.roles && !Array.isArray(command.roles)) {
          return reject({
            success: false,
            message: `Roles in "${file}" must be an array of role ids (string)`,
          });
        }
        if (command.roles) {
          command.roles.forEach(roleId => {
            if (typeof roleId != 'string') {
              return reject({
                success: false,
                message: `"${roleId}" in "${file}" must be a string`,
              });
            }
          });
        }
        if (command.permissions && !Array.isArray(command.permissions)) {
          return reject({
            success: false,
            message: `Permissions in "${file}" must be an array of Permissions Flags (string)`,
          });
        }
        if (command.permissions) {
          command.permissions?.forEach(permission => {
            if (typeof permission != 'string') {
              return reject({
                success: false,
                message: `"${permission}" in "${file}" must be a string`,
              });
            } else if (!Object.values(ProdigePermissions).includes(permission)) {
              return reject({
                success: false,
                message: `"${permission}" in "${file}" doesn't exist as a permission flag`,
              });
            }
          });
        }

        if (command.botPermissions && !Array.isArray(command.botPermissions)) {
          return reject({
            success: false,
            message: `botPermissions in "${file}" must be an array of Permissions Flags (string)`,
          });
        }
        if (command.botPermissions) {
          command.botPermissions?.forEach(permission => {
            if (typeof permission != 'string') {
              return reject({
                success: false,
                message: `"${permission}" in "${file}" must be a string`,
              });
            } else if (!Object.values(ProdigePermissions).includes(permission)) {
              return reject({
                success: false,
                message: `"${permission}" in "${file}" doesn't exist as a permission flag`,
              });
            }
          });
        }

        if (command.aliases && !Array.isArray(command.aliases)) {
          return reject({
            success: false,
            message: `Aliases in "${file}" must an array of strings`,
          });
        }

        if (command.args && !Array.isArray(command.args)) {
          return reject({
            success: false,
            message: `Args in "${file}" must an array of ProdigeArguments`,
          });
        }

        if (command.dmOnly) {
          if (typeof command.dmOnly != 'boolean') {
            return reject({
              success: false,
              message: `dmOnly in "${file}" must be a boolean`,
            });
          }
          if (!client.options.partials?.includes('CHANNEL')) {
            return reject({
              success: false,
              message:
                'You need to enable the "CHANNEl" partial in order to use dmOnly commands',
            });
          }
        }

        if (command.args) {
          command.args.forEach(arg => {
            if (typeof arg.type == 'undefined') {
              return reject({
                success: false,
                message: `Argument type of "${arg.name}" in "${file}" can't be undefined`,
              });
            }
            if (!Object.values(ProdigeArgumentType).includes(arg.type)) {
              if (!Object.values(ProdigeChannelType).includes(arg.type)) {
                return reject({
                  success: false,
                  message: `Argument type "${arg.type}" of "${arg.name}" in "${file}" isn't a valid argument type`,
                });
              }
            }
            if (command.dmOnly && !['string', 'number'].includes(arg.type)) {
              return reject({
                success: false,
                message:
                  'dmOnly commands are not allowed to have an argument type other than "string" or "number"',
              });
            }
          });
        }

        client.commands.set(command.name, command);
        if (command.aliases) {
          command.aliases?.forEach(aliase => {
            if (typeof aliase == 'string') {
              client.aliases.set(aliase, command.name);
            } else {
              client.console.warn(
                `"${aliase}" in "${file}" was not added as an aliases. Must be a string`,
              );
            }
          });
        }
      }
      resolve({ success: true });
    } catch (err) {
      return reject({ success: false, message: err });
    }
  });
};
