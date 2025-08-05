'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { handleSuggestionRequest } from './actions';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Sparkles, Loader2, Lightbulb } from 'lucide-react';
import type { SuggestRolesOutput } from '@/ai/flows/suggest-roles';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  userProfile: z.string().min(10, 'Please provide a more detailed user profile.'),
  serverActivity: z.string().min(10, 'Please provide more details on server activity.'),
  existingRoles: z.string().min(3, 'Please list at least one existing role.'),
});

export default function AiSuggestionsPage() {
  const [suggestion, setSuggestion] = useState<SuggestRolesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userProfile: '',
      serverActivity: '',
      existingRoles: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    const result = await handleSuggestionRequest(values);

    if (result.success && result.data) {
      setSuggestion(result.data);
    } else {
      setError(result.error || 'An unknown error occurred.');
    }
    setIsLoading(false);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot /> AI Role Suggester
          </CardTitle>
          <CardDescription>
            Let AI suggest roles for users based on their profile and activity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="userProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Profile</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'Interested in gaming, especially RPGs. Active on weekends. Follows several tech channels.'"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serverActivity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Server Activity</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'Frequently posts in #general and #gaming. Uses a lot of custom emotes. Participated in the last community event.'"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="existingRoles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Existing Server Roles</FormLabel>
                    <FormControl>
                      <Input placeholder="Admin, Moderator, Gamer, Member, VIP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Get Suggestions
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Suggestion Result</CardTitle>
          <CardDescription>
            The AI's analysis will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          {isLoading && (
            <div className="flex flex-col items-center gap-4 text-muted-foreground">
              <Loader2 className="h-10 w-10 animate-spin" />
              <p>Analyzing user data...</p>
            </div>
          )}
          {error && <div className="text-destructive">{error}</div>}
          {suggestion && (
            <div className="w-full space-y-6">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Lightbulb className="text-primary"/>
                  Suggested Roles
                </h3>
                <div className="flex flex-wrap gap-2 pt-2">
                  {suggestion.suggestedRoles.map((role) => (
                    <Badge key={role} variant="default" className="text-base px-3 py-1">{role}</Badge>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold">Reasoning</h3>
                <p className="pt-2 text-muted-foreground whitespace-pre-wrap">{suggestion.reasoning}</p>
              </div>
            </div>
          )}
          {!isLoading && !error && !suggestion && (
            <div className="text-center text-muted-foreground">
              <p>Results will be displayed here once you submit the form.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
