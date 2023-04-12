import React from 'react';
import Minesweeper from '../../components/games/Minesweeper';
import Container from '../../components/base/Container';
import Meta from '../../components/base/Meta';
import H1 from '../../components/base/H1';

const MinesweeperPage = () => {
  return (
    <>
      <Meta title="Minesweeper" />

      <Container className="flex flex-col gap-4">
        <H1 className="text-center">Minesweeper</H1>

        <Minesweeper height={20} width={20} maxBomb={20} />
      </Container>
    </>
  );
};

export default MinesweeperPage;
