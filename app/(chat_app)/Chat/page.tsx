"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ChatRedirect = () => {
    const router = useRouter();

    useEffect(() => {
        // Generate a 16-digit random numeric ID
        const generateId = () => {
            let id = '';
            for (let i = 0; i < 16; i++) {
                id += Math.floor(Math.random() * 10).toString();
            }
            return id;
        };

        const newId = generateId();
        router.replace(`/Chat/${newId}`);
    }, [router]);

    return (
        <div className="h-screen w-full flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                <p className="text-secondary-foreground animate-pulse text-sm font-medium">
                    Initializing secure chat session...
                </p>
            </div>
        </div>
    );
};

export default ChatRedirect;