import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SimpleBoardGame from './SimpleBoardGame';
import { Grid } from '../../types/board';
import { randomInt } from '../../utils/utils';
import { checkWin } from '../../utils/board';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faX } from '@fortawesome/free-solid-svg-icons';

type TicTacToeProps = {
  auto: boolean;
  height: number;
  length: number;
  width: number;
};

const TicTacToe = (props: TicTacToeProps) => {
  const setBloc = (x: number, y: number, p: number) => {
    if (!grid) return;

    const copy = [...grid];
    copy[x][y] = p;

    setGrid(copy);
  };

  const emptyGrid = (w: number, h: number) => [...Array(w)].map(() => [...Array(h)].map(() => 0));

  const width = props.width;
  const height = props.height;

  const [grid, setGrid] = useState<Grid>(emptyGrid(width, height));
  const [player, setPlayer] = useState<number>(0);
  const [placeholder, setPlaceholder] = useState({ x: -2, y: -2 });
  const [message, setMessage] = useState<string | null>(null);

  const initGrid = useCallback(() => {
    setGrid(emptyGrid(width, height));
    setPlayer(0);
    setMessage(null);
  }, [height, width]);

  useMemo(() => {
    initGrid();
  }, [initGrid]);

  function place(x: number, y: number): boolean {
    if (message !== null) return false;

    const col = grid[x];

    if (!col) return false;

    const bloc = col[y];

    if (bloc === 0) {
      setBloc(x, y, player + 1);

      setMessage(checkWin(grid, props.length));
      if (message !== null) return true;

      setPlayer((player + 1) % 2);

      return true;
    }

    return false;
  }

  function randomPlace() {
    let x, y;

    do {
      x = randomInt(props.width);
      y = randomInt(props.height);
    } while (!place(x, y) && message === null);
  }

  useEffect(() => {
    let autoPlace: NodeJS.Timeout;

    if (props.auto) {
      autoPlace = setTimeout(() => {
        if (message !== null) {
          initGrid();
        }

        randomPlace();
      }, 1000);
    }

    return () => clearTimeout(autoPlace);
  });

  return (
    <SimpleBoardGame
      auto={props.auto}
      grid={grid}
      message={message}
      setPlaceholder={setPlaceholder}
      place={place}
      placeholder={placeholder}
      onMouseOverBloc={(x, y) => (props.auto ? null : setPlaceholder({ x, y: y }))}
      player={player}
      playerProp={{
        0: {
          bloc: <FontAwesomeIcon icon={faCircle} className="aspect-square h-full w-full text-red-300" />,
          textColor: 'text-red-300',
        },
        1: {
          bloc: <FontAwesomeIcon icon={faX} className="aspect-square h-full w-full text-blue-300" />,
          textColor: 'text-blue-300',
        },
      }}
      resetGame={initGrid}
    />
  );
};

export default TicTacToe;
