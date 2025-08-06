'use server';

import { NextResponse } from 'next/server';
import {
  InteractionResponseType,
} from 'discord-interactions';

export async function mute(body: any): Promise<NextResponse> {
  const { member, data } = body;
  const options = data.options.reduce((acc: any, option: any) => {
    acc[option.name] = option.value;
    return acc;
  }, {});

  const userId = options.user;
  const duration = options.duration;
  const reason = options.reason || 'No reason provided.';
  
  // In a real implementation, you would make an API call to Discord to mute the user.
  // For now, we'll just acknowledge the command.

  console.log(`Simulating MUTE on user ${userId} for ${duration} because: "${reason}" by ${member.user.username}`);

  return NextResponse.json({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `Okay, user with ID ${userId} would be muted for ${duration}. Reason: ${reason}`,
    },
  });
}
