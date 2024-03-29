import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { randomInt } from '../../utils/utils'
import type { Grid } from '../../types/board'
import { checkWin } from '../../utils/board'
import SimpleBoardGame from './SimpleBoardGame'

interface Connect4Props {
  auto: boolean
  className?: string
  height: number
  length: number
  width: number
}

function Connect4(props: Connect4Props) {
  const width = props.width
  const height = props.height

  const emptyGrid = (w: number, h: number) => [...Array(w)].map(() => [...Array(h)].map(() => 0))
  const [grid, setGrid] = useState<Grid>(emptyGrid(width, height))

  const setBloc = (x: number, y: number, p: number) => {
    if (!grid)
      return

    const copy = [...grid]
    copy[x][y] = p

    setGrid(copy)
  }

  const [player, setPlayer] = useState<number>(0)
  const [placeholder, setPlaceholder] = useState({ x: -2, y: -2 })
  const [message, setMessage] = useState<string | null>(null)

  const initGrid = useCallback(() => {
    setGrid(emptyGrid(width, height))
    setPlayer(0)
    setMessage(null)
  }, [height, width])

  useMemo(() => {
    initGrid()
  }, [initGrid])

  function place(x: number): boolean {
    if (message !== null)
      return false

    const col = grid[x]

    if (!col)
      return false

    for (let y = col.length - 1; y >= 0; y--) {
      const bloc = col[y]

      if (bloc === 0) {
        setBloc(x, y, player + 1)

        setMessage(checkWin(grid, props.length))
        if (message !== null)
          return true

        setPlayer((player + 1) % 2)

        return true
      }
    }

    return false
  }

  function randomPlace() {
    let x

    do
      x = randomInt(props.width)
    while (!place(x))
  }

  useEffect(() => {
    let autoPlace: NodeJS.Timeout

    if (props.auto) {
      autoPlace = setTimeout(() => {
        if (message !== null)
          initGrid()

        randomPlace()
      }, 1000)
    }

    return () => clearTimeout(autoPlace)
  })

  return (
    <SimpleBoardGame
      auto={props.auto}
      className={props.className}
      grid={grid}
      message={message}
      setPlaceholder={setPlaceholder}
      place={place}
      placeholder={placeholder}
      onMouseOverCol={x => (props.auto ? null : setPlaceholder({ x, y: -1 }))}
      player={player}
      playerProp={{
        0: {
          bloc: <div className="h-full w-full rounded-full bg-amber-300" />,
          textColor: 'text-amber-300',
        },
        1: {
          bloc: <div className="h-full w-full rounded-full bg-indigo-300" />,
          textColor: 'text-indigo-300',
        },
      }}
      resetGame={initGrid}
    />
  )
}

export default Connect4
