import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  PermissionsBitField,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';

interface Command {
  data:
  | SlashCommandBuilder
  | SlashCommandSubcommandsOnlyBuilder
  | SlashCommandOptionsOnlyBuilder;
  permissions?: PermissionsBitField;
  usage: string;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
  autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;
}

export default Command;
