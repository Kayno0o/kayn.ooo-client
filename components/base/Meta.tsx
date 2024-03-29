import Head from 'next/head'
import React, { useEffect } from 'react'

interface MetaProps {
  description?: string
  lang?: string
  noindex?: boolean
  src?: string
  title?: string
}

function Meta(props: MetaProps) {
  const [currentUrl, setCurrentUrl] = React.useState<string>('')

  const getTitle = React.useCallback(() => (props.title ? `${props.title} - Kaynooo.xyz` : 'Kaynooo.xyz'), [props.title])
  const getDesc = React.useCallback(
    () =>
      props.description
        ? props.description
        : 'A website by Kevyn Fyleyssant. A place to share my projects and random things.',
    [props.description],
  )

  useEffect(() => {
    document.querySelector('html')?.setAttribute('lang', props.lang || 'en')
  }, [props.lang, props.noindex])

  React.useEffect(() => {
    setCurrentUrl(document.location.origin + document.location.pathname)
  })

  return (
    <Head>
      <title>{getTitle()}</title>

      {props.noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#363636" />

      <meta name="description" content={getDesc()} />

      <meta property="og:title" content={getTitle()} />
      <meta property="og:description" content={getDesc()} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://kaynooo.xyz" />
      <meta property="og:site_name" content="Kaynooo.xyz" />
      <meta property="og:image" content={props.src || 'https://kaynooo.xyz/images/og-image.png'} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta property="twitter:title" content={getTitle()} />
      <meta property="twitter:description" content={getDesc()} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@kayn_ooo" />
      <meta name="twitter:creator" content="@kayn_ooo" />
      <meta name="twitter:image" content={props.src || 'https://kaynooo.xyz/images/og-image.png'} />

      <link rel="icon" href="/favicon.ico" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />

      <link rel="canonical" href={currentUrl} />
    </Head>
  )
}

export default Meta
