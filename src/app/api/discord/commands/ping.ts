'use server';

import { NextResponse } from 'next/server';
import { InteractionResponseType } from 'discord-interactions';

export async function ping(body: any): Promise<NextResponse> {
  return NextResponse.json({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: 'pong!',
    },
  });
}
