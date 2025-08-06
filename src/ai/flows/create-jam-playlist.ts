'use server';

/**
 * @fileOverview Sugere uma playlist de músicas para uma JAM do Spotify.
 *
 * - createJamPlaylist - Gera uma lista de músicas com base em um tópico.
 * - CreateJamPlaylistOutput - O tipo de retorno para a funo.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SongSchema = z.object({
  title: z.string().describe('O título da música.'),
  artist: z.string().describe('O artista ou banda da música.'),
  spotifyId: z.string().describe('O ID da faixa no Spotify. Deve ser um ID válido, se conhecido.'),
});

const CreateJamPlaylistOutputSchema = z.object({
  songs: z.array(SongSchema).describe('Uma lista de 5 a 7 músicas para a playlist.'),
});

export type CreateJamPlaylistOutput = z.infer<typeof CreateJamPlaylistOutputSchema>;

export async function createJamPlaylist(topic: string): Promise<CreateJamPlaylistOutput> {
  return createJamPlaylistFlow(topic);
}

const prompt = ai.definePrompt({
  name: 'createJamPlaylistPrompt',
  input: { schema: z.string() },
  output: { schema: CreateJamPlaylistOutputSchema },
  prompt: `Você é um DJ especialista e curador de música. Sua tarefa é criar uma playlist curta (de 5 a 7 músicas) baseada em um tópico ou gênero fornecido.

Para cada música, forneça o título, o artista e o ID da faixa do Spotify.

Tópico da JAM: {{{input}}}

Gere uma lista de músicas que se encaixam perfeitamente neste tópico.
`,
});

const createJamPlaylistFlow = ai.defineFlow(
  {
    name: 'createJamPlaylistFlow',
    inputSchema: z.string(),
    outputSchema: CreateJamPlaylistOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
