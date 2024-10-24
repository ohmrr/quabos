import { InteractionContextType, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import Command from '../../interfaces/command';
import emojiMap from '../../utils/emojiMap';
import add from './channels/add';
import list from './channels/list';
import remove from './channels/remove';
import resetlog from './resetlog';

const config: Command = {
  data: new SlashCommandBuilder()
    .setName('config')
    .setDescription('Manage bot configuration.')
    .setContexts(InteractionContextType.Guild)
    .setDefaultMemberPermissions(
      PermissionFlagsBits.ManageGuild & PermissionFlagsBits.ManageMessages,
    )
    .addSubcommandGroup(channels =>
      channels
        .setName('channels')
        .setDescription('Manage channel settings for Quabos.')
        .addSubcommand(add.data)
        .addSubcommand(list.data)
        .addSubcommand(remove.data),
    )
    .addSubcommand(resetlog.data),
  usage: `${add.usage}\n${remove.usage}\n${list.usage}`,
  execute: async interaction => {
    if (!interaction.guild) return;

    const commandGroup = interaction.options.getSubcommandGroup();
    const subcommand = interaction.options.getSubcommand();
    if (!subcommand) {
      await interaction.reply(
        `${emojiMap.error.cross} Error getting the command group or subcommand.`,
      );
      return;
    }

    if (subcommand === 'reset-log') {
      await resetlog.execute(interaction);
      return;
    }

    switch (commandGroup) {
      case 'channels':
        switch (subcommand) {
          case 'add':
            await add.execute(interaction);
            break;
          case 'list':
            await list.execute(interaction);
            break;
          case 'remove':
            await remove.execute(interaction);
            break;
          default:
            await interaction.reply(`${emojiMap.error.denied} Subcommand not found.`);
            break;
        }
        break;

      default:
        await interaction.reply(
          `${emojiMap.error.cross} Error executing or finding subcommand group.`,
        );
        break;
    }
  },
};

export default config;
