import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type CustomLinkProps = {
  children: string;
  className?: string;
  href: string;
  icon: { color: string; icon: IconProp };
  type?: 'copy';
};

const CustomLink = (props: CustomLinkProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <Link
      href={props.href}
      target="_blank"
      rel="noreferrer"
      className={twMerge(
        `
          relative flex w-full flex-row items-center justify-center rounded-xl
          bg-white px-6 py-2 font-bold text-black shadow-md
          transition-transform duration-150 hover:scale-105 hover:odd:rotate-1 hover:even:-rotate-1
        `,
        props.className,
        copied ? 'shadow-[inset_0_0_0_2px_#86efac]' : '',
      )}
      onClick={(e) => {
        if (props.type === 'copy') {
          e.preventDefault();
          setCopied(true);
          navigator.clipboard.writeText(props.href);

          setTimeout(() => {
            setCopied(false);
          }, 3000);
        }
      }}
    >
      <FontAwesomeIcon
        className="absolute left-3 h-6"
        icon={copied === false ? props.icon.icon : faCheck}
        color={props.icon.color}
      />

      <span className="text-center">
        {props.children} {copied && 'copié !'}
      </span>
    </Link>
  );
};

export default CustomLink;
