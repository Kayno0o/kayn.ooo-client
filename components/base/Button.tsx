import React from 'react';
import { twMerge } from 'tailwind-merge';

type BaseButtonProps = {
  children: any;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = (props: BaseButtonProps) => (
  <button
    className={twMerge(
      'w-fit cursor-pointer rounded-full bg-white px-6 py-1 font-bold text-black transition-colors duration-300 hover:bg-amber-300',
      props.className,
    )}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

export default Button;
