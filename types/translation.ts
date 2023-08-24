import type { Identifiable } from '.'

export type Locale = 'en' | 'fr'

export interface Translation extends Identifiable {
  en: string
  fr: string
  key: string
}

export class TranslationFormType implements Translation {
  key: string = ''
  fr: string = ''
  en: string = ''
}
