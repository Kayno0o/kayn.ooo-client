import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBurger, faTimes } from '@fortawesome/free-solid-svg-icons'
import { twMerge } from 'tailwind-merge'
import Container from '../../base/Container'
import BaseLink from '../../base/BaseLink'

function Header() {
  const [burger, setBurger] = React.useState(false)

  return (
    <header className="fixed z-10 w-full border-b border-amber-300 bg-black">
      <Container className="flex flex-wrap items-center gap-6 px-0 py-2 md:gap-12">
        <button
          onClick={() => setBurger(!burger)}
          onKeyDown={event => event.key === 'Enter' && setBurger(!burger)}
          className="h-8 w-8 md:hidden"
        >
          <FontAwesomeIcon icon={burger ? faTimes : faBurger} className="h-8 w-8" />
        </button>

        <h1>
          <Link href="/" className="text-2xl font-bold">
            Kaynooo.xyz
          </Link>
        </h1>

        <nav
          className={twMerge(
            'grow flex-col gap-6 md:flex md:flex-row',
            burger ? 'flex basis-full items-center md:basis-[initial] md:text-left' : 'hidden',
          )}
        >
          <BaseLink onClick={() => setBurger(false)} href="/">
            Home
          </BaseLink>
          <BaseLink onClick={() => setBurger(false)} href="/games">
            Games
          </BaseLink>
          <BaseLink onClick={() => setBurger(false)} href="/l">
            Links
          </BaseLink>
          <BaseLink onClick={() => setBurger(false)} href="/contact">
            Contact
          </BaseLink>
          <BaseLink onClick={() => setBurger(false)} href="/r">
            R ?
          </BaseLink>

          <div className="grow" />

          <BaseLink onClick={() => setBurger(false)} href="/admin">
            Admin
          </BaseLink>
        </nav>
      </Container>
    </header>
  )
}

export default Header
