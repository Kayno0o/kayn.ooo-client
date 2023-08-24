import React from 'react'
import { twMerge } from 'tailwind-merge'
import Button from '../base/Button'

interface FormProps {
  children: React.ReactNode
  className?: string
  error?: string
  loading?: boolean
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  submitLabel?: string
}

function Form(props: FormProps) {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    props.onSubmit && props.onSubmit(event)
  }

  return (
    <form onSubmit={onSubmit} className={twMerge('mx-auto flex max-w-lg flex-col items-center gap-3', props.className)}>
      {props.children}

      <Button type="submit" className="mt-4" loading={props.loading}>
        {props.submitLabel || 'Submit'}
      </Button>

      {props.error && <p className="text-red-500">{props.error}</p>}
    </form>
  )
}

export default Form
