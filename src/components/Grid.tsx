
import React from 'react';
import { Cell } from '../types/pathfinding';
import { cn } from '../lib/utils';

interface GridProps {
  grid: Cell[][];
  onCellInteraction: (row: number, col: number, type: 'click' | 'enter' | 'down') => void;
  isRunning: boolean;
}

export const Grid: React.FC<GridProps> = ({ grid, onCellInteraction, isRunning }) => {
  const getCellClassName = (cell: Cell) => {
    const baseClasses = "w-6 h-6 border border-gray-600 cursor-pointer transition-all duration-150 select-none";
    
    if (cell.isStart) {
      return cn(baseClasses, "bg-green-500 border-green-400");
    }
    if (cell.isEnd) {
      return cn(baseClasses, "bg-red-500 border-red-400");
    }
    if (cell.isPath) {
      return cn(baseClasses, "bg-yellow-400 border-yellow-300 animate-pulse");
    }
    if (cell.isVisited) {
      return cn(baseClasses, "bg-blue-500 border-blue-400");
    }
    if (cell.isWall) {
      return cn(baseClasses, "bg-gray-800 border-gray-700");
    }
    
    return cn(baseClasses, "bg-gray-100 border-gray-300 hover:bg-gray-200");
  };

  return (
    <div className="inline-block bg-gray-800 p-4 rounded-lg shadow-2xl">
      <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${grid[0]?.length || 0}, 1fr)` }}>
        {grid.flat().map((cell, index) => (
          <div
            key={`${cell.row}-${cell.col}`}
            className={getCellClassName(cell)}
            onClick={() => onCellInteraction(cell.row, cell.col, 'click')}
            onMouseDown={() => onCellInteraction(cell.row, cell.col, 'down')}
            onMouseEnter={() => onCellInteraction(cell.row, cell.col, 'enter')}
            title={`(${cell.row}, ${cell.col})`}
          />
        ))}
      </div>
      
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 border border-green-400"></div>
          <span>Start</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 border border-red-400"></div>
          <span>End</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-800 border border-gray-700"></div>
          <span>Wall</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 border border-blue-400"></div>
          <span>Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 border border-yellow-300"></div>
          <span>Path</span>
        </div>
      </div>
    </div>
  );
};
