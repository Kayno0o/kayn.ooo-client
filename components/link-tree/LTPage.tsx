import React, { useState } from 'react'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { twMerge } from 'tailwind-merge'
import H1 from '../base/H1'
import Meta from '../base/Meta'
import LTShareModal from './LTShareModal'
import LTCustomLink from './LTCustomLink'
import LTIconLink from './LTIconLink'

interface LTPageProps {
  icons: Array<{
    href: string
    icon: IconProp
    label?: string
  }>
  links: Array<{
    children: string
    className?: string
    href: string
    icon: { color: string, icon: IconProp }
    type?: 'copy'
  }>
  profileSrc: string
  title: string
  wallpaperSrc: string
}

function LTPage(props: LTPageProps) {
  const [shareModal, setShareModal] = useState(false)

  return (
    <>
      <Meta title={`${props.title} mes lieux réseaux sociaux`} description={`Liste des liens de réseaux sociaux de ${props.title}. Instagram, Spotify, ... Et bien d'autres liens.`} src={props.profileSrc} />

      <div className="relative flex min-h-screen justify-center">
        <div className={twMerge('absolute inset-0 bg-cover bg-center', props.wallpaperSrc)} />

        <div className="absolute inset-0 bg-black/40" />

        <button
          className="absolute left-6 top-6 z-10 flex cursor-pointer flex-col items-center text-white md:left-12 md:top-12"
          onClick={() => setShareModal(true)}
          aria-label="Share"
        >
          <FontAwesomeIcon className="h-10" icon={faShareAlt} />
          <span className="hidden text-lg font-black md:inline-block">Share</span>
        </button>

        {shareModal && <LTShareModal close={() => setShareModal(false)} />}

        <div className="relative mx-6 flex h-full min-h-screen w-full max-w-2xl flex-col px-6 py-12">
          <div className="flex w-full flex-[1] flex-col items-center justify-between gap-10">
            <div className="flex w-full flex-col items-center gap-8">
              <img src={props.profileSrc} width="160px" height="160px" alt="profile" className="w-40 rounded-full border-2 border-white shadow-md" />

              <H1 className="text-center text-white">{props.title}</H1>
            </div>

            <div className="flex h-8 gap-6">
              {props.icons.map((icon, index) => (
                <LTIconLink href={icon.href} key={index} icon={icon.icon} ariaLabel={icon.label} />
              ))}
            </div>

            <div className="flex w-full flex-[1] flex-col gap-4">
              {props.links.map((link, index) => (
                <LTCustomLink
                  key={index}
                  href={link.href}
                  className={link.className}
                  icon={{ color: link.icon.color, icon: link.icon.icon }}
                  type={link.type}
                >
                  {link.children}
                </LTCustomLink>
              ))}
            </div>

            <Link href="/" className="mt-auto justify-self-end text-2xl font-bold text-slate-200">
              <h2>Kaynooo.xyz</h2>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default LTPage
