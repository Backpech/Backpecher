'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Bot, ShieldCheck, BarChart2 } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/admin', label: 'Admin Panel', icon: ShieldCheck },
  { href: '/dashboard/ai-suggestions', label: 'AI Suggestions', icon: Bot },
  { href: '/dashboard/reports', label: 'Reports', icon: BarChart2 },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-border">
      <div className="flex items-center space-x-2 px-4 sm:px-6 lg:px-8">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-2 px-3 py-3 text-sm font-medium transition-colors',
                isActive
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
