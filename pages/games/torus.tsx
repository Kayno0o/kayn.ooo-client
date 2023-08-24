import React from 'react'
import Meta from '../../components/base/Meta'
import Container from '../../components/base/Container'
import H1 from '../../components/base/H1'
import Torus from '../../components/games/Torus'

function TorusPage() {
  return (
    <>
      <Meta title="Torus Game" />

      <Container className="flex flex-col gap-4">
        <H1 className="text-center">Torus Game</H1>

        <Torus height={4} width={4} />
      </Container>
    </>
  )
}

export default TorusPage
