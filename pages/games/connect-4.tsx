import React from 'react'
import Connect4 from '../../components/games/Connect4'
import Container from '../../components/base/Container'
import H1 from '../../components/base/H1'
import Meta from '../../components/base/Meta'

function Connect4Page() {
  return (
    <>
      <Meta title="Connect 4" />

      <Container className="flex flex-col gap-4">
        <H1 className="text-center">Connect 4</H1>
        <Connect4 className="grid-cols-7" height={6} width={7} length={4} auto={false} />
      </Container>
    </>
  )
}

export default Connect4Page
