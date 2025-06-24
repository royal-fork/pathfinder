import React from 'react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { GridState } from '../types/pathfinding';
import { Play, Square, Trash2, Grid3X3, MousePointer, Navigation, Target } from 'lucide-react';

interface ControlsProps {
  onRunAlgorithm: () => void;
  onClearPath: () => void;
  onClearWalls: () => void;
  onGenerateMaze: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  isRunning: boolean;
  gridState: GridState;
  drawMode: 'wall' | 'start' | 'end';
  onDrawModeChange: (mode: 'wall' | 'start' | 'end') => void;
}

export const Controls: React.FC<ControlsProps> = ({
  onRunAlgorithm,
  onClearPath,
  onClearWalls,
  onGenerateMaze,
  speed,
  onSpeedChange,
  isRunning,
  gridState,
  drawMode,
  onDrawModeChange
}) => {
  const getStatusText = () => {
    switch (gridState) {
      case 'generating-maze':
        return 'Generating maze...';
      case 'running':
        return 'Algorithm running...';
      case 'completed':
        return 'Path found!';
      default:
        return 'Ready';
    }
  };

  const getStatusColor = () => {
    switch (gridState) {
      case 'generating-maze':
        return 'text-orange-400';
      case 'running':
        return 'text-blue-400';
      case 'completed':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      {/* Status */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg">Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </p>
        </CardContent>
      </Card>

      {/* Draw Mode */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg">Draw Mode</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={drawMode} 
            onValueChange={(value) => onDrawModeChange(value as 'wall' | 'start' | 'end')}
            disabled={isRunning}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="wall" id="wall" />
              <Label htmlFor="wall" className="flex items-center gap-2 text-white">
                <Square className="w-4 h-4" />
                Walls
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="start" id="start" />
              <Label htmlFor="start" className="flex items-center gap-2 text-white">
                <Navigation className="w-4 h-4" />
                Start Point
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="end" id="end" />
              <Label htmlFor="end" className="flex items-center gap-2 text-white">
                <Target className="w-4 h-4" />
                End Point
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Algorithm Controls */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg">Algorithm Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={onRunAlgorithm}
            disabled={isRunning}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Play className="w-4 h-4 mr-2" />
            Run Algorithm
          </Button>
          
          <Button
            onClick={onClearPath}
            disabled={isRunning}
            variant="outline"
            className="w-full border-gray-600 text-white hover:bg-gray-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Path
          </Button>
        </CardContent>
      </Card>

      {/* Maze Controls */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg">Maze Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={onGenerateMaze}
            disabled={isRunning}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            <Grid3X3 className="w-4 h-4 mr-2" />
            Generate Maze
          </Button>
          
          <Button
            onClick={onClearWalls}
            disabled={isRunning}
            variant="outline"
            className="w-full border-gray-600 text-white hover:bg-gray-700"
          >
            <Square className="w-4 h-4 mr-2" />
            Clear Walls
          </Button>
        </CardContent>
      </Card>

      {/* Speed Control */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg">Animation Speed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Slider
              value={[speed]}
              onValueChange={(values) => onSpeedChange(values[0])}
              min={1}
              max={100}
              step={1}
              disabled={isRunning}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-400">
              <span>Slow</span>
              <span className="text-white font-medium">{speed}%</span>
              <span>Fast</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
