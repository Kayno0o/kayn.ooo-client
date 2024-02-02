import React from 'react'
import Image from 'next/image'
import Container from '../components/base/Container'
import H1 from '../components/base/H1'
import Meta from './base/Meta'

interface ErrorProps {
  children: React.ReactNode
  code: string
  src: string
  alt: string
}

function Error(props: ErrorProps) {
  return <>
    <Meta title={props.code} noindex />

    <Container className="flex h-full flex-col items-center justify-center gap-6">
      <H1 className="text-center">
        Error <span className="text-red-400">{props.code}</span>
      </H1>

      <Image fill={true} width={512} className="w-full max-w-lg" src={props.src} alt={props.alt} />

      <p>{props.children}</p>
    </Container>
  </>
}

export default Error
