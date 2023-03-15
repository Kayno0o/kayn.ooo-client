import React, { useState } from 'react';
import IconLink from './IconLink';
import CustomLink from './CustomLink';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import ShareModal from './ShareModal';

type LinkPageProps = {
  icons: Array<{
    href: string;
    icon: IconProp;
  }>;
  links: Array<{
    children: string;
    className?: string;
    href: string;
    icon: { color: string; icon: IconProp };
    type?: 'copy';
  }>;
  profileSrc: string;
  title: string;
  wallpaperSrc: string;
};

const LinkPage = (props: LinkPageProps) => {
  const [shareModal, setShareModal] = useState(false);

  return (
    <div className="relative flex min-h-screen justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${props.wallpaperSrc}')`,
        }}
      />

      <div className="absolute inset-0 bg-black/40" />

      <div
        className="absolute top-6 left-6 z-10 cursor-pointer text-2xl font-black text-white md:top-12 md:left-12"
        onClick={() => setShareModal(true)}
      >
        <FontAwesomeIcon className="mmd:h-10" icon={faShareAlt} /> <span className="hidden md:inline-block">Share</span>
      </div>

      {shareModal && <ShareModal close={() => setShareModal(false)} />}

      <div className="relative mx-6 flex h-full min-h-screen w-full max-w-2xl flex-col px-6 py-12">
        <div className="flex w-full flex-[1] flex-col items-center justify-between gap-10">
          <div className="flex w-full flex-col items-center gap-8">
            <img
              src={props.profileSrc}
              alt="profile picture"
              className="w-40 rounded-full border-2 border-white shadow-md"
            />

            <h1 className="text-center text-4xl font-bold text-white">{props.title}</h1>
          </div>

          <div className="flex h-8 gap-6">
            {props.icons.map((icon, index) => (
              <IconLink href={icon.href} key={index} icon={icon.icon} />
            ))}
          </div>

          <div className="flex w-full flex-[1] flex-col gap-6">
            {props.links.map((link, index) => (
              <CustomLink
                key={index}
                href={link.href}
                className={link.className}
                icon={{ color: link.icon.color, icon: link.icon.icon }}
                type={link.type}
              >
                {link.children}
              </CustomLink>
            ))}
          </div>

          <Link href="/" className="mt-auto justify-self-end text-2xl font-bold text-slate-300">
            <h2>Kayn.ooo</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LinkPage;
