declare namespace maze {
  interface IMaze {
    maze_id: string;
    'game-state': IGameState,
    pony: number[];
    domokun: number[];
    'end-point': number[];
    size: number[];
    difficulty: number;
    data: Array<Wall[]>;
  }

  type Wall = 'north' | 'west';

  interface IMazeSettings {
    "maze-width": number;
    "maze-height": number;
    "maze-player-name": string;
    difficulty: number;
  }

  interface IGameState {
    state: string;
    'state-result': string;
  }
}

