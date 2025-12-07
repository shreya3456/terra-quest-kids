import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Sparkles, Leaf, Trophy } from "lucide-react";

interface WasteSortingGameProps {
  onClose: () => void;
  onComplete: (points: number) => void;
}

interface WasteItem {
  id: string;
  name: string;
  emoji: string;
  correctBin: "plastic" | "paper" | "food";
}

const wasteItems: WasteItem[] = [
  { id: "1", name: "Plastic Bottle", emoji: "🧴", correctBin: "plastic" },
  { id: "2", name: "Newspaper", emoji: "📰", correctBin: "paper" },
  { id: "3", name: "Banana Peel", emoji: "🍌", correctBin: "food" },
  { id: "4", name: "Candy Wrapper", emoji: "🍬", correctBin: "plastic" },
  { id: "5", name: "Cardboard Box", emoji: "📦", correctBin: "paper" },
  { id: "6", name: "Apple Core", emoji: "🍎", correctBin: "food" },
  { id: "7", name: "Plastic Bag", emoji: "🛍️", correctBin: "plastic" },
  { id: "8", name: "Magazine", emoji: "📖", correctBin: "paper" },
  { id: "9", name: "Egg Shell", emoji: "🥚", correctBin: "food" },
  { id: "10", name: "Soda Can", emoji: "🥫", correctBin: "plastic" },
];

const bins = [
  { id: "plastic", name: "Plastic", emoji: "♻️", color: "from-blue-400 to-blue-600" },
  { id: "paper", name: "Paper", emoji: "📄", color: "from-amber-400 to-amber-600" },
  { id: "food", name: "Food Waste", emoji: "🍃", color: "from-green-400 to-green-600" },
];

const ecoFacts = [
  "🌍 Recycling one plastic bottle saves enough energy to power a light bulb for 3 hours!",
  "🌳 Recycling paper saves 17 trees per ton!",
  "🍂 Composting food waste reduces methane emissions!",
  "💧 It takes 450 years for a plastic bottle to decompose!",
  "♻️ About 75% of waste is recyclable!",
];

const WasteSortingGame = ({ onClose, onComplete }: WasteSortingGameProps) => {
  const [remainingItems, setRemainingItems] = useState<WasteItem[]>([...wasteItems].sort(() => Math.random() - 0.5));
  const [currentItem, setCurrentItem] = useState<WasteItem | null>(remainingItems[0] || null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ show: boolean; correct: boolean; message: string }>({ show: false, correct: false, message: "" });
  const [gameComplete, setGameComplete] = useState(false);
  const [draggedOver, setDraggedOver] = useState<string | null>(null);

  const handleDrop = useCallback((binId: string) => {
    if (!currentItem) return;

    const isCorrect = currentItem.correctBin === binId;
    const newScore = isCorrect ? score + 10 : score;
    setScore(newScore);

    setFeedback({
      show: true,
      correct: isCorrect,
      message: isCorrect ? "🎉 Correct! Great job!" : "❌ Try again! Think about what it's made of.",
    });

    setTimeout(() => {
      setFeedback({ show: false, correct: false, message: "" });
      
      const newRemaining = remainingItems.filter(item => item.id !== currentItem.id);
      setRemainingItems(newRemaining);
      
      if (newRemaining.length === 0) {
        setGameComplete(true);
        onComplete(newScore);
      } else {
        setCurrentItem(newRemaining[0]);
      }
    }, 1000);

    setDraggedOver(null);
  }, [currentItem, remainingItems, score, onComplete]);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", "waste");
  };

  const handleDragOver = (e: React.DragEvent, binId: string) => {
    e.preventDefault();
    setDraggedOver(binId);
  };

  const handleDragLeave = () => {
    setDraggedOver(null);
  };

  if (gameComplete) {
    const randomFact = ecoFacts[Math.floor(Math.random() * ecoFacts.length)];
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md bg-gradient-to-br from-eco-green/20 to-eco-blue/20 border-2 border-primary/30 p-8 text-center animate-bounce-in">
          <div className="space-y-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-eco-yellow to-eco-green rounded-full flex items-center justify-center animate-pulse">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-primary">🎉 Amazing Job!</h2>
            <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              +{score} Points
            </div>
            <Card className="bg-primary/10 p-4 rounded-xl">
              <p className="text-foreground font-medium">{randomFact}</p>
            </Card>
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
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Waste Sorting Game</h2>
              <p className="text-muted-foreground text-sm">Drag items to the correct bin!</p>
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

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{wasteItems.length - remainingItems.length}/{wasteItems.length}</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 rounded-full"
              style={{ width: `${((wasteItems.length - remainingItems.length) / wasteItems.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Item to Sort */}
        {currentItem && (
          <div className="flex justify-center mb-8">
            <div
              draggable
              onDragStart={handleDragStart}
              className="w-32 h-32 bg-gradient-to-br from-eco-yellow/30 to-eco-green/30 rounded-2xl flex flex-col items-center justify-center cursor-grab active:cursor-grabbing border-3 border-dashed border-primary/50 hover:scale-110 transition-transform shadow-lg animate-bounce-in"
            >
              <span className="text-5xl mb-2">{currentItem.emoji}</span>
              <span className="text-sm font-medium text-foreground text-center px-2">{currentItem.name}</span>
            </div>
          </div>
        )}

        {/* Feedback Popup */}
        {feedback.show && (
          <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-60 px-8 py-4 rounded-2xl text-white font-bold text-xl shadow-2xl animate-bounce-in ${feedback.correct ? 'bg-green-500' : 'bg-red-400'}`}>
            {feedback.message}
          </div>
        )}

        {/* Bins */}
        <div className="grid grid-cols-3 gap-4">
          {bins.map((bin) => (
            <div
              key={bin.id}
              onDragOver={(e) => handleDragOver(e, bin.id)}
              onDragLeave={handleDragLeave}
              onDrop={() => handleDrop(bin.id)}
              onClick={() => handleDrop(bin.id)}
              className={`relative p-6 rounded-2xl border-3 border-dashed transition-all duration-300 cursor-pointer ${
                draggedOver === bin.id
                  ? 'scale-105 border-primary bg-primary/20'
                  : 'border-muted-foreground/30 hover:border-primary/50'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${bin.color} opacity-20 rounded-2xl`} />
              <div className="relative flex flex-col items-center gap-3">
                <span className="text-5xl">{bin.emoji}</span>
                <span className="font-bold text-foreground text-lg">{bin.name}</span>
                <span className="text-xs text-muted-foreground">Drop here</span>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <p className="text-center text-muted-foreground mt-6 text-sm">
          💡 Tip: Drag the item above and drop it into the correct recycling bin!
        </p>
      </Card>
    </div>
  );
};

export default WasteSortingGame;
