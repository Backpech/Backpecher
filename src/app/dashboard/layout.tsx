import { Icons } from '@/components/icons';
import { Navigation } from '@/components/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Icons.logo className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold">RoleSync</h1>
        </div>
      </header>
      <div className="flex flex-1 flex-col">
        <Navigation />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
