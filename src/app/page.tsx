import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { Icons } from '@/components/icons';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <Icons.logo className="h-20 w-20 text-primary" />
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Welcome to Backpech-Bot
          </h1>
          <p className="text-lg text-muted-foreground">
            The intelligent way to manage your Discord server roles.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Button asChild size="lg" className="w-full max-w-xs shadow-lg shadow-primary/20 transition-transform duration-200 hover:scale-105">
            <Link href="/dashboard">
              <LogIn className="mr-2 h-5 w-5" />
              Login with Discord
            </Link>
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">
            By logging in, you agree to sync your roles.
          </p>
        </div>
      </div>
    </div>
  );
}
