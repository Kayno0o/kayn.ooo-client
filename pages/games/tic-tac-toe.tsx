import React from 'react';
import Container from '../../components/base/Container';
import TicTacToe from '../../components/games/TicTacToe';

const TicTacToePage = () => {
  return (
    <Container className="flex flex-col gap-4">
      <TicTacToe height={3} width={3} length={3} auto={false} />
    </Container>
  );
};

export default TicTacToePage;
