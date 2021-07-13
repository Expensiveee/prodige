import { helpMenu } from './../utils/helpMenu';
import { ProdigeCommand } from '../interfaces/Command';
let menu: string | null;

export default {
  name: 'help',
  args: [{ name: 'command', type: 'string' }],
  run: async ({ client, message, args, prefix }) => {
    if (!args.command) {
      if (!menu) menu = helpMenu(client, prefix);
      message.reply({
        embeds: [
          {
            author: {
              name: `Prefix: ${prefix}`,
            },
            title: 'Help Menu',
            description: menu,
            thumbnail: {
              url: client.user?.avatarURL() ?? '',
            },
            footer: {
              text: `Requested by: ${message.author.id}`,
              icon_url: message.author.avatarURL({ dynamic: true }) ?? '',
            },
          },
        ],
      });
    } else {
      const commandCategory = client.commands.get(args.command)?.category;
      const command = client.categories
        .get(commandCategory ?? '')
        ?.find(cmd => cmd.name === args.command);
      if (!command) {
        message.reply({
          embeds: [
            {
              title: 'Command not found',
              color: client.colors.RED,
              footer: {
                text: `Requested by: ${message.author.id}`,
                icon_url: message.author.avatarURL({ dynamic: true }) ?? '',
              },
            },
          ],
        });
      } else {
        const name = `**Name:** ${command?.name}\n`;
        const aliases = command?.aliases
          ? `**Aliases:** ${command?.aliases.join(', ')}\n`
          : '';
        const description = command?.description
          ? `**Description:** ${command?.description}\n`
          : '';
        const usage = command?.usage ? `**Usage:** ${prefix}${command?.usage}\n` : '';
        message.reply({
          embeds: [
            {
              title: 'Informations',
              description: name + aliases + description + usage,
              color: client.colors.ORANGE,
              footer: {
                text: `Requested by: ${message.author.id}`,
                icon_url: message.author.avatarURL({ dynamic: true }) ?? '',
              },
            },
          ],
        });
      }
    }
  },
} as ProdigeCommand;
