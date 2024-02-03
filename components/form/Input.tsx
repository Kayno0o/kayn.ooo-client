import React from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps {
  className?: string
  inputClassName?: string
  label?: string
  labelClassName?: string
  onBlur?: (value: string) => void
  onChange?: (value: string) => void
  placeholder?: string
  required?: boolean
  resetError?: () => void
  type?: string
  value: string
}

function Input(props: InputProps) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange && props.onChange(event.target.value)
    props.resetError && props.resetError()
  }

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    props.onBlur && props.onBlur(event.target.value)
    props.resetError && props.resetError()
  }

  return (
    <div className={twMerge('flex w-full flex-col gap-1', props.className)}>
      {props.label && (
        <label htmlFor={props.label} className={twMerge('text-md', props.labelClassName)}>
          {props.label}
          {' '}
          {props.required && <span className="font-bold text-red-500">*</span>}
        </label>
      )}

      <input
        className={twMerge('w-full rounded-xl px-2 py-1 text-black', props.inputClassName)}
        type={props.type || 'text'}
        id={props.label}
        value={props.value}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={props.placeholder}
      />
    </div>
  )
}

export default Input
