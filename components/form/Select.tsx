import React from 'react'
import { twMerge } from 'tailwind-merge'

interface SelectProps {
  className?: string
  label: string
  onBlur?: (value: string) => void
  onChange?: (value: string) => void
  options: Array<string>
  required?: boolean
  resetError?: () => void
  type?: string
  value: string
}

function Select(props: SelectProps) {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange && props.onChange(event.target.value)
    props.resetError && props.resetError()
  }

  const onBlur = (event: React.FocusEvent<HTMLSelectElement>) => {
    props.onBlur && props.onBlur(event.target.value)
    props.resetError && props.resetError()
  }

  return (
    <div className={twMerge('flex w-full flex-col gap-1', props.className)}>
      <label htmlFor={props.label}>
        {props.label} {props.required && <span className="font-bold text-red-500">*</span>}
      </label>

      <select
        className="rounded-xl px-2 py-1 text-black"
        id={props.label}
        value={props.value}
        onBlur={onBlur}
        onChange={onChange}
      >
        {props.options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
