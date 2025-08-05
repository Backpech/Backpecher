'use server';

/**
 * @fileOverview Suggests roles based on user activity or profiles.
 *
 * - suggestRoles - A function that suggests roles for a user.
 * - SuggestRolesInput - The input type for the suggestRoles function.
 * - SuggestRolesOutput - The return type for the suggestRoles function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRolesInputSchema = z.object({
  userProfile: z
    .string()
    .describe('The user profile, including information about their interests, activities, and roles on other servers.'),
  serverActivity: z
    .string()
    .describe('The user activity on the server, including channels visited, messages sent, and reactions used.'),
  existingRoles: z
    .array(z.string())
    .describe('The list of existing roles on the server.'),
});
export type SuggestRolesInput = z.infer<typeof SuggestRolesInputSchema>;

const SuggestRolesOutputSchema = z.object({
  suggestedRoles: z
    .array(z.string())
    .describe('The list of suggested roles for the user, based on their profile and activity.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the role suggestions, explaining why each role is appropriate for the user.'),
});
export type SuggestRolesOutput = z.infer<typeof SuggestRolesOutputSchema>;

export async function suggestRoles(input: SuggestRolesInput): Promise<SuggestRolesOutput> {
  return suggestRolesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRolesPrompt',
  input: {schema: SuggestRolesInputSchema},
  output: {schema: SuggestRolesOutputSchema},
  prompt: `You are a Discord server administrator assistant. Given a user's profile, their activity on the server, and the existing roles on the server, you will suggest roles for the user that are appropriate for them.

User Profile:
{{{userProfile}}}

Server Activity:
{{{serverActivity}}}

Existing Roles:
{{#each existingRoles}}{{{this}}}\n{{/each}}

Based on this information, suggest roles for the user, and explain why each role is appropriate for them.
`,
});

const suggestRolesFlow = ai.defineFlow(
  {
    name: 'suggestRolesFlow',
    inputSchema: SuggestRolesInputSchema,
    outputSchema: SuggestRolesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
