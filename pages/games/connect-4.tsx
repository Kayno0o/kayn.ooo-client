import React from 'react';
import Connect4 from '../../components/games/Connect4';
import Container from '../../components/base/Container';

const Connect4Page = () => {
  return (
    <Container className="flex flex-col gap-4">
      <Connect4 height={6} width={7} length={4} auto={false} />
    </Container>
  );
};

export default Connect4Page;
