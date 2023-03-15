import React from 'react';
import Link from 'next/link';
import Container from '../../base/Container';
import NavbarLink from './NavbarLink';

export function Header() {
  return (
    <header className="fixed w-full border-b border-white bg-black">
      <Container className="flex items-center gap-12 py-2">
        <Link href="/" className="text-2xl font-bold">
          Kayn.ooo
        </Link>

        <nav className="flex gap-6">
          <NavbarLink href="/">Home</NavbarLink>
          <NavbarLink href="/games">Games</NavbarLink>
          <NavbarLink href="/l">Links</NavbarLink>
        </nav>
      </Container>
    </header>
  );
}
