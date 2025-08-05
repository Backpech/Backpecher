'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@/services/discord";
import { Gavel, MicOff } from "lucide-react";

type UserCardProps = {
  user: User;
};

export function UserCard({ user }: UserCardProps) {
    const { toast } = useToast();

    const handleAction = (action: string) => {
        toast({
            title: `Action: ${action}`,
            description: `Performed ${action.toLowerCase()} on user ${user.name}. (Simulated)`,
        });
        console.log(`Performing action "${action}" on user ${user.name}`);
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center space-x-4 space-y-0 pb-4">
                <Avatar>
                    <AvatarImage src={user.avatar} data-ai-hint="avatar profile" />
                    <AvatarFallback>{user.initial}</AvatarFallback>
                </Avatar>
                <CardTitle>{user.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {user.roles.map((role) => (
                        <Badge key={role} variant="secondary">{role}</Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                 <Button variant="outline" size="sm" onClick={() => handleAction('Mute')}>
                    <MicOff className="mr-2 h-4 w-4" />
                    Mute
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleAction('Ban')}>
                    <Gavel className="mr-2 h-4 w-4" />
                    Ban
                </Button>
            </CardFooter>
        </Card>
    )
}
