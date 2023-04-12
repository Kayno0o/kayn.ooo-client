import React from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '../base/Button';

type SimpleBoardGameProps = {
  auto: boolean;
  className?: string;
  grid: Array<Array<number>>;
  message: string | null;
  onMouseOverBloc?: (x: number, y: number) => void;
  onMouseOverCol?: (x: number) => void;
  place: (x: number, y: number) => void;
  placeholder: { x: number; y: number };
  player: number;
  playerProp: {
    [player: number]: {
      bloc: any;
      textColor: string;
    };
  };
  resetGame: () => void;
  setPlaceholder: (props: { x: number; y: number }) => void;
};

const SimpleBoardGame = (props: SimpleBoardGameProps) => (
  <>
    <div
      className={twMerge('relative mx-auto flex w-full max-w-lg', props.className)}
      onMouseOut={() => props.setPlaceholder({ x: -2, y: -2 })}
      onBlur={() => props.setPlaceholder({ x: -2, y: -2 })}
    >
      {props.grid.map((col, x) => (
        <div
          className="flex w-full flex-col"
          key={x}
          onMouseOver={() => (props.onMouseOverCol ? props.onMouseOverCol(x) : null)}
          onFocus={() => (props.onMouseOverCol ? props.onMouseOverCol(x) : null)}
        >
          {col.map((bloc, y) => (
            <button
              key={y}
              className={twMerge(
                'flex aspect-square w-full items-center justify-center border border-white',
                (props.placeholder.x === -1 || props.placeholder.x === x) &&
                  (props.placeholder.y === -1 || props.placeholder.y === y) &&
                  'bg-slate-600',
              )}
              onMouseOver={() => (props.onMouseOverBloc ? props.onMouseOverBloc(x, y) : null)}
              onFocus={() => (props.onMouseOverBloc ? props.onMouseOverBloc(x, y) : null)}
              onClick={() => (props.auto ? null : props.place(x, y))}
              aria-label={`Bloc ${x} ${y}`}
            >
              {bloc !== 0 && props.playerProp[bloc - 1]?.bloc}
            </button>
          ))}
        </div>
      ))}

      {props.message && (
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-black">
          <div className="rounded-xl border-4 border-white bg-black px-4 py-1">{props.message}</div>
        </div>
      )}
    </div>

    {!props.auto && (
      <>
        <div className={props.playerProp[props.player].textColor}>Current player: {props.player + 1} </div>
        <Button onClick={() => props.resetGame()} className="mx-auto">
          Reset game
        </Button>
      </>
    )}
  </>
);

export default SimpleBoardGame;
