import { getUsersFromDiscord, type User } from "@/services/discord";
import { UserCard } from "@/components/user-card";

export default async function DashboardPage() {
  const users = await getUsersFromDiscord();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline text-2xl font-bold tracking-tight">User Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of synced users and their roles.
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user: User, index: number) => (
          <UserCard key={index} user={user} />
        ))}
      </div>
    </div>
  );
}
