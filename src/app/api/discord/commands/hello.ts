'use server';

import { NextResponse } from 'next/server';
import {
  InteractionResponseType,
  InteractionResponseFlags,
} from 'discord-interactions';

export async function hello(body: any): Promise<NextResponse> {
  return NextResponse.json({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `Hello there!`,
      flags: InteractionResponseFlags.EPHEMERAL,
    },
  });
}
