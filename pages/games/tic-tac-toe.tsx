import React from 'react';
import Container from '../../components/base/Container';
import TicTacToe from '../../components/games/TicTacToe';

const TicTacToePage = () => {
  return (
    <Container className="flex flex-col gap-4">
      <h1 className="text-center text-4xl font-bold">Tic Tac Toe</h1>
      <TicTacToe gridClassName="grid-cols-3" height={3} width={3} length={3} auto={false} />
    </Container>
  );
};

export default TicTacToePage;
