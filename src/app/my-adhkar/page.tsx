import { MyAdhkarClient } from '@/components/MyAdhkarClient';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';

export default function MyAdhkarPage() {
  return (
    <>
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
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-4">
                أذكاري الخاصة
            </h1>
            <p className="text-lg text-muted-foreground">
                أضف الأذكار التي تهمك لتصل إليها بسهولة.
            </p>
        </div>
        <MyAdhkarClient />
      </main>
    </>
  );
}
