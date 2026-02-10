"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { Plus, ArrowRight, Send } from 'lucide-react';
import AddResourceModal from '@/component/features/chat/AddResourceModal';
import Toast, { ToastProps } from '@/component/ui/Toast';
import MessageBubble from '@/component/features/chat/MessageBubble';

interface Message {
    role: 'user' | 'ai';
    content: string;
}

const ChatPage = () => {
    const params = useParams();
    const { user } = useUser();

    // State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toasts, setToasts] = useState<ToastProps[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const hasStarted = messages.length > 0;

    // Scroll to bottom on new message
    useEffect(() => {
        if (hasStarted) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, hasStarted]);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`; // Set new height, max 200px
        }
    }, [input]);

    const addToast = (message: string, type: 'success' | 'error' = 'success') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, message, type, onDismiss: dismissToast }]);
    };

    const dismissToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    const handleAddResource = (url: string) => {
        console.log("Adding resource:", url);
        addToast("Resource added successfully! Processing started.", "success");
    };

    const handleSendMessage = () => {
        if (!input.trim()) return;

        // Add user message
        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        // Simulate AI Response (delayed)
        setTimeout(() => {
            const aiMessage: Message = {
                role: 'ai',
                content: "I'm processing your request. This is a simulated response to demonstrate the chat interface."
            };
            setMessages(prev => [...prev, aiMessage]);
        }, 1000);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="relative h-full flex flex-col bg-background">
            {/* Top Right: Add Resource Button (Always visible) */}
            <div className="absolute top-6 right-8 z-10">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-transparent border border-secondary/20 hover:bg-secondary/10 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                >
                    <Plus size={16} />
                    Add Resource
                </button>
            </div>

            {/* Main Content Area */}
            <div className={`flex-1 overflow-y-auto px-4 custom-scrollbar ${hasStarted ? 'pb-32 pt-20' : 'flex items-center justify-center p-8'}`}>

                {!hasStarted ? (
                    /* Initial Centered View */
                    <div className="flex flex-col items-left gap-2 w-full max-w-2xl text-center md:text-left">
                        <div className="flex items-left gap-3">
                            <div className="h-16 w-16 rounded-lg flex items-left justify-left overflow-hidden">
                                <Image src="/logo/intellectchip.png" alt="Logo" width={100} height={100} />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    <span className="text-lg font-medium text-secondary-foreground">
                                        Welcome, {user?.firstName} {user?.lastName}
                                    </span>
                                </div>
                                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-100">
                                    What do you want to learn today?
                                </h1>
                            </div>
                        </div>

                        {/* Initial Input Area */}
                        <div className="w-full relative mt-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                            <div className="relative group">
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="w-full bg-transparent border border-secondary/20 rounded-2xl p-4 pr-14 text-[16px] focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none min-h-[120px] shadow-sm hover:shadow-md hover:border-secondary/40"
                                    placeholder="Ask a question..."
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="absolute bottom-4 right-4 p-2 bg-white dark:bg-zinc-800 text-foreground hover:bg-hover dark:hover:bg-zinc-700 rounded-full transition-colors shadow-sm hover:shadow border border-secondary/10 cursor-pointer"
                                >
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Chat History View */
                    <div className="w-full max-w-3xl mx-auto flex flex-col">
                        {messages.map((msg, index) => (
                            <MessageBubble key={index} role={msg.role} content={msg.content} />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Bottom Input Area (Only visible when chat has started) */}
            {hasStarted && (
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-background via-background to-transparent pt-10 pb-8 px-4">
                    <div className="max-w-3xl mx-auto relative">
                        <div className="relative flex items-end gap-2 bg-secondary/5 border border-secondary/20 rounded-2xl p-2 shadow-lg backdrop-blur-sm">
                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full bg-transparent border-none text-base focus:outline-none resize-none max-h-[200px] py-3 px-4"
                                placeholder="Message Intellect Chip..."
                                rows={1}
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={!input.trim()}
                                className="p-2 mb-1 mr-1 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                        <p className="text-xs text-center text-secondary-foreground/50 mt-2">
                            AI can make mistakes. Check important info.
                        </p>
                    </div>
                </div>
            )}

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
