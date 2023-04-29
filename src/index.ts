import { Client, Collection, GatewayIntentBits } from 'discord.js';
import path from 'path';
import fs from 'fs';
import 'dotenv/config';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);