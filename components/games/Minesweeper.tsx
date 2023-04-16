import React, { useCallback, useState } from 'react';
import { Grid, MinesweeperBloc, MinesweeperGameState } from '../../types/board';
import Board from './Board';
import { inRange, randomInt } from '../../utils/utils';
import Button from '../base/Button';

type MinesweeperProps = {
  className?: string;
  height: number;
  maxBomb: number;
  preview?: boolean;
  width: number;
};

const Minesweeper = (props: MinesweeperProps) => {
  const [gameState, setGameState] = useState<MinesweeperGameState>('playing');
  const [flag, setFlag] = useState<boolean>(false);

  const checkWin = useCallback((grid: Grid<MinesweeperBloc>) => {
    return grid.every((col) =>
      col.every((bloc) => (bloc.type === 'bomb' && bloc.hidden) || (bloc.type === 'blank' && !bloc.hidden)),
    );
  }, []);

  const exploreNeighbours = useCallback(
    (grid: Grid<MinesweeperBloc>, x: number, y: number, visitedBlocs: Set<number>) => {
      [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ].forEach(([dirX, dirY]) => {
        const [newX, newY] = [x + dirX, y + dirY];

        if (!inRange(newX, props.width) || !inRange(newY, props.height) || visitedBlocs.has(newX * props.width + newY))
          return;

        visitedBlocs.add(newX * props.width + newY);

        const bloc = grid[newX][newY];
        if (!bloc.hidden) return;

        grid[newX][newY].hidden = false;
        grid[newX][newY].flag = false;

        if (bloc.type === 'blank' && bloc.bombs === 0) exploreNeighbours(grid, newX, newY, visitedBlocs);
      });
    },
    [props.height, props.width],
  );

  const createGrid = useCallback(() => {
    const newGrid = [...Array(props.width)].map(() => [...Array(props.height)].map(() => new MinesweeperBloc()));

    let placedBombs = 0;

    do {
      const [x, y] = [randomInt(props.width), randomInt(props.height)];

      const bloc = newGrid[x][y];
      if (bloc.type !== 'bomb') {
        newGrid[x][y].type = 'bomb';
        placedBombs++;

        for (let dirX = -1; dirX <= 1; dirX++) {
          for (let dirY = -1; dirY <= 1; dirY++) {
            const [newX, newY] = [x + dirX, y + dirY];

            if (!inRange(newX, newGrid.length) || !inRange(newY, newGrid[x].length) || (x === newX && y === newY))
              continue;

            newGrid[newX][newY].bombs++;
          }
        }
      }
    } while (placedBombs < props.maxBomb);

    return newGrid;
  }, [props.height, props.maxBomb, props.width]);

  const [grid, setGrid] = useState<Grid<MinesweeperBloc>>(createGrid());

  const initGrid = useCallback(() => {
    setGrid(createGrid());
    setGameState('playing');
  }, [createGrid]);

  const onBlocClick = useCallback(
    (x: number, y: number) => {
      if (!grid || gameState === 'lost' || gameState === 'win') return;

      const copy = [...grid];

      const bloc = copy[x][y];
      if (!bloc.hidden) return;

      if (flag) {
        copy[x][y].flag = !bloc.flag;
      } else {
        if (bloc.flag) return;

        const visitedBlocs = new Set<number>([x * props.width + y]);

        copy[x][y].hidden = false;
        setGrid(copy);

        if (bloc.type === 'bomb') return setGameState('lost');

        if (bloc.type === 'blank' && bloc.bombs === 0) exploreNeighbours(copy, x, y, visitedBlocs);
      }

      if (checkWin(copy)) return setGameState('win');
      setGrid(copy);
    },
    [checkWin, exploreNeighbours, flag, gameState, grid, props.width],
  );

  return (
    <>
      <Board
        className={props.className}
        grid={grid}
        statesClassFormatter={(x: number, y: number) => {
          const bloc = grid[x][y];
          if (!bloc.hidden && bloc.type === 'blank') return 'border-0';
          if (bloc.flag) return 'bg-green-300 border-0';
          if (bloc.hidden) return 'bg-black';
          if (bloc.type === 'bomb') return 'bg-red-300 border-0';
          return 'bg-slate-700';
        }}
        onBlocClick={onBlocClick}
        formatBloc={(bloc: MinesweeperBloc) => {
          if (!bloc.hidden && bloc.type !== 'bomb' && bloc.bombs > 0) return bloc.bombs;
        }}
        popup={gameState === 'win' ? 'You win' : gameState === 'lost' ? 'You lose' : ''}
      />

      {!props.preview && (
        <div className="flex flex-col items-center gap-6">
          <Button className={flag ? 'bg-green-300' : 'bg-white'} onClick={() => setFlag(!flag)}>
            {flag ? 'Tool: Flag' : 'Tool: Destroy'}
          </Button>

          <Button onClick={() => initGrid()}>Reset game</Button>
        </div>
      )}
    </>
  );
};

export default Minesweeper;
