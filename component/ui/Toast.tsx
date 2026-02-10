"use client";

import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

export interface ToastProps {
    id: string;
    message: string;
    type?: 'success' | 'error';
    onDismiss: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id, message, type = 'success', onDismiss }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss(id);
        }, 3000); // Auto dismiss after 3 seconds

        return () => clearTimeout(timer);
    }, [id, onDismiss]);

    return (
        <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 border border-secondary/20 rounded-xl shadow-lg p-4 min-w-[300px] animate-in slide-in-from-bottom-5 duration-300">
            {type === 'success' ? (
                <CheckCircle className="text-green-500 shrink-0" size={20} />
            ) : (
                <XCircle className="text-red-500 shrink-0" size={20} />
            )}
            <p className="flex-1 text-sm font-medium text-foreground">{message}</p>
            <button
                onClick={() => onDismiss(id)}
                className="text-secondary-foreground hover:text-foreground transition-colors"
            >
                <X size={16} />
            </button>
        </div>
    );
};

export default Toast;
