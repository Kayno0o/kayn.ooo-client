import React from 'react'
import Error from '../components/Error'

function Page404() {
  return (
    <Error code="500" src="/500.webp" alt="Kittens in a computer">
      Oops, it looks like our paws accidentally unplugged something important. We&apos;ll try to fix it and get back to
      you soon!
    </Error>
  )
}

export default Page404
