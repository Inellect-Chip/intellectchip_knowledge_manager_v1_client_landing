"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { Plus, ArrowRight } from 'lucide-react';
import AddResourceModal from '@/component/features/chat/AddResourceModal';
import Toast, { ToastProps } from '@/component/ui/Toast';

const ChatPage = () => {
    const params = useParams();
    const { user } = useUser();

    // State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toasts, setToasts] = useState<ToastProps[]>([]);

    const addToast = (message: string, type: 'success' | 'error' = 'success') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, message, type, onDismiss: dismissToast }]);
    };

    const dismissToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    const handleAddResource = (url: string) => {
        console.log("Adding resource:", url);
        // Here you would typically call your API
        addToast("Resource added successfully! Processing started.", "success");
    };

    return (
        <div className="relative h-full flex flex-col items-center justify-center p-8 text-center max-w-4xl mx-auto">
            {/* Top Right: Add Resource Button */}
            <div className="absolute top-8 right-8">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-transparent border border-secondary/20 hover:bg-secondary/10 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                >
                    <Plus size={16} />
                    Add Resource
                </button>
            </div>

            {/* Centered Content */}
            <div className="flex flex-col items-left gap-2 w-full max-w-2xl">
                {/* Welcome Message */}

                <div className="flex items-left gap-3">
                    <div className="h-16 w-16 rounded-lg flex items-left justify-left overflow-hidden">
                        <Image src="/logo/intellectchip.png" alt="Logo" width={100} height={100} />
                    </div>
                    <div>
                        <div className="flex items-left gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <span className="text-lg font-medium text-secondary-foreground">
                                Welcome, {user?.firstName} {user?.lastName}
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-2xl md:text-3xl md:text-left font-bold tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-100">
                            What do you want to learn today?
                        </h1>
                    </div>
                </div>

                {/* Input Area */}
                <div className="w-full relative mt-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                    <div className="relative group">
                        <textarea
                            className="w-full bg-transparent border border-secondary/20 rounded-2xl p-4 pr-14 text-[16px] focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none min-h-[120px] shadow-sm hover:shadow-md hover:border-secondary/40"
                            placeholder="Ask a question..."
                        />
                        <button className="absolute bottom-4 right-4 p-2 bg-white dark:bg-zinc-800 text-foreground hover:bg-hover dark:hover:bg-zinc-700 rounded-full transition-colors shadow-sm hover:shadow border border-secondary/10 cursor-pointer">
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modals & Toasts */}
            <AddResourceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddResource}
            />

            <div className="fixed bottom-8 right-8 flex flex-col gap-2 z-50">
                {toasts.map(toast => (
                    <Toast key={toast.id} {...toast} />
                ))}
            </div>
        </div>
    );
};

export default ChatPage;
