'use server';

import { NextResponse } from 'next/server';
import {
  InteractionResponseType,
} from 'discord-interactions';

export async function ban(body: any): Promise<NextResponse> {
  const { member, data } = body;
  const options = data.options.reduce((acc: any, option: any) => {
    acc[option.name] = option.value;
    return acc;
  }, {});
  
  const userId = options.user;
  const reason = options.reason || 'No reason provided.';

  // In a real implementation, you would make an API call to Discord to ban the user.
  // For now, we'll just acknowledge the command.
  
  console.log(`Simulating BAN on user ${userId} for reason: "${reason}" by ${member.user.username}`);

  return NextResponse.json({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `Okay, user with ID ${userId} would be banned for: ${reason}`,
    },
  });
}
