"use client";

import React from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';

interface MessageBubbleProps {
    role: 'user' | 'ai';
    content: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ role, content }) => {
    const isUser = role === 'user';

    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
            <div className={`flex max-w-[80%] md:max-w-[70%] gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar - Only for AI */}
                {!isUser && (
                    <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center overflow-hidden">
                        <Image src="/logo/intellectchip.png" alt="AI" width={32} height={32} />
                    </div>
                )}

                {/* Message Content */}
                <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} justify-center`}>
                    <div className={`text-sm md:text-base leading-relaxed ${isUser
                        ? 'px-5 py-3 rounded-2xl rounded-tr-sm bg-neutral-700/50 text-white'
                        : 'py-1 px-0 text-foreground'
                        }`}>
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
