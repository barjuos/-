import Link from 'next/link';
import { KaabaIcon } from '@/components/icons';
import { ThemeToggle } from '@/components/ThemeToggle';
import { PwaInstaller } from './PwaInstaller';

export function Header() {
  return (
    <header className="py-6 px-4 container mx-auto flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3 text-foreground">
            <KaabaIcon className="h-8 w-8 text-primary" />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <PwaInstaller />
        <ThemeToggle />
      </div>
    </header>
  );
}
