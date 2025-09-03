import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';

export default function AdhkarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="p-4 flex justify-between items-center container mx-auto border-b">
        <Header />
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowRight className="h-4 w-4" />
          <span>العودة للرئيسية</span>
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
}
