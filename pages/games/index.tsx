import React from 'react';
import Container from '../../components/base/Container';
import Link from 'next/link';
import Connect4 from '../../components/games/Connect4';
import Button from '../../components/base/Button';
import TicTacToe from '../../components/games/TicTacToe';
import H1 from '../../components/base/H1';

const GamesPage = () => (
  <Container className="flex flex-col gap-6" title="Games">
    <H1 className="text-center">Games</H1>

    <div className="grid grid-cols-2 gap-6">
      <div className="flex flex-col items-center gap-4">
        <Connect4 gridClassName="grid-cols-7" height={6} width={7} length={4} auto />

        <Link href="/games/connect-4" className="text-xl font-bold">
          <Button>Play connect 4</Button>
        </Link>
      </div>
      <div className="flex flex-col items-center gap-4">
        <TicTacToe gridClassName="grid-cols-3" height={3} width={3} length={3} auto />

        <Link href="/games/tic-tac-toe" className="text-xl font-bold">
          <Button>Play Tic Tac Toe</Button>
        </Link>
      </div>
    </div>
  </Container>
);

export default GamesPage;
