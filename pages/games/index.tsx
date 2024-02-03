import React from 'react'
import Link from 'next/link'
import Container from '../../components/base/Container'
import Connect4 from '../../components/games/Connect4'
import Button from '../../components/base/Button'
import TicTacToe from '../../components/games/TicTacToe'
import H1 from '../../components/base/H1'
import Meta from '../../components/base/Meta'
import Minesweeper from '../../components/games/Minesweeper'

function GamesPage() {
  return (
    <>
      <Meta title="Games" />

      <Container className="flex flex-col gap-6">
        <H1 className="text-center">Games</H1>

        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col items-center gap-4">
            <Connect4 height={6} width={6} length={4} auto />

            <Link href="/games/connect-4" className="text-xl font-bold">
              <Button>Play connect 4</Button>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-4">
            <TicTacToe height={3} width={3} length={3} auto />

            <Link href="/games/tic-tac-toe" className="text-xl font-bold">
              <Button>Play Tic Tac Toe</Button>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Minesweeper height={8} width={8} maxBomb={8} preview />

            <Link href="/games/minesweeper" className="text-xl font-bold">
              <Button>Play Minesweeper</Button>
            </Link>
          </div>
        </div>
      </Container>
    </>
  )
}

export default GamesPage
