import React, { useCallback, useEffect, useState } from 'react'
import Container from '../../components/base/Container'
import Api from '../../utils/api/Api'
import H1 from '../../components/base/H1'
import H2 from '../../components/base/H2'
import TranslationForm from '../../components/form/TranslationForm'
import type { Translation } from '../../types/translation'
import { TranslationFormType } from '../../types/translation'
import type { ApiError } from '../../types'
import Meta from '../../components/base/Meta'

function TranslationsPage() {
  const [translations, setTranslations] = useState<Array<Translation>>([])
  const [newTranslation, setNewTranslation] = useState<TranslationFormType>(new TranslationFormType())
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<ApiError | null>(null)

  const fetchTranslations = useCallback(() => {
    const translationApi = new Api<Translation>('translation')

    setLoading(true)
    setError(null)

    translationApi
      .findAll()
      .then((data) => {
        setTranslations(data)
      })
      .catch((error: ApiError) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchTranslations()
  }, [fetchTranslations])

  const addTranslation = useCallback(() => {
    const translationApi = new Api<Translation>('translation')

    translationApi
      .customPost<TranslationFormType, Translation>(newTranslation)
      .then(() => {
        fetchTranslations()
      })
      .catch((error: ApiError) => {
        setError(error)
      })
      .finally(() => {
        setNewTranslation(new TranslationFormType())
      })
  }, [fetchTranslations, newTranslation])

  const updateTranslation = useCallback((translation: Translation) => {
    const translationApi = new Api<Translation>('translation')

    translationApi
      .update(translation)
      .then(() => {})
      .catch((error: ApiError) => {
        setError(error)
      })
  }, [])

  const updateTranslationInput = useCallback(
    (translation: Translation, index: number) => {
      setTranslations((prevState) => {
        const newTranslations = [...prevState]
        newTranslations[index] = translation
        return newTranslations
      })
    },
    [setTranslations],
  )

  return (
    <>
      <Meta noindex />

      <Container className="flex flex-col gap-6">
        <H1>Translations</H1>

        <div>
          <H2>Add new translation</H2>
          <TranslationForm
            save
            onSave={addTranslation}
            translation={newTranslation}
            index={-1}
            updateTranslationInput={translation => setNewTranslation(translation)}
            updateTranslation={() => {}}
          />
        </div>

        <H2>Translations list</H2>

        {translations.map((translation, index) => (
          <TranslationForm
            key={translation.id}
            index={index}
            translation={translation}
            updateTranslation={updateTranslation}
            updateTranslationInput={updateTranslationInput}
          />
        ))}

        {loading && <p>Loading translations...</p>}

        {error && (
          <p>
            Error loading translations: {error.status} {error.error}
          </p>
        )}
      </Container>
    </>
  )
}

export default TranslationsPage
