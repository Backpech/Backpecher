'use server';

import { NextResponse } from 'next/server';
import {
  InteractionResponseType,
} from 'discord-interactions';
import { DiscordRequest } from '@/lib/discord-api';

export async function ban(body: any): Promise<NextResponse> {
  const { member, data: commandData, guild_id } = body;
  const options = commandData.options.reduce((acc: any, option: any) => {
    acc[option.name] = option.value;
    return acc;
  }, {});
  
  const userId = options.user;
  const reason = options.reason || 'Nenhuma razão fornecida.';

  const banEndpoint = `guilds/${guild_id}/bans/${userId}`;

  try {
    // Executa a chamada de API para banir o usuário
    await DiscordRequest(banEndpoint, { 
      method: 'PUT',
      body: { delete_message_seconds: 60 * 60 * 24 * 7, reason } // Exclui mensagens dos últimos 7 dias
    });
    
    console.log(`User ${userId} banned successfully from guild ${guild_id} by ${member.user.username}. Reason: ${reason}`);

    return NextResponse.json({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `✅ O usuário <@${userId}> foi banido com sucesso. Razão: ${reason}`,
      },
    });

  } catch (error) {
    console.error('Failed to ban user:', error);
    
    // Fornece um feedback de erro mais útil para o usuário
    return NextResponse.json({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `❌ Falha ao banir o usuário <@${userId}>. Verifique se o bot tem a permissão "Banir Membros" e se o cargo do bot está acima do cargo do usuário que você está tentando banir.`,
      },
    });
  }
}
