'use server';

import 'dotenv/config';
import fetch from 'node-fetch';

export async function DiscordRequest(endpoint: string, options: RequestInit) {
  const url = 'https://discord.com/api/v10/' + endpoint;

  if (options.body) {
    options.body = JSON.stringify(options.body);
  }

  if (!process.env.DISCORD_BOT_TOKEN) {
    throw new Error('The DISCORD_BOT_TOKEN environment variable is required.');
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
    },
    ...options,
  });

  if (!res.ok) {
    const data = await res.json();
    console.error('Error from Discord API:', JSON.stringify(data));
    throw new Error(JSON.stringify(data));
  }
  
  // Se a requisição for bem-sucedida mas não tiver conteúdo (ex: 204 No Content), retorna null.
  if (res.status === 204) {
    return null;
  }

  return res.json();
}
