
export interface Cell {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isVisited: boolean;
  isPath: boolean;
  distance: number;
  previousNode: Cell | null;
  heuristic: number;
  fScore: number;
}

export type Algorithm = 'dijkstra' | 'aStar' | 'bfs' | 'dfs';

export type GridState = 'idle' | 'generating-maze' | 'running' | 'completed';

export interface AlgorithmResult {
  visitedNodes: Cell[];
  path: Cell[];
}
