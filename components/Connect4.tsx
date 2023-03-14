import React, { useCallback, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import BaseButton from './BaseButton';

type Grid = Array<Array<number>>;

type Connect4Props = {
  height: number;
  length: number;
  width: number;
};

const Connect4 = (props: Connect4Props) => {
  const setBloc = (x: number, y: number, p: number) => {
    if (!grid) return;

    const copy = [...grid];
    copy[x][y] = p;

    setGrid(copy);
  };

  const emptyGrid = (w: number, h: number) => [...Array(w)].map(() => [...Array(h)].map(() => 0));

  const width = props.width;
  const height = props.height;
  const length = props.length;

  const [grid, setGrid] = useState<Grid>(emptyGrid(width, height));
  const [player, setPlayer] = useState<number>(0);
  const [placeholder, setPlaceholder] = useState(-1);
  const [message, setMessage] = useState('');

  const initGrid = useCallback(() => {
    setGrid(emptyGrid(width, height));
    setPlayer(0);
    setMessage('');
  }, [height, width]);

  useMemo(() => {
    initGrid();
  }, [initGrid]);

  function place(x: number) {
    if (message !== '') return;

    const col = grid[x];

    if (!col) return;

    for (let y = col.length - 1; y >= 0; y--) {
      const bloc = col[y];

      if (bloc === 0) {
        setBloc(x, y, player + 1);

        if (checkWin()) return;

        setPlayer((player + 1) % 2);

        return;
      }
    }
  }

  function checkWin(): boolean {
    if (grid.every((col) => col.every((b) => b !== 0))) {
      setMessage('No one wins');
      return false;
    }

    const dirs = [
      [1, 0],
      [0, 1],
      [1, 1],
      [1, -1],
    ];

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const bloc = grid[x][y];

        if (bloc === 0) continue;

        for (let i = 0; i < dirs.length; i++) {
          const [dx, dy] = dirs[i];

          if (
            [...Array(length)].every(
              (_, index) => grid[x + dx * index] && grid[x + dx * index][y + dy * index] === bloc,
            )
          ) {
            setMessage(`Player ${bloc} wins`);
            return true;
          }
        }
      }
    }

    return false;
  }

  return (
    <>
      <div
        className="relative mx-auto grid w-full max-w-lg"
        style={{ gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))` }}
        onMouseOut={() => setPlaceholder(-1)}
      >
        {grid.map((col, x) => (
          <div className="flex w-full flex-col" key={x} onMouseOver={() => setPlaceholder(x)} onClick={() => place(x)}>
            {col.map((bloc, y) => (
              <div
                key={y}
                className={twMerge(
                  'flex aspect-square w-full items-center justify-center border border-white',
                  placeholder === x && 'bg-slate-600',
                )}
              >
                {bloc === 1 && <div className="h-full w-full rounded-full bg-red-300" />}
                {bloc === 2 && <div className="h-full w-full rounded-full bg-blue-300" />}
              </div>
            ))}
          </div>
        ))}

        {message && (
          <div className="absolute inset-0 flex items-center justify-center text-3xl font-black">
            <div className="rounded-xl border-4 border-white bg-black px-4 py-1">{message}</div>
          </div>
        )}
      </div>

      <div className={player === 0 ? 'text-red-300' : 'text-blue-300'}>Current player: {player + 1} </div>

      <BaseButton onClick={() => initGrid()} className="mx-auto">
        Reset game
      </BaseButton>
    </>
  );
};

export default Connect4;
