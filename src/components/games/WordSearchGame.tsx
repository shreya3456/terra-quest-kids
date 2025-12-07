import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Sparkles, Search, Award } from "lucide-react";

interface WordSearchGameProps {
  onClose: () => void;
  onComplete: (points: number) => void;
}

const WORDS = ["RECYCLE", "COMPOST", "OZONE", "CLIMATE", "HABITAT", "REUSE", "SOLAR", "GREEN"];
const GRID_SIZE = 10;

const generateGrid = (words: string[]): string[][] => {
  const grid: string[][] = Array(GRID_SIZE).fill(null).map(() => 
    Array(GRID_SIZE).fill('')
  );
  
  const directions = [
    [0, 1],   // right
    [1, 0],   // down
    [1, 1],   // diagonal down-right
  ];

  const placedWords: { word: string; positions: [number, number][] }[] = [];

  words.forEach(word => {
    let placed = false;
    let attempts = 0;
    
    while (!placed && attempts < 100) {
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const startRow = Math.floor(Math.random() * GRID_SIZE);
      const startCol = Math.floor(Math.random() * GRID_SIZE);
      
      const endRow = startRow + dir[0] * (word.length - 1);
      const endCol = startCol + dir[1] * (word.length - 1);
      
      if (endRow >= 0 && endRow < GRID_SIZE && endCol >= 0 && endCol < GRID_SIZE) {
        let canPlace = true;
        const positions: [number, number][] = [];
        
        for (let i = 0; i < word.length; i++) {
          const row = startRow + dir[0] * i;
          const col = startCol + dir[1] * i;
          positions.push([row, col]);
          
          if (grid[row][col] !== '' && grid[row][col] !== word[i]) {
            canPlace = false;
            break;
          }
        }
        
        if (canPlace) {
          for (let i = 0; i < word.length; i++) {
            const row = startRow + dir[0] * i;
            const col = startCol + dir[1] * i;
            grid[row][col] = word[i];
          }
          placedWords.push({ word, positions });
          placed = true;
        }
      }
      attempts++;
    }
  });

  // Fill empty cells with random letters
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid[i][j] === '') {
        grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return grid;
};

const WordSearchGame = ({ onClose, onComplete }: WordSearchGameProps) => {
  const [grid] = useState(() => generateGrid(WORDS));
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [currentSelection, setCurrentSelection] = useState<[number, number][]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastFound, setLastFound] = useState<string | null>(null);

  const getCellKey = (row: number, col: number) => `${row}-${col}`;

  const handleMouseDown = (row: number, col: number) => {
    setIsSelecting(true);
    setCurrentSelection([[row, col]]);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!isSelecting) return;
    
    // Only allow straight lines
    if (currentSelection.length > 0) {
      const [startRow, startCol] = currentSelection[0];
      const rowDiff = row - startRow;
      const colDiff = col - startCol;
      
      // Check if it's a valid direction (horizontal, vertical, or diagonal)
      const isHorizontal = rowDiff === 0;
      const isVertical = colDiff === 0;
      const isDiagonal = Math.abs(rowDiff) === Math.abs(colDiff);
      
      if (isHorizontal || isVertical || isDiagonal) {
        const newSelection: [number, number][] = [];
        const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
        const rowStep = steps === 0 ? 0 : rowDiff / steps;
        const colStep = steps === 0 ? 0 : colDiff / steps;
        
        for (let i = 0; i <= steps; i++) {
          newSelection.push([startRow + rowStep * i, startCol + colStep * i]);
        }
        setCurrentSelection(newSelection);
      }
    }
  };

  const handleMouseUp = useCallback(() => {
    if (!isSelecting) return;
    setIsSelecting(false);

    // Get the word from selection
    const word = currentSelection.map(([r, c]) => grid[r][c]).join('');
    const reversedWord = word.split('').reverse().join('');

    // Check if it's a valid word
    const foundWord = WORDS.find(w => w === word || w === reversedWord);
    
    if (foundWord && !foundWords.has(foundWord)) {
      const newFoundWords = new Set(foundWords);
      newFoundWords.add(foundWord);
      setFoundWords(newFoundWords);
      
      const newScore = score + 15;
      setScore(newScore);
      setLastFound(foundWord);
      
      // Add to permanent selection
      const newSelectedCells = new Set(selectedCells);
      currentSelection.forEach(([r, c]) => newSelectedCells.add(getCellKey(r, c)));
      setSelectedCells(newSelectedCells);

      setTimeout(() => setLastFound(null), 1500);

      // Check if all words found
      if (newFoundWords.size === WORDS.length) {
        setTimeout(() => {
          setShowSuccess(true);
          onComplete(newScore);
        }, 500);
      }
    }

    setCurrentSelection([]);
  }, [isSelecting, currentSelection, grid, foundWords, score, selectedCells, onComplete]);

  useEffect(() => {
    const handleGlobalMouseUp = () => handleMouseUp();
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [handleMouseUp]);

  const isCellInCurrentSelection = (row: number, col: number) => {
    return currentSelection.some(([r, c]) => r === row && c === col);
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md bg-gradient-to-br from-eco-green/20 to-eco-blue/20 border-2 border-primary/30 p-8 text-center animate-bounce-in">
          <div className="space-y-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center animate-pulse">
              <Award className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-primary">🏆 Eco Badge Earned!</h2>
            <p className="text-muted-foreground">Word Search Champion</p>
            <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              +{score} Points
            </div>
            <div className="flex gap-2 justify-center">
              {[...Array(5)].map((_, i) => (
                <Sparkles key={i} className="w-6 h-6 text-eco-yellow animate-bounce" style={{ animationDelay: `${i * 100}ms` }} />
              ))}
            </div>
            <Button onClick={onClose} className="w-full bg-gradient-to-r from-primary to-secondary text-lg py-6 rounded-xl">
              Back to Games 🎮
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-background to-primary/5 border-2 border-primary/30 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Eco Word Search</h2>
              <p className="text-muted-foreground text-sm">Find all the eco words!</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-primary/20 px-4 py-2 rounded-full">
              <span className="font-bold text-primary">Score: {score}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Found Word Popup */}
        {lastFound && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-60 px-8 py-4 rounded-2xl bg-green-500 text-white font-bold text-xl shadow-2xl animate-bounce-in">
            🎉 Found: {lastFound}!
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Word List */}
          <div className="lg:w-48 space-y-2">
            <h3 className="font-bold text-foreground mb-3">Find these words:</h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {WORDS.map(word => (
                <div
                  key={word}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    foundWords.has(word)
                      ? 'bg-green-500/20 text-green-600 line-through'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {foundWords.has(word) ? '✅' : '🔍'} {word}
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Found: {foundWords.size}/{WORDS.length}
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1 flex justify-center">
            <div 
              className="inline-grid gap-1 select-none bg-muted/50 p-3 rounded-xl"
              style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
            >
              {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                  const isSelected = selectedCells.has(getCellKey(rowIndex, colIndex));
                  const isCurrentlySelecting = isCellInCurrentSelection(rowIndex, colIndex);
                  
                  return (
                    <div
                      key={getCellKey(rowIndex, colIndex)}
                      onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                      onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                      className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-bold text-sm md:text-base rounded-lg cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-green-500 text-white scale-105'
                          : isCurrentlySelecting
                          ? 'bg-primary text-white scale-110'
                          : 'bg-card hover:bg-primary/20'
                      }`}
                    >
                      {cell}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-muted-foreground mt-4 text-sm">
          💡 Click and drag to select words horizontally, vertically, or diagonally!
        </p>
      </Card>
    </div>
  );
};

export default WordSearchGame;
