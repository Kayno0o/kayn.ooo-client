export type Grid<T = number> = Array<Array<T>>;

export class MinesweeperBloc {
  type: MinesweeperBlocType = 'blank';
  hidden: boolean = true;
  bombs: number = 0;
  flag: boolean = false;
}

export type MinesweeperBlocType = 'blank' | 'bomb';

export type MinesweeperGameState = 'lost' | 'win' | 'playing';
