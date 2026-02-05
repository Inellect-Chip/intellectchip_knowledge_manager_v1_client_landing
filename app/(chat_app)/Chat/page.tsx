import React from 'react';

const ChatPage = () => {
    return (
        <div className="p-8 h-full flex flex-col gap-6">
            <header>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Chat Dashboard
                </h1>
                <p className="text-secondary-foreground mt-2">
                    Start a new conversation or continue your research.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 overflow-y-auto">
                <div className="p-6 rounded-2xl border border-secondary/10 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-lg">New Chat</h3>
                    <p className="text-sm text-secondary-foreground mt-1">Start a fresh AI-powered analysis.</p>
                </div>
                <div className="p-6 rounded-2xl border border-secondary/10 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-lg">Knowledge Base</h3>
                    <p className="text-sm text-secondary-foreground mt-1">Explore your saved insights and documents.</p>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;