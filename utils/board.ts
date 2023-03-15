import { Grid } from './../types/board';

export const checkWin = (grid: Grid, length: number): string | null => {
  if (grid.every((col) => col.every((b) => b !== 0))) {
    return 'No one wins';
  }

  const dirs = [
    [1, 0],
    [0, 1],
    [1, 1],
    [1, -1],
  ];

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      const bloc = grid[x][y];

      if (bloc === 0) continue;

      for (let i = 0; i < dirs.length; i++) {
        const [dx, dy] = dirs[i];

        if (
          [...Array(length)].every((_, index) => grid[x + dx * index] && grid[x + dx * index][y + dy * index] === bloc)
        ) {
          return `Player ${bloc} wins`;
        }
      }
    }
  }

  return null;
};

export const emptyGrid = (w: number, h: number) => [...Array(w)].map(() => [...Array(h)].map(() => 0));
