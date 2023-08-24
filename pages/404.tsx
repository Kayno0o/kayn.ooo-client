import React from 'react'
import Error from '../components/Error'

function Page404() {
  return <Error code="404" src="/404.gif">
    Sorry, I couldn&apos;t find the page for you...
  </Error>
}

export default Page404
