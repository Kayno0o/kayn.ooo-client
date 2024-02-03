import React from 'react'
import { twMerge } from 'tailwind-merge'
import type { Grid } from '../../types/board'

interface BoardProps {
  className?: string
  formatBloc?: (x: number, y: number) => any
  grid: Grid<any>
  onBlocClick?: (x: number, y: number) => void
  onMouseOverBloc?: (x: number, y: number) => void
  placeholder?: { x: number, y: number }
  popup?: string
  setPlaceholder?: (props: { x: number, y: number }) => void
  statesClassFormatter?: (x: number, y: number) => string
}

function Board(props: BoardProps) {
  return (
    <div
      className={twMerge('relative mx-auto flex w-full max-w-lg', props.className)}
      onMouseOut={() => props.setPlaceholder && props.setPlaceholder({ x: -2, y: -2 })}
      onBlur={() => props.setPlaceholder && props.setPlaceholder({ x: -2, y: -2 })}
    >
      {props.grid.map((col, x) => (
        <div className="flex w-full flex-col" key={x}>
          {col.map((bloc, y) => (
            <button
              key={y}
              className={twMerge(
                'relative flex aspect-square w-full items-center justify-center border border-white',
                props.statesClassFormatter && props.statesClassFormatter(x, y),
                props.placeholder
                && (props.placeholder.x === -1 || props.placeholder.x === x)
                && (props.placeholder.y === -1 || props.placeholder.y === y)
                && 'bg-slate-600',
              )}
              onMouseOver={() => props.onMouseOverBloc && props.onMouseOverBloc(x, y)}
              onFocus={() => props.onMouseOverBloc && props.onMouseOverBloc(x, y)}
              onClick={() => props.onBlocClick && props.onBlocClick(x, y)}
              aria-label={`Bloc ${x} ${y}`}
            >
              {props.formatBloc && (
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  {props.formatBloc(x, y)}
                </span>
              )}
            </button>
          ))}
        </div>
      ))}

      {props.popup && (
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-black">
          <div className="rounded-xl border-4 border-white bg-black px-4 py-1">{props.popup}</div>
        </div>
      )}
    </div>
  )
}

export default Board
