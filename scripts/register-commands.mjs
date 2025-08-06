import 'dotenv/config';
import { DiscordRequest } from './utils.js';

// Simple test command
const TEST_COMMAND = {
  name: 'ping',
  description: 'Replies with pong!',
  type: 1,
};

const HELLO_COMMAND = {
  name: 'hello',
  description: 'Replies with a friendly greeting!',
  type: 1,
};

const ALL_COMMANDS = [TEST_COMMAND, HELLO_COMMAND];

async function installGlobalCommands(appId, commands) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    const res = await DiscordRequest(endpoint, { method: 'PUT', body: commands });
    const data = await res.json();
    console.log('Installed global commands:');
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error installing global commands:', err);
  }
}

if (!process.env.DISCORD_APPLICATION_ID) {
    console.error('DISCORD_APPLICATION_ID is not set in your .env file.');
    process.exit(1);
}

installGlobalCommands(process.env.DISCORD_APPLICATION_ID, ALL_COMMANDS);
