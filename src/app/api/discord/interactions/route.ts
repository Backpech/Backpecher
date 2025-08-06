// A simple handler for Discord interactions (slash commands)
// https://discord.com/developers/docs/interactions/receiving-and-responding

import { NextResponse } from 'next/server';
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
} from 'discord-interactions';

// TODO: Implement signature verification
// import { verifyKey } from 'discord-interactions';

export async function POST(req: Request) {
  const body = await req.json();
  const { type, id, data } = body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return NextResponse.json({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    // This is where you'll handle your commands
    if (name === 'ping') {
      return NextResponse.json({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: 'pong!',
        },
      });
    }

    // Example of an ephemeral message
    if (name === 'hello') {
        return NextResponse.json({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `Hello there!`,
                flags: InteractionResponseFlags.EPHEMERAL,
            },
        });
    }
  }

  // Fallback for unhandled interactions
  return new NextResponse('Unhandled interaction type', { status: 404 });
}
