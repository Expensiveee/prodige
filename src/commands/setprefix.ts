import { ProdigeCommand } from './../interfaces/Command';
export default {
  name: 'setprefix',
  category: '⚙️ Configuration',
  description: 'Change the actual prefix for this server',
  usage: 'setprefix [prefix]',
  permissions: ['ADMINISTRATOR', 'MANAGE_GUILD'],
  globalCooldown: 21600000,
  args: [{ name: 'prefix', type: 'string', required: true }],
  run: async ({ client, message, args }) => {
    const { prefix } = args;
    client.setPrefix(message.guild?.id, prefix).then(({ success }) => {
      if (success) {
        message.channel.send({
          embeds: [
            {
              title: `Prefix set to \`\`${prefix}\`\``,
              color: client.colors.GREEN,
              footer: {
                text: `Requested by: ${message.author.id}`,
                icon_url: message.author.avatarURL({ dynamic: true }) ?? '',
              },
            },
          ],
        });
      } else {
        message.channel.send({
          embeds: [
            {
              title: 'An unknown error has occured',
              color: client.colors.RED,
              footer: {
                text: `Requested by: ${message.author.id}`,
                icon_url: message.author.avatarURL({ dynamic: true }) ?? '',
              },
            },
          ],
        });
      }
    });
  },
} as ProdigeCommand;
