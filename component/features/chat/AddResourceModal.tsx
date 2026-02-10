"use client";

import React, { useState } from 'react';
import Modal from '@/component/ui/Modal';
import { Youtube, Link as LinkIcon } from 'lucide-react';

interface AddResourceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (url: string) => void;
}

const AddResourceModal: React.FC<AddResourceModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!url.trim()) {
            setError('Please enter a valid URL');
            return;
        }

        // Basic YouTube URL validation (can be enhanced)
        if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
            setError('Please enter a valid YouTube URL');
            return;
        }

        onAdd(url);
        setUrl('');
        setError('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Resource">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <p className="text-sm text-secondary-foreground">
                    Enter a YouTube video URL to process and add to your knowledge base.
                </p>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Youtube size={16} className="text-red-500" />
                        YouTube URL
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => {
                                setUrl(e.target.value);
                                setError('');
                            }}
                            placeholder="https://www.youtube.com/watch?v=..."
                            className={`w-full bg-secondary/5 border ${error ? 'border-red-500/50 focus:border-red-500' : 'border-secondary/20 focus:border-primary'} rounded-xl px-4 py-3 pl-10 text-sm outline-none transition-all`}
                            autoFocus
                        />
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-foreground/50" size={16} />
                    </div>
                    {error && <span className="text-xs text-red-500">{error}</span>}
                </div>

                <div className="flex items-center justify-end gap-3 mt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/10 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!url.trim()}
                        className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        Add Resource
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AddResourceModal;
