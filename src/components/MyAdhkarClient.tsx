'use client';
import { useState } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import type { Dhikr } from '@/data/types';
import AdhkarTracker from '@/components/AdhkarTracker';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2, PlusCircle, Play } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

function AddDhikrForm({ onAdd }: { onAdd: (dhikr: Omit<Dhikr, 'id' | 'category'>) => void }) {
  const [content, setContent] = useState('');
  const [count, setCount] = useState(1);
  const [description, setDescription] = useState('');
  const [reference, setReference] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || count < 1) return;
    onAdd({ content, count, description, reference });
    setContent('');
    setCount(1);
    setDescription('');
    setReference('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="content">نص الذكر</Label>
        <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="count">عدد المرات</Label>
        <Input id="count" type="number" value={count} onChange={(e) => setCount(Math.max(1, parseInt(e.target.value, 10)))} min="1" required />
      </div>
      <div>
        <Label htmlFor="description">الفضل أو الوصف</Label>
        <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
       <div>
        <Label htmlFor="reference">المصدر</Label>
        <Input id="reference" value={reference} onChange={(e) => setReference(e.target.value)} />
      </div>
      <DialogClose asChild>
        <Button type="submit" className="w-full">إضافة الذكر</Button>
      </DialogClose>
    </form>
  );
}

export function MyAdhkarClient() {
  const [myAdhkar, setMyAdhkar] = useLocalStorage<Dhikr[]>('my-adhkar', []);
  const [isTracking, setIsTracking] = useState(false);
  const { toast } = useToast();

  const addDhikr = (newDhikr: Omit<Dhikr, 'id' | 'category'>) => {
    const dhikrToAdd: Dhikr = {
      ...newDhikr,
      id: Date.now(),
      category: 'custom',
    };
    setMyAdhkar([...myAdhkar, dhikrToAdd]);
    toast({ title: "تمت الإضافة", description: "تمت إضافة الذكر بنجاح." });
  };

  const deleteDhikr = (id: number) => {
    setMyAdhkar(myAdhkar.filter((d) => d.id !== id));
    toast({ title: "تم الحذف", description: "تم حذف الذكر بنجاح.", variant: "destructive" });
  };

  if (isTracking) {
    return <AdhkarTracker title="أذكاري" adhkar={myAdhkar} />;
  }
  
  if (myAdhkar.length === 0) {
      return (
        <Card className="max-w-md mx-auto p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">قائمتك فارغة</h2>
            <p className="text-muted-foreground mb-6">أضف أول ذكر خاص بك للبدء.</p>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="ms-2 h-4 w-4" />
                        إضافة ذكر جديد
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>إضافة ذكر جديد</DialogTitle>
                    </DialogHeader>
                    <AddDhikrForm onAdd={addDhikr} />
                </DialogContent>
            </Dialog>
        </Card>
      );
  }

  return (
    <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
            <Button onClick={() => setIsTracking(true)} disabled={myAdhkar.length === 0} size="lg">
                <Play className="ms-2 h-5 w-5" />
                بدء القراءة
            </Button>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <PlusCircle className="ms-2 h-4 w-4" />
                        إضافة ذكر
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>إضافة ذكر جديد</DialogTitle>
                    </DialogHeader>
                    <AddDhikrForm onAdd={addDhikr} />
                </DialogContent>
            </Dialog>
        </div>
        <div className="space-y-4">
            {myAdhkar.map(dhikr => (
                <Card key={dhikr.id} className="p-4 flex justify-between items-start gap-4">
                    <div className="flex-1">
                        <p className="font-bold text-lg">{dhikr.content}</p>
                        <p className="text-sm text-muted-foreground">التكرار: {dhikr.count}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteDhikr(dhikr.id)} aria-label="حذف الذكر">
                        <Trash2 className="h-5 w-5 text-destructive" />
                    </Button>
                </Card>
            ))}
        </div>
    </div>
  );
}
