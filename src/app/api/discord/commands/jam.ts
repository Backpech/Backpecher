'use server';

import { createJamPlaylist } from '@/ai/flows/create-jam-playlist';
import { NextResponse } from 'next/server';
import { InteractionResponseType } from 'discord-interactions';

export async function jam(body: any): Promise<NextResponse> {
  const { member, data } = body;
  const options =
    data.options?.reduce((acc: any, option: any) => {
      acc[option.name] = option.value;
      return acc;
    }, {}) || {};

  const topic = options.topic || 'músicas para codificar';

  try {
    const playlist = await createJamPlaylist(topic);

    const embed = {
      title: `🎧 Spotify Jam: ${topic}`,
      description: `Aqui está uma playlist gerada por IA para nossa JAM!`,
      color: 0x1db954, // Cor verde do Spotify
      fields: playlist.songs.map((song, index) => ({
        name: `${index + 1}. ${song.title}`,
        value: `*por ${song.artist}*`,
        inline: false,
      })),
      footer: {
        text: `Jam iniciada por ${member.user.username}`,
      },
    };

    return NextResponse.json({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        embeds: [embed],
      },
    });
  } catch (error) {
    console.error('Erro ao criar a playlist da JAM:', error);
    return NextResponse.json({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `Desculpe, não consegui gerar a playlist. Tente novamente mais tarde.`,
      },
    });
  }
}
