'use server';

// A simple handler for Discord interactions (slash commands)
// https://discord.com/developers/docs/interactions/receiving-and-responding

import {NextResponse} from 'next/server';
import {
  InteractionType,
  InteractionResponseType,
  verifyKey,
} from 'discord-interactions';

// Command imports
import { ping } from '../commands/ping';
import { hello } from '../commands/hello';
import { ban } from '../commands/ban';
import { mute } from '../commands/mute';
import { jam } from '../commands/jam';


// Type for our command handlers
type CommandHandler = (body: any) => Promise<NextResponse>;

// Map command names to their handlers
const commandHandlers: Record<string, CommandHandler> = {
  ping,
  hello,
  ban,
  mute,
  jam,
};


export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get('x-signature-ed25519');
  const timestamp = req.headers.get('x-signature-timestamp');
  const publicKey = process.env.DISCORD_PUBLIC_KEY;

  if (!signature || !timestamp || !publicKey) {
    console.error('Missing signature headers or public key');
    return new NextResponse('Bad request', {status: 400});
  }

  const isValidRequest = verifyKey(
    rawBody,
    signature,
    timestamp,
    publicKey,
  );

  if (!isValidRequest) {
    console.error('Invalid signature');
    return new NextResponse('Invalid signature', {status: 401});
  }

  const body = JSON.parse(rawBody);
  const {type, id, data} = body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return NextResponse.json({type: InteractionResponseType.PONG});
  }

  /**
   * Handle slash command requests by dispatching to the correct handler
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const {name} = data;

    const handler = commandHandlers[name];

    if (handler) {
      try {
        return await handler(body);
      } catch (error) {
        console.error(`Error handling command "${name}":`, error);
        return new NextResponse('Error handling command', { status: 500 });
      }
    } else {
      console.warn(`Unhandled command: ${name}`);
      return new NextResponse('Unhandled command', { status: 404 });
    }
  }

  // Fallback for unhandled interactions
  return new NextResponse('Unhandled interaction type', {status: 404});
}
