"use client";

import React, { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    LogOut,
    Settings,
    User as UserIcon,
    MessageSquare,
    LayoutDashboard,
    BrainCircuit
} from 'lucide-react';
import { useUser, useClerk, SignOutButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { user } = useUser();
    const { openUserProfile } = useClerk();

    const navItems = [
        // { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
        { name: 'New Chat', icon: MessageSquare, href: '/Chat' },
        { name: 'Knowledge', icon: BrainCircuit, href: '/knowledge' },
    ];

    // Mock Chat History (20 items)
    const mockChatHistory = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        title: `Research Analysis #${i + 1}`,
        time: '2 hours ago'
    }));

    return (
        <aside
            className={`relative h-full bg-white dark:bg-zinc-950 border-r border-secondary/10 flex flex-col transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-72'
                }`}
        >
            {/* Sidebar Toggle */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-8 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-secondary/20 bg-white dark:bg-zinc-900 text-secondary-foreground hover:text-hover transition-colors shadow-sm"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            {/* STATIC TOP: Brand / Logo */}
            <div className={`p-6 pb-2 flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                <div className="h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold">
                    <Image src="/logo/intellectchip.png" alt="Logo" width={40} height={40} />
                </div>
                {!isCollapsed && (
                    <span className="font-bold text-lg tracking-tight text-foreground whitespace-nowrap">
                        Intellect Chip
                    </span>
                )}
            </div>

            {/* STATIC TOP: Navigation Links */}
            <nav className="px-3 space-y-1 py-4 border-b border-secondary/5">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${isCollapsed ? 'justify-center' : ''
                            } hover:bg-secondary/20`}
                    >
                        <item.icon
                            size={20}
                            className="text-secondary-foreground group-hover:text-hover transition-colors"
                        />
                        {!isCollapsed && (
                            <span className="text-sm font-medium text-secondary-foreground group-hover:text-hover whitespace-nowrap">
                                {item.name}
                            </span>
                        )}
                    </Link>
                ))}
            </nav>

            {/* SCROLLABLE MIDDLE: Chat History */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-4 space-y-1">
                {!isCollapsed && (
                    <div className="px-3 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-secondary-foreground/50">Recent Chats</span>
                    </div>
                )}
                {mockChatHistory.map((chat) => (
                    <button
                        key={chat.id}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group hover:bg-hover/30 cursor-pointer ${isCollapsed ? 'justify-center' : ''
                            }`}
                    >
                        <MessageSquare
                            size={18}
                            className="text-secondary-foreground group-hover:text-hover shrink-0"
                        />
                        {!isCollapsed && (
                            <div className="flex flex-col items-start overflow-hidden">
                                <span className="text-sm font-medium text-secondary-foreground group-hover:text-hover truncate w-full text-left">
                                    {chat.title}
                                </span>
                                <span className="text-[10px] text-secondary-foreground/40 leading-none mt-1">
                                    {chat.time}
                                </span>
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* STATIC BOTTOM: User Section */}
            <div className="p-4 border-t border-secondary/10 relative bg-white dark:bg-zinc-950">
                <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`w-full flex items-center rounded-xl p-2 hover:bg-secondary/10 transition-colors group ${isCollapsed ? 'justify-center' : 'gap-3'
                        }`}
                >
                    <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-transparent group-hover:ring-hover transition-all shrink-0">
                        {user?.imageUrl ? (
                            <Image
                                src={user.imageUrl}
                                alt="Profile"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="h-full w-full bg-secondary/20 flex items-center justify-center">
                                <UserIcon size={20} className="text-secondary-foreground" />
                            </div>
                        )}
                    </div>

                    {!isCollapsed && (
                        <div className="flex flex-col text-left overflow-hidden">
                            <span className="text-xs text-secondary-foreground leading-tight">Welcome</span>
                            <span className="text-sm font-semibold text-foreground truncate">
                                {user?.firstName && user?.lastName
                                    ? `${user.firstName} ${user.lastName}`
                                    : user?.username || user?.primaryEmailAddress?.emailAddress || 'User'}
                            </span>
                        </div>
                    )}
                </button>

                {/* User Menu Dropdown */}
                {showUserMenu && (
                    <div
                        className={`absolute bottom-full left-4 mb-2 bg-white dark:bg-zinc-900 border border-secondary/20 rounded-2xl shadow-xl p-2 w-56 animate-in slide-in-from-bottom-2 duration-200 z-50`}
                    >
                        <button
                            onClick={() => {
                                openUserProfile();
                                setShowUserMenu(false);
                            }}
                            className="w-full flex items-center gap-3 p-3 text-sm font-medium text-secondary-foreground hover:bg-secondary/10 hover:text-hover rounded-xl transition-colors"
                        >
                            <Settings size={18} />
                            Account Settings
                        </button>
                        <SignOutButton>
                            <button className="w-full flex items-center gap-3 p-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors">
                                <LogOut size={18} />
                                Logout
                            </button>
                        </SignOutButton>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
