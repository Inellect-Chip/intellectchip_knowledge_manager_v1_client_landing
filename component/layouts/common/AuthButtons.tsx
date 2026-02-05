import React from 'react';
import Link from 'next/link';

const AuthButtons = ({ className = "" }) => {
    return (
        <div className={`flex items-center gap-4 ${className}`}>
            <Link
                href="/login"
                className="text-sm font-medium text-secondary-foreground hover:text-primary transition-colors px-4 py-2"
            >
                Login
            </Link>
            <Link
                href="/register"
                className="text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-all px-6 py-2.5 rounded-full shadow-sm hover:shadow-md"
            >
                Registration
            </Link>
        </div>
    );
};

export default AuthButtons;
