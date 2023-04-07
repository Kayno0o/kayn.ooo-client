import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

type LTIconLinkProps = {
  className?: string;
  href: string;
  icon: IconProp;
};

const LTIconLink = (props: LTIconLinkProps) => {
  return (
    <Link className="h-full" href={props.href}>
      <FontAwesomeIcon className="h-full" icon={props.icon} color="#fff" />
    </Link>
  );
};

export default LTIconLink;
