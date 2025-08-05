import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

const users = [
  {
    name: 'BytePioneer',
    avatar: 'https://placehold.co/100x100.png',
    roles: ['Admin', 'Developer', 'Early Supporter'],
    initial: 'BP',
  },
  {
    name: 'CodeWrangler',
    avatar: 'https://placehold.co/100x100.png',
    roles: ['Moderator', 'Gamer'],
    initial: 'CW',
  },
  {
    name: 'PixelMaverick',
    avatar: 'https://placehold.co/100x100.png',
    roles: ['Member', 'Designer', 'Music Enthusiast'],
    initial: 'PM',
  },
  {
    name: 'SynthWave',
    avatar: 'https://placehold.co/100x100.png',
    roles: ['Member', 'Gamer'],
    initial: 'SW',
  },
    {
    name: 'DataGuardian',
    avatar: 'https://placehold.co/100x100.png',
    roles: ['Moderator', 'VIP'],
    initial: 'DG',
  },
  {
    name: 'GlitchArtist',
    avatar: 'https://placehold.co/100x100.png',
    roles: ['Member', 'Artist'],
    initial: 'GA',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of synced users and their roles.
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user, index) => (
          <Card key={index}>
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
          </Card>
        ))}
      </div>
    </div>
  );
}
