'use client';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import { Download } from 'lucide-react';

export function PwaInstaller() {
    const { toast } = useToast();
    const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };
        
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            (deferredPrompt as any).prompt();
            (deferredPrompt as any).userChoice.then(({ outcome }: { outcome: 'accepted' | 'dismissed' }) => {
                if (outcome === 'accepted') {
                    toast({ title: "تم التثبيت بنجاح!"});
                }
                setDeferredPrompt(null);
            });
        }
    };

    if (!deferredPrompt) {
        return null;
    }

    return (
        <Button onClick={handleInstallClick} variant="outline" size="sm" className="hidden md:inline-flex">
           <Download className="ms-2 h-4 w-4"/>
           تثبيت التطبيق
        </Button>
    );
}
