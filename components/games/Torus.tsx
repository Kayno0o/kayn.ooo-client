import React, { useCallback, useState } from 'react'
import type { Grid, TorusBloc } from '../../types/board'
import Button from '../base/Button'
import Board from './Board'

interface TorusProps {
  height: number
  preview?: boolean
  width: number
}

function Torus(props: TorusProps) {
  const [message, setMessage] = useState<string>('')

  const click = useCallback((x: number, y: number, grid: Grid<TorusBloc>) => {
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const newX = x + i
        const newY = y + j

        if (!grid[newX] || !grid[newX][newY])
          continue

        grid[newX][newY] = ((grid[newX][newY] % 4) + 1) as TorusBloc
      }
    }
  }, [])

  const createGrid = useCallback((): Grid<TorusBloc> => {
    const grid: Grid<TorusBloc> = [...Array(props.width)].map(() => [...Array(props.height)].map(() => 1))

    for (let i = 0; i < props.width; i++) {
      for (let j = 0; j < props.height; j++) {
        const moves = Math.floor(Math.random() * 4)

        for (let k = 0; k < moves; k++)
          click(i, j, grid)
      }
    }

    return grid
  }, [click, props.height, props.width])

  const [board, setBoard] = useState<Grid<TorusBloc>>(createGrid())

  const cloneGrid = useCallback((grid: Grid<TorusBloc>) => {
    return JSON.parse(JSON.stringify(grid)) as Grid<TorusBloc>
  }, [])

  const initGrid = useCallback(() => {
    setBoard(createGrid())
    setMessage('')
  }, [createGrid])

  const onBlocClick = useCallback(
    (x: number, y: number) => {
      const newGrid = cloneGrid(board)

      click(x, y, newGrid)

      setBoard(newGrid)

      if (newGrid.every(col => col.every(bloc => bloc === 1)))
        setMessage('You won!')
    },
    [click, cloneGrid, board],
  )

  return (
    <>
      <Board
        grid={board}
        statesClassFormatter={() => {
          return 'bg-transparent'
        }}
        popup={message}
        onBlocClick={onBlocClick}
        formatBloc={(x, y) => board[x][y]}
      />

      {!props.preview && (
        <div className="flex flex-col items-center gap-6">
          <Button onClick={() => initGrid()}>Reset game</Button>
        </div>
      )}
    </>
  )
}

export default Torus
