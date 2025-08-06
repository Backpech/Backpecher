'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle } from 'lucide-react';

const formSchema = z.object({
  role: z.string().min(1, 'Please select a role.'),
  minDays: z.coerce.number().min(0, 'Minimum days cannot be negative.'),
  minMessages: z.coerce.number().min(0, 'Minimum messages cannot be negative.'),
  enabled: z.boolean().default(true),
});

type Rule = z.infer<typeof formSchema>;

const initialRules: Rule[] = [
  { role: 'Gamer', minDays: 7, minMessages: 50, enabled: true },
  { role: 'VIP', minDays: 30, minMessages: 200, enabled: true },
  { role: 'Moderator', minDays: 90, minMessages: 1000, enabled: false },
];

export default function AdminPage() {
  const { toast } = useToast();
  const [rules, setRules] = useState<Rule[]>(initialRules);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: '',
      minDays: 0,
      minMessages: 0,
      enabled: true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setRules((prevRules) => [...prevRules, values]);
    toast({
      title: 'Rule Saved!',
      description: `Rule for the "${values.role}" role has been successfully saved.`,
    });
    form.reset();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Crie</CardTitle>
          <CardDescription>
            Define automated role assignment rules for new users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role to Assign</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Member">Member</SelectItem>
                        <SelectItem value="Gamer">Gamer</SelectItem>
                        <SelectItem value="Developer">Developer</SelectItem>
                        <SelectItem value="Designer">Designer</SelectItem>
                        <SelectItem value="VIP">VIP</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="minDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Days on Server</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 7" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="minMessages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Messages Sent</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Enable Rule</FormLabel>
                      <FormDescription>
                        Turn this rule on or off for all users.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Rule
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Rules</CardTitle>
          <CardDescription>
            A list of currently configured role assignment rules.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Min Days</TableHead>
                <TableHead>Min Msgs</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map((rule, index) => (
                <TableRow key={`${rule.role}-${index}`}>
                  <TableCell className="font-medium">{rule.role}</TableCell>
                  <TableCell>{rule.minDays}</TableCell>
                  <TableCell>{rule.minMessages}</TableCell>
                  <TableCell>
                    <Badge variant={rule.enabled ? 'default' : 'outline'} className={rule.enabled ? 'bg-green-600' : ''}>
                      {rule.enabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
