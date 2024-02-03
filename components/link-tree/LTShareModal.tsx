import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faFacebookF,
  faFacebookMessenger,
  faLinkedinIn,
  faTwitter,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'
import { faChevronRight, faEnvelope, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface LTShareModalProps {
  close: () => void
}

function LTShareModal(props: LTShareModalProps) {
  const url = document.URL
  const source = 'kaynooo_linktree_profile_share'

  const shareLinks: Array<{ icon: IconProp, link: string, name: string }> = [
    {
      icon: faFacebookF,
      link: `https://www.facebook.com/sharer.php?u=${url}?utm_source=${source}`,
      name: 'Facebook',
    },
    {
      icon: faLinkedinIn,
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${url}?utm_source=${source}`,
      name: 'LinkedIn',
    },
    {
      icon: faTwitter,
      link: `https://twitter.com/intent/tweet?text=${url}?utm_source=${source}`,
      name: 'Twitter',
    },
    {
      icon: faWhatsapp,
      link: `https://wa.me/?text=${url}?utm_source=${source}`,
      name: 'WhatsApp',
    },
    {
      icon: faFacebookMessenger,
      link: 'https://www.messenger.com/new',
      name: 'Messenger',
    },
    {
      icon: faEnvelope,
      link: `mailto:?subject=Regarde cette page de fou !&body=${url}?utm_source=${source}`,
      name: 'Email',
    },
  ]

  return (
    <div
      className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      role="button"
      tabIndex={0}
      onClick={props.close}
      onKeyUp={(event) => {
        if (event.key === 'Enter')
          props.close()
      }}
    >
      <div
        className="relative mx-6 w-full max-w-md cursor-default rounded-md bg-white px-6 py-4"
        role="button"
        tabIndex={0}
        onClick={event => event.stopPropagation()}
        onKeyUp={event => event.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 mr-2 cursor-pointer p-1 hover:rotate-45 transition-transform rotate-0 duration-300"
          onClick={props.close}
          onKeyUp={(event) => {
            if (event.key === 'Enter')
              props.close()
          }}
          aria-label="Close"
        >
          <FontAwesomeIcon className="h-8" icon={faXmark} />
        </button>

        <h2 className="text-center text-2xl font-bold">Share this page</h2>

        <div className="mt-8 flex flex-col">
          {shareLinks.map(shareLink => (
            <a
              href={shareLink.link}
              target="_blank"
              rel="noreferrer"
              key={shareLink.name}
              className="group relative mx-2 flex items-center gap-4 py-4"
            >
              <FontAwesomeIcon className="h-6" icon={shareLink.icon} />
              <span className="text-lg font-bold">{shareLink.name}</span>

              <div className="absolute right-4 translate-x-0 transition-transform duration-500 group-hover:translate-x-4">
                <FontAwesomeIcon className="h-5" icon={faChevronRight} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LTShareModal
