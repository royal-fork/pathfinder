
import { Cell } from '../types/pathfinding';

export const generateMazeWithPrims = async (
  grid: Cell[][],
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>,
  speed: number
) => {
  const rows = grid.length;
  const cols = grid[0].length;
  
  // Initialize all cells as walls
  const newGrid = grid.map(row =>
    row.map(cell => ({
      ...cell,
      isWall: !cell.isStart && !cell.isEnd,
      isVisited: false,
      isPath: false,
      distance: Infinity,
      previousNode: null,
      heuristic: 0,
      fScore: Infinity
    }))
  );
  
  setGrid(newGrid);
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Start from a random cell
  const startRow = Math.floor(Math.random() * Math.floor(rows / 2)) * 2 + 1;
  const startCol = Math.floor(Math.random() * Math.floor(cols / 2)) * 2 + 1;
  
  const walls: { row: number; col: number; direction: 'N' | 'S' | 'E' | 'W' }[] = [];
  const visited = new Set<string>();
  
  // Mark starting cell as passage
  newGrid[startRow][startCol].isWall = false;
  visited.add(`${startRow},${startCol}`);
  
  // Add walls of starting cell
  addWalls(startRow, startCol, walls, rows, cols);
  
  while (walls.length > 0) {
    // Pick a random wall
    const randomIndex = Math.floor(Math.random() * walls.length);
    const wall = walls[randomIndex];
    walls.splice(randomIndex, 1);
    
    const { row, col, direction } = wall;
    let neighborRow = row;
    let neighborCol = col;
    
    // Calculate neighbor position based on direction
    switch (direction) {
      case 'N':
        neighborRow = row - 2;
        break;
      case 'S':
        neighborRow = row + 2;
        break;
      case 'E':
        neighborCol = col + 2;
        break;
      case 'W':
        neighborCol = col - 2;
        break;
    }
    
    // Check if neighbor is valid and unvisited
    if (
      neighborRow >= 0 && neighborRow < rows &&
      neighborCol >= 0 && neighborCol < cols &&
      !visited.has(`${neighborRow},${neighborCol}`)
    ) {
      // Make the wall a passage
      if (!newGrid[row][col].isStart && !newGrid[row][col].isEnd) {
        newGrid[row][col].isWall = false;
      }
      
      // Make the neighbor a passage
      if (!newGrid[neighborRow][neighborCol].isStart && !newGrid[neighborRow][neighborCol].isEnd) {
        newGrid[neighborRow][neighborCol].isWall = false;
      }
      
      visited.add(`${neighborRow},${neighborCol}`);
      
      // Add walls of the neighbor
      addWalls(neighborRow, neighborCol, walls, rows, cols);
      
      // Update grid with animation
      setGrid([...newGrid]);
      await new Promise(resolve => setTimeout(resolve, Math.max(1, 101 - speed)));
    }
  }
  
  // Ensure start and end are not walls
  const startNode = newGrid.flat().find(cell => cell.isStart);
  const endNode = newGrid.flat().find(cell => cell.isEnd);
  
  if (startNode) startNode.isWall = false;
  if (endNode) endNode.isWall = false;
  
  setGrid([...newGrid]);
};

const addWalls = (
  row: number,
  col: number,
  walls: { row: number; col: number; direction: 'N' | 'S' | 'E' | 'W' }[],
  rows: number,
  cols: number
) => {
  // Add wall to the north
  if (row - 2 >= 0) {
    walls.push({ row: row - 1, col, direction: 'N' });
  }
  
  // Add wall to the south
  if (row + 2 < rows) {
    walls.push({ row: row + 1, col, direction: 'S' });
  }
  
  // Add wall to the east
  if (col + 2 < cols) {
    walls.push({ row, col: col + 1, direction: 'E' });
  }
  
  // Add wall to the west
  if (col - 2 >= 0) {
    walls.push({ row, col: col - 1, direction: 'W' });
  }
};
