import { EmbedBuilder, InteractionContextType, SlashCommandBuilder } from 'discord.js';
import type Command from '../interfaces/command';

const avatar: Command = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Display the avatar of the selected server member.')
    .setContexts(InteractionContextType.Guild)
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('A user in the current server.')
        .setRequired(false),
    ),
  usage: '/avatar [user]',
  execute: async interaction => {
    if (!interaction.guild) return;

    const user = interaction.options.getUser('user', false) ?? interaction.user;
    const avatarEmbed = new EmbedBuilder({
      author: {
        name: user.username,
        iconURL: user.displayAvatarURL({ size: 4096 }),
      },
      image: {
        url: user.avatarURL({ size: 4096 }) || '',
      },
      timestamp: Date.now(),
    });

    await interaction.reply({ embeds: [avatarEmbed] });
  },
};

export default avatar;
