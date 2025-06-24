
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Algorithm } from '../types/pathfinding';

interface AlgorithmSelectorProps {
  selectedAlgorithm: Algorithm;
  onAlgorithmChange: (algorithm: Algorithm) => void;
  disabled: boolean;
}

const algorithmInfo = {
  dijkstra: {
    name: "Dijkstra's Algorithm",
    description: "Guarantees shortest path. Explores nodes in order of distance from start.",
    complexity: "O((V + E) log V)"
  },
  aStar: {
    name: "A* Algorithm",
    description: "Uses heuristic to find shortest path faster than Dijkstra.",
    complexity: "O(b^d)"
  },
  bfs: {
    name: "Breadth-First Search",
    description: "Guarantees shortest path on unweighted graphs. Explores level by level.",
    complexity: "O(V + E)"
  },
  dfs: {
    name: "Depth-First Search",
    description: "Does not guarantee shortest path. Explores as far as possible before backtracking.",
    complexity: "O(V + E)"
  }
};

export const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
  selectedAlgorithm,
  onAlgorithmChange,
  disabled
}) => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-lg">Algorithm Selection</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={selectedAlgorithm} 
          onValueChange={(value) => onAlgorithmChange(value as Algorithm)}
          disabled={disabled}
          className="space-y-4"
        >
          {(Object.keys(algorithmInfo) as Algorithm[]).map((algorithm) => {
            const info = algorithmInfo[algorithm];
            return (
              <div key={algorithm} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={algorithm} id={algorithm} />
                  <Label htmlFor={algorithm} className="text-white font-medium cursor-pointer">
                    {info.name}
                  </Label>
                </div>
                {selectedAlgorithm === algorithm && (
                  <div className="ml-6 space-y-1 text-sm">
                    <p className="text-gray-300">{info.description}</p>
                    <p className="text-gray-400">Time Complexity: {info.complexity}</p>
                  </div>
                )}
              </div>
            );
          })}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};
