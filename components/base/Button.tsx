import React from 'react';
import { twMerge } from 'tailwind-merge';

type BaseButtonProps = {
  children: any;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const Button = (props: BaseButtonProps) => (
  <div
    className={twMerge('w-fit cursor-pointer rounded-full bg-white px-6 py-1 font-bold text-black', props.className)}
    onClick={props.onClick}
  >
    {props.children}
  </div>
);

export default Button;
