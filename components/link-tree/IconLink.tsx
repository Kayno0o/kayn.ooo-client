import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

type IconLinkProps = {
  className?: string;
  href: string;
  icon: IconProp;
};

const IconLink = (props: IconLinkProps) => {
  return (
    <Link className="h-full" href={props.href}>
      <FontAwesomeIcon className="h-full" icon={props.icon} color="#fff" />
    </Link>
  );
};

export default IconLink;
