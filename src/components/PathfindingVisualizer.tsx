import React, { useState, useEffect, useCallback } from 'react';
import { Grid } from './Grid';
import { Controls } from './Controls';
import { AlgorithmSelector } from './AlgorithmSelector';
import { Cell, GridState, Algorithm } from '../types/pathfinding';
import { dijkstra } from '../algorithms/dijkstra';
import { aStar } from '../algorithms/aStar';
import { bfs } from '../algorithms/bfs';
import { dfs } from '../algorithms/dfs';
import { generateMazeWithPrims } from '../algorithms/mazeGenerator';
import { Button } from './ui/button';
import { Rocket } from 'lucide-react';

const GRID_ROWS = 20;
const GRID_COLS = 30;
const START_ROW = 10;
const START_COL = 5;
const END_ROW = 10;
const END_COL = 25;

export const PathfindingVisualizer: React.FC = () => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gridState, setGridState] = useState<GridState>('idle');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>('dijkstra');
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawMode, setDrawMode] = useState<'wall' | 'start' | 'end'>('wall');

  const initializeGrid = useCallback(() => {
    const newGrid: Cell[][] = [];
    for (let row = 0; row < GRID_ROWS; row++) {
      const currentRow: Cell[] = [];
      for (let col = 0; col < GRID_COLS; col++) {
        currentRow.push({
          row,
          col,
          isStart: row === START_ROW && col === START_COL,
          isEnd: row === END_ROW && col === END_COL,
          isWall: false,
          isVisited: false,
          isPath: false,
          distance: Infinity,
          previousNode: null,
          heuristic: 0,
          fScore: Infinity
        });
      }
      newGrid.push(currentRow);
    }
    setGrid(newGrid);
    setGridState('idle');
  }, []);

  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  const clearPath = () => {
    if (isRunning) return;
    
    const newGrid = grid.map(row =>
      row.map(cell => ({
        ...cell,
        isVisited: false,
        isPath: false,
        distance: Infinity,
        previousNode: null,
        heuristic: 0,
        fScore: Infinity
      }))
    );
    setGrid(newGrid);
    setGridState('idle');
  };

  const clearWalls = () => {
    if (isRunning) return;
    
    const newGrid = grid.map(row =>
      row.map(cell => ({
        ...cell,
        isWall: false,
        isVisited: false,
        isPath: false,
        distance: Infinity,
        previousNode: null,
        heuristic: 0,
        fScore: Infinity
      }))
    );
    setGrid(newGrid);
    setGridState('idle');
  };

  const generateMaze = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setGridState('generating-maze');
    
    // Clear existing walls first
    clearWalls();
    
    // Generate maze with animation
    await generateMazeWithPrims(grid, setGrid, speed);
    
    setIsRunning(false);
    setGridState('idle');
  };

  const runAlgorithm = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setGridState('running');
    
    // Clear previous path
    clearPath();
    
    const startNode = grid.flat().find(cell => cell.isStart);
    const endNode = grid.flat().find(cell => cell.isEnd);
    
    if (!startNode || !endNode) {
      setIsRunning(false);
      setGridState('idle');
      return;
    }
    
    let algorithm;
    switch (selectedAlgorithm) {
      case 'dijkstra':
        algorithm = dijkstra;
        break;
      case 'aStar':
        algorithm = aStar;
        break;
      case 'bfs':
        algorithm = bfs;
        break;
      case 'dfs':
        algorithm = dfs;
        break;
      default:
        algorithm = dijkstra;
    }
    
    await algorithm(grid, startNode, endNode, setGrid, speed);
    
    setIsRunning(false);
    setGridState('completed');
  };

  const handleCellInteraction = (row: number, col: number, type: 'click' | 'enter' | 'down') => {
    if (isRunning) return;
    
    if (type === 'down') {
      setIsDrawing(true);
    }
    
    if (type === 'click' || (type === 'enter' && isDrawing)) {
      const newGrid = [...grid];
      const cell = newGrid[row][col];
      
      if (drawMode === 'start') {
        // Clear previous start
        newGrid.forEach(row => row.forEach(cell => cell.isStart = false));
        cell.isStart = true;
        cell.isWall = false;
        cell.isEnd = false;
      } else if (drawMode === 'end') {
        // Clear previous end
        newGrid.forEach(row => row.forEach(cell => cell.isEnd = false));
        cell.isEnd = true;
        cell.isWall = false;
        cell.isStart = false;
      } else if (drawMode === 'wall' && !cell.isStart && !cell.isEnd) {
        cell.isWall = !cell.isWall;
      }
      
      setGrid(newGrid);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Pathfinding Algorithm Visualizer
          </h1>
          <Button 
            onClick={() => window.location.href = '/deployment'}
            className="bg-green-600 hover:bg-green-700"
          >
            <Rocket className="w-4 h-4 mr-2" />
            Deploy Info
          </Button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4 space-y-4">
            <AlgorithmSelector 
              selectedAlgorithm={selectedAlgorithm}
              onAlgorithmChange={setSelectedAlgorithm}
              disabled={isRunning}
            />
            <Controls
              onRunAlgorithm={runAlgorithm}
              onClearPath={clearPath}
              onClearWalls={clearWalls}
              onGenerateMaze={generateMaze}
              speed={speed}
              onSpeedChange={setSpeed}
              isRunning={isRunning}
              gridState={gridState}
              drawMode={drawMode}
              onDrawModeChange={setDrawMode}
            />
          </div>
          
          <div className="lg:w-3/4">
            <Grid
              grid={grid}
              onCellInteraction={handleCellInteraction}
              isRunning={isRunning}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
