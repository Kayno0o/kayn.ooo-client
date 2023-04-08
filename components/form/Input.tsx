import React from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = {
  className?: string;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  resetError?: () => void;
  type: string;
  value: string;
};

const Input = (props: InputProps) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value);
    props.resetError && props.resetError();
  };

  return (
    <div className={twMerge('flex w-full flex-col gap-1', props.className)}>
      <label htmlFor={props.label}>
        {props.label} {props.required && <span className="font-bold text-red-500">*</span>}
      </label>

      <input
        className="rounded-xl px-2 py-1 text-black"
        type={props.type}
        id={props.label}
        value={props.value}
        onChange={onChange}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default Input;
