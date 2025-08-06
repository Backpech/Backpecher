import 'dotenv/config';
import { PING_COMMAND, HELLO_COMMAND } from './commands.js';
import { DiscordRequest } from './utils.js';

async function registerCommands() {
  if (!process.env.DISCORD_APPLICATION_ID) {
    console.error('DISCORD_APPLICATION_ID is not set in your .env file.');
    process.exit(1);
  }

  const allCommands = [PING_COMMAND, HELLO_COMMAND];
  try {
    const endpoint = `applications/${process.env.DISCORD_APPLICATION_ID}/commands`;
    // This is a global command. It may take up to 1 hour to show up in the server.
    const res = await DiscordRequest(endpoint, { method: 'PUT', body: allCommands });
    const data = await res.json();
    console.log('Successfully registered all commands:', data);
  } catch (err) {
    console.error('Error registering commands:', err);
  }
}

registerCommands();
