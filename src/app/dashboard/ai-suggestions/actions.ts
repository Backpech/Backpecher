'use server';

import { suggestRoles, type SuggestRolesInput, type SuggestRolesOutput } from '@/ai/flows/suggest-roles';
import { z } from 'zod';

const formSchema = z.object({
  userProfile: z.string(),
  serverActivity: z.string(),
  existingRoles: z.string(),
});

type FormState = {
  success: boolean;
  data?: SuggestRolesOutput;
  error?: string;
};

export async function handleSuggestionRequest(
  values: z.infer<typeof formSchema>
): Promise<FormState> {
  try {
    const parsedInput: SuggestRolesInput = {
      ...values,
      existingRoles: values.existingRoles.split(',').map(role => role.trim()).filter(Boolean),
    };

    const result = await suggestRoles(parsedInput);

    if (!result || !result.suggestedRoles) {
      return { success: false, error: 'The AI failed to return a valid suggestion.' };
    }

    return { success: true, data: result };
  } catch (e: any) {
    console.error('AI suggestion request failed:', e);
    return { success: false, error: e.message || 'An unexpected error occurred.' };
  }
}
