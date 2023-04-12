import React, { useCallback, useState } from 'react';
import { Grid, MinesweeperBloc, MinesweeperGameState } from '../../types/board';
import Board from './Board';
import { inRange } from '../../utils/utils';
import { getRandomPosition } from '../../utils/board';
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

  const checkWin = useCallback(
    (grid: Grid<MinesweeperBloc>) => {
      let flags = 0;

      grid.forEach((col) =>
        col.forEach((bloc) => {
          if (bloc.type === 'bomb' && bloc.flag) flags++;
          if (!bloc.flag && bloc.hidden) flags--;
        }),
      );

      if (flags === props.maxBomb) {
        setGameState('win');
        return true;
      }

      return false;
    },
    [props.maxBomb],
  );

  const exploreBloc = useCallback(
    (grid: Grid<MinesweeperBloc>, x: number, y: number, visitedBlocs: Set<number>) => {
      const dirs = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];

      dirs.forEach((dir) => {
        const newX = x + dir[0];
        const newY = y + dir[1];
        if (!inRange(newX, props.width) || !inRange(newY, props.height) || visitedBlocs.has(newX * props.width + newY))
          return;

        const bloc = grid[newX][newY];
        visitedBlocs.add(newX * props.width + newY);

        if (!bloc.hidden) return;

        grid[newX][newY].hidden = false;
        grid[newX][newY].flag = false;

        if (bloc.type === 'blank' && bloc.bombs === 0) exploreBloc(grid, newX, newY, visitedBlocs);
      });
    },
    [props.height, props.width],
  );

  const createGrid = useCallback(() => {
    const newGrid = [...Array(props.width)].map(() => [...Array(props.height)].map(() => new MinesweeperBloc()));

    let placedBombs = 0;

    do {
      const [x, y] = getRandomPosition(props.width, props.height);

      const bloc = newGrid[x][y];
      if (bloc.type !== 'bomb') {
        newGrid[x][y].type = 'bomb';
        placedBombs++;
      }
    } while (placedBombs < props.maxBomb);

    newGrid.map((col, x) => {
      col.map((bloc, y) => {
        if (bloc.type === 'bomb') return bloc;

        const dirs = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1],
        ];

        let bombs = 0;

        dirs.forEach((dir) => {
          const newX = x + dir[0];
          const newY = y + dir[1];
          if (!inRange(newX, newGrid.length) || !inRange(newY, newGrid[x].length)) return;

          const bloc = newGrid[newX][newY];

          if (bloc.type === 'bomb') bombs++;
        });

        bloc.bombs = bombs;
        return bloc;
      });
    });

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

        if (checkWin(copy)) return;

        if (bloc.type === 'bomb') {
          setGameState('lost');
          return;
        }

        if (bloc.type === 'blank' && bloc.bombs === 0) {
          exploreBloc(copy, x, y, visitedBlocs);
        }
      }

      setGrid(copy);
    },
    [checkWin, exploreBloc, flag, gameState, grid, props.width],
  );

  return (
    <>
      <Board
        className={props.className}
        grid={grid}
        statesClassFormatter={(x: number, y: number) => {
          const bloc = grid[x][y];
          if (bloc.flag) return 'bg-green-300';
          if (bloc.hidden) return 'bg-black';
          if (bloc.type === 'bomb') return 'bg-red-300';
          return 'bg-slate-700';
        }}
        onBlocClick={onBlocClick}
        formatBloc={(bloc: MinesweeperBloc) => {
          if (!bloc.hidden && bloc.bombs > 0) return bloc.bombs;
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
