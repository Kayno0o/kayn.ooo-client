import React from 'react'
import Error from '../components/Error'

function Page401() {
  return (
    <Error code="401" src="/401.webp" alt="Cat disguised as a policeman">
      Looks like you&apos;re trying to access something you&apos;re not purr-mitted to
    </Error>
  )
}

export default Page401
