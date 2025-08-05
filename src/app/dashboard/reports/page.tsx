import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Download } from 'lucide-react';

const reportData = [
  { user: 'BytePioneer', roles: 'Admin, Developer', status: 'Synced', lastSynced: '2 mins ago' },
  { user: 'CodeWrangler', roles: 'Moderator, Gamer', status: 'Synced', lastSynced: '5 mins ago' },
  { user: 'PixelMaverick', roles: 'Member, Designer', status: 'Synced', lastSynced: '1 hour ago' },
  { user: 'SynthWave', roles: 'Member, Gamer', status: 'Pending', lastSynced: '1 day ago' },
  { user: 'DataGuardian', roles: 'Moderator, VIP', status: 'Synced', lastSynced: '3 hours ago' },
  { user: 'GlitchArtist', roles: 'Member, Artist', status: 'Error', lastSynced: '5 hours ago' },
  { user: 'NetRunner', roles: 'Member', status: 'Synced', lastSynced: '10 mins ago' },
];

export default function ReportsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>User Sync Report</CardTitle>
            <CardDescription>A complete log of all user role synchronizations.</CardDescription>
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Assigned Roles</TableHead>
              <TableHead>Sync Status</TableHead>
              <TableHead>Last Synced</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportData.map((item) => (
              <TableRow key={item.user}>
                <TableCell className="font-medium">{item.user}</TableCell>
                <TableCell>{item.roles}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.status === 'Synced'
                        ? 'default'
                        : item.status === 'Pending'
                        ? 'secondary'
                        : 'destructive'
                    }
                    className={item.status === 'Synced' ? 'bg-green-600' : ''}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.lastSynced}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
