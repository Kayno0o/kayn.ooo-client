import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

interface LTIconLinkProps {
  className?: string
  href: string
  icon: IconProp
  ariaLabel?: string
}

function LTIconLink(props: LTIconLinkProps) {
  return (
    <Link className="h-full" href={props.href} aria-label={props.ariaLabel} target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon className="h-full" icon={props.icon} color="#fff" />
    </Link>
  )
}

export default LTIconLink
