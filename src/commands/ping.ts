import { SlashCommandBuilder } from 'discord.js';
import Command from '../interfaces/command';
import emojiMap from '../utils/emojiMap';

const ping: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Get the client and websocket ping.')
    .setDMPermission(false),
  execute: async interaction => {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();
    const clientLatency = reply.createdTimestamp - interaction.createdTimestamp;
    interaction.editReply(
      `${emojiMap.alien} **Client**: ${clientLatency}ms | **Websocket**: ${interaction.client.ws.ping}ms`,
    );
  },
};

export default ping;
