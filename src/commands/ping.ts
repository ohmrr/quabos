import { Command } from '../interfaces/Command';
import { SlashCommandBuilder } from 'discord.js';

const ping: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong! SO COOL!'),
  execute: async (interaction) => {
    await interaction.reply('Pong!');
  },
};

export default ping;
