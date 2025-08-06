'use server';

import { NextResponse } from 'next/server';
import {
  InteractionResponseType,
} from 'discord-interactions';

export async function jam(body: any): Promise<NextResponse> {
  const { member, data } = body;
  const options = data.options?.reduce((acc: any, option: any) => {
    acc[option.name] = option.value;
    return acc;
  }, {}) || {};

  const topic = options.topic || 'anything';

  // In a real implementation, you would make an API call to Spotify.
  // For now, we'll just acknowledge the command.
  
  console.log(`${member.user.username} is starting a Spotify Jam about "${topic}"`);

  return NextResponse.json({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `Let's start a Spotify Jam! Now playing music about: **${topic}**. (This is a simulation)`,
    },
  });
}
