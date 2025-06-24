
import { Cell } from '../types/pathfinding';

export const dfs = async (
  grid: Cell[][],
  startNode: Cell,
  endNode: Cell,
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>,
  speed: number
) => {
  const stack: Cell[] = [startNode];
  const visitedNodes: Cell[] = [];
  
  while (stack.length > 0) {
    const currentNode = stack.pop()!;
    
    if (currentNode.isVisited || currentNode.isWall) continue;
    
    currentNode.isVisited = true;
    visitedNodes.push(currentNode);
    
    // Update grid with animation
    if (!currentNode.isStart && !currentNode.isEnd) {
      setGrid(prevGrid => {
        const newGrid = prevGrid.map(row => [...row]);
        newGrid[currentNode.row][currentNode.col] = { ...currentNode };
        return newGrid;
      });
      
      await new Promise(resolve => setTimeout(resolve, Math.max(1, 101 - speed)));
    }
    
    if (currentNode === endNode) {
      // Animate the path
      const path = getNodesInShortestPathOrder(endNode);
      await animatePath(path, setGrid, speed);
      return;
    }
    
    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    
    for (const neighbor of neighbors) {
      if (!neighbor.isVisited && !neighbor.isWall) {
        neighbor.previousNode = currentNode;
        stack.push(neighbor);
      }
    }
  }
};

const getUnvisitedNeighbors = (node: Cell, grid: Cell[][]): Cell[] => {
  const neighbors: Cell[] = [];
  const { col, row } = node;
  
  // Add neighbors in reverse order for DFS to work correctly
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (row > 0) neighbors.push(grid[row - 1][col]);
  
  return neighbors;
};

const getNodesInShortestPathOrder = (finishNode: Cell): Cell[] => {
  const nodesInShortestPathOrder: Cell[] = [];
  let currentNode: Cell | null = finishNode;
  
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  
  return nodesInShortestPathOrder;
};

const animatePath = async (
  path: Cell[],
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>,
  speed: number
) => {
  for (const node of path) {
    if (!node.isStart && !node.isEnd) {
      node.isPath = true;
      setGrid(prevGrid => {
        const newGrid = prevGrid.map(row => [...row]);
        newGrid[node.row][node.col] = { ...node };
        return newGrid;
      });
      
      await new Promise(resolve => setTimeout(resolve, Math.max(10, 101 - speed) * 2));
    }
  }
};
