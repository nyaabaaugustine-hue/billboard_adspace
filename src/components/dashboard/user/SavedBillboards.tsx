import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BillboardCard } from '@/components/BillboardCard';
import { billboards } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';

export function SavedBillboards({ className }: { className?: string }) {
  const savedBillboards = billboards.slice(3, 6); // Mock data

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-6 w-6" />
          Saved Billboards
        </CardTitle>
        <CardDescription>Your favorite billboards, ready for your next campaign.</CardDescription>
      </CardHeader>
      <CardContent>
        {savedBillboards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedBillboards.map(billboard => (
              <BillboardCard key={billboard.id} billboard={billboard} />
            ))}
          </div>
        ) : (
            <p className="text-muted-foreground text-sm text-center py-8">You haven't saved any billboards yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
