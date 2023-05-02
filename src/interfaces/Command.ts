import { SlashCommandBuilder } from 'discord.js';

export interface Command {
  data: SlashCommandBuilder;
  cooldown?: number;
  permissions?: string[];
  execute: (interaction: any) => Promise<void>;
}
