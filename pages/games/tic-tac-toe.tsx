import React from 'react';
import Container from '../../components/base/Container';
import TicTacToe from '../../components/games/TicTacToe';
import H1 from '../../components/base/H1';
import Meta from '../../components/base/Meta';

const TicTacToePage = () => {
  return (
    <>
      <Meta title="Tic Tac Toe" />

      <Container className="flex flex-col gap-4">
        <H1 className="text-center">Tic Tac Toe</H1>
        <TicTacToe gridClassName="grid-cols-3" height={3} width={3} length={3} auto={false} />
      </Container>
    </>
  );
};

export default TicTacToePage;
