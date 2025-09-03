import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { PwaInstaller } from '@/components/PwaInstaller';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'رفيق',
  description: 'تطبيقك اليومي للأذكار ليطمئن قلبك بذكر الله',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'رفيق',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/icons/icon-192x192.png',
    shortcut: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
};

import { Alegreya } from 'next/font/google';

const alegreya = Alegreya({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-alegreya',
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={alegreya.variable} suppressHydrationWarning>
      <body className="font-body">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
