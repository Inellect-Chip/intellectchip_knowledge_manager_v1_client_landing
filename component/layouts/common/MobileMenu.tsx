"use client";

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import NavLinks from './NavLinks';
import AuthButtons from './AuthButtons';

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="lg:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-secondary-foreground hover:text-primary transition-colors"
                aria-label="Toggle Menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {isOpen && (
                <div className="absolute top-20 left-0 right-0 bg-background border-b border-secondary/20 p-6 flex flex-col gap-8 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
                    <NavLinks className="flex-col items-start gap-6" />
                    <hr className="border-secondary/10" />
                    <AuthButtons className="flex-col items-stretch gap-4" />
                </div>
            )}
        </div>
    );
};

export default MobileMenu;
