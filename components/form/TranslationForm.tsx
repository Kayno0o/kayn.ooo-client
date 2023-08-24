import React from 'react'
import Button from '../base/Button'
import type { Translation } from '../../types/translation'
import Input from './Input'

interface TranslationFormProps {
  index: number
  onSave?: (translation: Translation) => void
  save?: boolean
  translation: Translation
  updateTranslation: (translation: Translation) => void
  updateTranslationInput: (translation: Translation, index: number) => void
}

function TranslationForm(props: TranslationFormProps) {
  return (
    <div className="flex gap-6">
      <Input
        label="Key"
        value={props.translation.key}
        onChange={(key) => {
          props.updateTranslationInput({ ...props.translation, key }, props.index)
        }}
        onBlur={() => props.updateTranslation(props.translation)}
      />
      <div className="flex w-full flex-col gap-1">
        <Input
          className="relative"
          label="Fr"
          labelClassName="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-black font-bold"
          inputClassName="pl-10"
          value={props.translation.fr}
          onChange={fr => props.updateTranslationInput({ ...props.translation, fr }, props.index)}
          onBlur={() => props.updateTranslation(props.translation)}
        />
        <Input
          className="relative"
          label="En"
          labelClassName="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-black font-bold"
          inputClassName="pl-10"
          value={props.translation.en}
          onChange={en => props.updateTranslationInput({ ...props.translation, en }, props.index)}
          onBlur={() => props.updateTranslation(props.translation)}
        />
      </div>

      {props.save && (
        <Button onClick={() => props.onSave && props.onSave(props.translation)} className="mt-auto">
          Save
        </Button>
      )}
    </div>
  )
}

export default TranslationForm
