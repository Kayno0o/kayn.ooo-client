import React from 'react';
import { twMerge } from 'tailwind-merge';

type ContainerProps = {
  children: any;
  className?: string;
};

const Container = (props: ContainerProps) => (
  <div className={twMerge('mx-auto w-full max-w-5xl p-6', props.className)}>{props.children}</div>
);

export default Container;
