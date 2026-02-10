import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavLinks from './NavLinks';
import AuthButtons from './AuthButtons';
import MobileMenu from './MobileMenu';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-secondary/10 bg-background/80 backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
            <Image
              src="/logo/Logo.png"
              alt="Intellect Chip Logo"
              width={160}
              height={40}
              priority
              className="object-contain"
            />
          </Link>
        </div>

        {/* Middle: Navigation (Hidden on mobile) */}
        <div className="hidden lg:block">
          <NavLinks />
        </div>

        {/* Right: Auth & Mobile Menu */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <AuthButtons />
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
