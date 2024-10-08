import Markov from 'markov-strings';
import { Message } from 'discord.js';
import { prisma } from '../..';

export function isValidMessage(message: Message): boolean {
  const startsWithCommandChar = /^[!\/?]/i;
  if (
    startsWithCommandChar.test(message.content) ||
    message.content.split(' ').length < 2
  )
    return false;

  return true;
}

export function normalizeString(content: string): string {
  return content
    .replace(/[^a-zA-Z0-9@#<>&*_~\s]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export async function saveMessage(message: Message) {
  if (!isValidMessage(message) || !message.guild) return;

  const isTrackedChannel = await prisma.channel.findUnique({
    where: { channelId: message.channel.id },
  });
  if (!isTrackedChannel) return;

  const isOptedOutGlobally = await prisma.user.findUnique({
    where: { userId: message.author.id },
  });
  const isOptedOutLocally = await prisma.guildMember.findUnique({
    where: {
      userId_guildId: { userId: message.author.id, guildId: message.guild.id },
    },
  });
  if (isOptedOutGlobally?.ignored || isOptedOutLocally?.ignored) return;

  const content = normalizeString(message.content);

  await prisma.message.create({
    data: {
      content: content,
      messageId: message.id,
      channel: {
        connect: {
          channelId: isTrackedChannel.channelId,
        },
      },
    },
  });
}

export async function getGuildMessages(guildId: string) {
  try {
    const guild = await prisma.guild.findUnique({
      where: {
        guildId: guildId,
      },
      include: { trackedChannels: { include: { messages: true } } },
    });

    if (!guild) {
      return null;
    }

    const messages = guild.trackedChannels
      .flatMap(channel => channel.messages)
      .map(message => message.content);

    return messages;
  } catch (error) {
    console.error('Error fetching guild messages: ', error);
    return null;
  }
}

export async function generateResponse(guildId: string) {
  const messages = await getGuildMessages(guildId);
  if (!messages || messages.length < 50) return null;

  try {
    const markov = new Markov({ stateSize: 2 });
    markov.addData(messages);

    const result = markov.generate({
      maxTries: 150,
      filter: result => result.string.split(' ').length >= 4,
    });

    return result.string;
  } catch (error) {
    return null;
  }
}
