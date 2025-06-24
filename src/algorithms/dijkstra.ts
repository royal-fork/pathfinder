
import { Cell } from '../types/pathfinding';

export const dijkstra = async (
  grid: Cell[][],
  startNode: Cell,
  endNode: Cell,
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>,
  speed: number
) => {
  const visitedNodesInOrder: Cell[] = [];
  const unvisitedNodes = getAllNodes(grid);
  
  startNode.distance = 0;
  
  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift()!;
    
    if (closestNode.isWall) continue;
    
    if (closestNode.distance === Infinity) break;
    
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    
    // Update grid with animation
    if (!closestNode.isStart && !closestNode.isEnd) {
      setGrid(prevGrid => {
        const newGrid = prevGrid.map(row => [...row]);
        newGrid[closestNode.row][closestNode.col] = { ...closestNode };
        return newGrid;
      });
      
      await new Promise(resolve => setTimeout(resolve, Math.max(1, 101 - speed)));
    }
    
    if (closestNode === endNode) {
      // Animate the path
      const path = getNodesInShortestPathOrder(endNode);
      await animatePath(path, setGrid, speed);
      return;
    }
    
    updateUnvisitedNeighbors(closestNode, grid);
  }
};

const getAllNodes = (grid: Cell[][]): Cell[] => {
  const nodes: Cell[] = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

const sortNodesByDistance = (unvisitedNodes: Cell[]) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const updateUnvisitedNeighbors = (node: Cell, grid: Cell[][]) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
};

const getUnvisitedNeighbors = (node: Cell, grid: Cell[][]): Cell[] => {
  const neighbors: Cell[] = [];
  const { col, row } = node;
  
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  
  return neighbors.filter(neighbor => !neighbor.isVisited);
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
