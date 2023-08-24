import Link from 'next/link'
import type { ReactElement } from 'react'
import React from 'react'

interface NavbarLinkProps {
  children: ReactElement | string
  href: string
}

function NavbarLink(props: NavbarLinkProps) {
  return (
    <Link className="font-bold" href={props.href}>
      {props.children}
    </Link>
  )
}

export default NavbarLink
