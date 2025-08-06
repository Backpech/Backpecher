import 'dotenv/config';
import { PING_COMMAND, HELLO_COMMAND, BAN_COMMAND, MUTE_COMMAND, JAM_COMMAND } from './commands.js';
import { DiscordRequest } from './utils.js';

if (!process.env.DISCORD_APPLICATION_ID) {
  throw new Error('DISCORD_APPLICATION_ID is not set in your .env file.');
}

// The command list to register.
const ALL_COMMANDS = [PING_COMMAND, HELLO_COMMAND, BAN_COMMAND, MUTE_COMMAND, JAM_COMMAND];

async function registerCommands(appId, commands) {
  const endpoint = `applications/${appId}/commands`;
  try {
    const res = await DiscordRequest(endpoint, { method: 'PUT', body: commands });
    const data = await res.json();
    console.log('Successfully registered all commands:', data.map(c => c.name).join(', '));
  } catch (err) {
    console.error('Error registering commands:', err);
  }
}

await registerCommands(process.env.DISCORD_APPLICATION_ID, ALL_COMMANDS);
