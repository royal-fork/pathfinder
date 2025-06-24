
import { Cell } from '../types/pathfinding';

export const aStar = async (
  grid: Cell[][],
  startNode: Cell,
  endNode: Cell,
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>,
  speed: number
) => {
  const openSet: Cell[] = [startNode];
  const closedSet: Cell[] = [];
  
  startNode.distance = 0;
  startNode.heuristic = manhattanDistance(startNode, endNode);
  startNode.fScore = startNode.heuristic;
  
  while (openSet.length > 0) {
    // Get node with lowest fScore
    openSet.sort((a, b) => a.fScore - b.fScore);
    const current = openSet.shift()!;
    
    if (current.isWall) continue;
    
    current.isVisited = true;
    closedSet.push(current);
    
    // Update grid with animation
    if (!current.isStart && !current.isEnd) {
      setGrid(prevGrid => {
        const newGrid = prevGrid.map(row => [...row]);
        newGrid[current.row][current.col] = { ...current };
        return newGrid;
      });
      
      await new Promise(resolve => setTimeout(resolve, Math.max(1, 101 - speed)));
    }
    
    if (current === endNode) {
      // Animate the path
      const path = getNodesInShortestPathOrder(endNode);
      await animatePath(path, setGrid, speed);
      return;
    }
    
    const neighbors = getNeighbors(current, grid);
    
    for (const neighbor of neighbors) {
      if (closedSet.includes(neighbor) || neighbor.isWall) continue;
      
      const tentativeGScore = current.distance + 1;
      
      if (!openSet.includes(neighbor)) {
        openSet.push(neighbor);
      } else if (tentativeGScore >= neighbor.distance) {
        continue;
      }
      
      neighbor.previousNode = current;
      neighbor.distance = tentativeGScore;
      neighbor.heuristic = manhattanDistance(neighbor, endNode);
      neighbor.fScore = neighbor.distance + neighbor.heuristic;
    }
  }
};

const manhattanDistance = (nodeA: Cell, nodeB: Cell): number => {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
};

const getNeighbors = (node: Cell, grid: Cell[][]): Cell[] => {
  const neighbors: Cell[] = [];
  const { col, row } = node;
  
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  
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
