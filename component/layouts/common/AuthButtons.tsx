"use client";

import React from 'react';
import Link from 'next/link';
import {
    SignInButton,
    SignUpButton,
    UserButton,
    SignedIn,
    SignedOut,
    useUser
} from "@clerk/nextjs";
import { MessageSquare } from 'lucide-react';

const AuthButtons = ({ className = "" }) => {
    const { user } = useUser();

    const modalAppearance = {
        elements: {
            modalBackdrop: "flex items-center justify-center",
            modalContent: "m-auto",
            card: "mx-auto",
            rootBox: "mx-auto",
        },
    };

    return (
        <div className={`flex items-center gap-6 ${className}`}>
            <SignedOut>
                <SignInButton mode="modal" appearance={modalAppearance}>
                    <button className="text-sm font-medium text-secondary-foreground hover:text-primary transition-colors px-4 py-2 cursor-pointer">
                        Login
                    </button>
                </SignInButton>
                <SignUpButton mode="modal" appearance={modalAppearance}>
                    <button className="text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-all px-6 py-2.5 rounded-md shadow-sm hover:shadow-md cursor-pointer">
                        Registration
                    </button>
                </SignUpButton>
            </SignedOut>
            <SignedIn>
                <div className="flex items-center gap-4">
                    {/* Chat Link */}
                    <Link
                        href="/chat"
                        className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors px-4 py-2 border border-primary/20 rounded-full bg-primary/5 hover:bg-primary/10"
                    >
                        <MessageSquare size={16} />
                        <span className="hidden sm:inline">Chat</span>
                    </Link>

                    {/* Welcome Message */}
                    <div className="flex flex-col items-start lg:items-end">
                        <span className="text-xs text-secondary-foreground">Welcome back,</span>
                        <span className="text-sm font-semibold text-foreground leading-tight">
                            {user?.firstName + " " + user?.lastName || user?.username || 'Guest'}
                        </span>
                    </div>


                    {/* User Profile Button */}
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={modalAppearance}
                        userProfileMode="modal"
                    />
                </div>
            </SignedIn>
        </div>
    );
};

export default AuthButtons;
