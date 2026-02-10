import React from 'react';
import Link from 'next/link';

const NavLinks = ({ className = "" }) => {
    const links = [
        { name: 'Home', href: '/' },
        { name: 'Philosophy', href: '/philosophy' },
        { name: 'About Us', href: '/about' },
    ];

    return (
        <nav className={`flex items-center gap-8 ${className}`}>
            {links.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium text-secondary-foreground hover:text-primary transition-colors"
                >
                    {link.name}
                </Link>
            ))}
        </nav>
    );
};

export default NavLinks;
