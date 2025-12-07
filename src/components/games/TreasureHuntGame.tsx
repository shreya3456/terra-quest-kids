import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, MapPin, Gift, Sparkles, Lock, Unlock, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface TreasureHuntGameProps {
  onClose: () => void;
  onComplete: (points: number) => void;
}

interface Clue {
  id: number;
  title: string;
  emoji: string;
  riddle: string;
  question: string;
  answer: string;
  hint: string;
  points: number;
}

const clues: Clue[] = [
  {
    id: 1,
    title: "The Green Guardian",
    emoji: "🌳",
    riddle: "I stand tall and provide shade, I give oxygen and never fade. Birds make homes in my arms so wide, what am I? The forest's pride!",
    question: "What gives us oxygen and absorbs CO2?",
    answer: "tree",
    hint: "It has leaves, trunk, and roots",
    points: 20,
  },
  {
    id: 2,
    title: "The Blue Mystery",
    emoji: "💧",
    riddle: "I fall from the sky, fill rivers and seas. Without me, no life can ever be. I'm the cycle that never ends, nature's precious trend!",
    question: "What cycle involves evaporation, condensation, and precipitation?",
    answer: "water",
    hint: "H2O",
    points: 25,
  },
  {
    id: 3,
    title: "The Solar Secret",
    emoji: "☀️",
    riddle: "I rise in the east and set in the west. I give energy that's truly the best. Panels catch my rays so bright, turning me into clean light!",
    question: "What renewable energy source comes from our star?",
    answer: "solar",
    hint: "Related to the sun",
    points: 25,
  },
  {
    id: 4,
    title: "The Final Treasure",
    emoji: "🌍",
    riddle: "I am your home, the only one we share. With land and sea and precious air. Protect me well, keep me green, I'm the most beautiful planet you've ever seen!",
    question: "What planet do we call home?",
    answer: "earth",
    hint: "The third planet from the sun",
    points: 30,
  },
];

const TreasureHuntGame = ({ onClose, onComplete }: TreasureHuntGameProps) => {
  const [currentClue, setCurrentClue] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [unlockedClues, setUnlockedClues] = useState<number[]>([0]);

  const handleSubmit = () => {
    const clue = clues[currentClue];
    const isCorrect = answer.toLowerCase().trim() === clue.answer.toLowerCase();

    if (isCorrect) {
      const newScore = score + clue.points;
      setScore(newScore);
      setFeedback("correct");

      if (currentClue >= clues.length - 1) {
        setTimeout(() => {
          setGameComplete(true);
          onComplete(newScore);
        }, 1500);
      } else {
        setTimeout(() => {
          setUnlockedClues([...unlockedClues, currentClue + 1]);
          setCurrentClue(currentClue + 1);
          setAnswer("");
          setFeedback(null);
          setShowHint(false);
        }, 1500);
      }
    } else {
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  if (gameComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md bg-gradient-to-br from-eco-yellow/30 to-eco-green/30 border-2 border-eco-yellow/50 p-8 text-center animate-bounce-in">
          <div className="space-y-6">
            <div className="relative">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-eco-yellow to-amber-500 rounded-full flex items-center justify-center animate-pulse">
                <Gift className="w-16 h-16 text-white" />
              </div>
              {[...Array(8)].map((_, i) => (
                <Sparkles
                  key={i}
                  className="absolute w-6 h-6 text-eco-yellow animate-bounce"
                  style={{
                    top: `${20 + Math.sin(i * 45 * Math.PI / 180) * 60}%`,
                    left: `${50 + Math.cos(i * 45 * Math.PI / 180) * 40}%`,
                    animationDelay: `${i * 100}ms`,
                  }}
                />
              ))}
            </div>
            
            <h2 className="text-3xl font-bold text-foreground">🎉 Treasure Found!</h2>
            <p className="text-muted-foreground">You've completed the Eco Treasure Hunt!</p>
            
            <div className="bg-primary/20 rounded-2xl p-6">
              <p className="text-sm text-muted-foreground mb-2">Total Points Earned</p>
              <div className="text-5xl font-bold bg-gradient-to-r from-primary to-eco-yellow bg-clip-text text-transparent">
                +{score}
              </div>
            </div>

            <Card className="bg-eco-green/20 p-4 rounded-xl text-left">
              <p className="font-medium text-foreground">🏆 Achievement Unlocked!</p>
              <p className="text-sm text-muted-foreground">Eco Explorer - Completed the Treasure Hunt</p>
            </Card>

            <Button onClick={onClose} className="w-full bg-gradient-to-r from-primary to-secondary text-lg py-6 rounded-xl">
              Claim Treasure 🎁
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const clue = clues[currentClue];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-background to-primary/5 border-2 border-primary/30 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-eco-yellow to-amber-500 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Eco Treasure Hunt</h2>
              <p className="text-muted-foreground text-sm">Solve riddles to find the treasure!</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-eco-yellow/20 px-4 py-2 rounded-full">
              <span className="font-bold text-eco-yellow">{score} pts</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Progress Path */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">{currentClue + 1}/{clues.length}</span>
          </div>
          <div className="flex items-center gap-2">
            {clues.map((c, index) => (
              <div key={c.id} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    index < currentClue
                      ? 'bg-green-500 text-white'
                      : index === currentClue
                      ? 'bg-primary text-white animate-pulse'
                      : unlockedClues.includes(index)
                      ? 'bg-muted text-foreground'
                      : 'bg-muted/50 text-muted-foreground'
                  }`}
                >
                  {index < currentClue ? (
                    '✓'
                  ) : unlockedClues.includes(index) ? (
                    <Unlock className="w-4 h-4" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                </div>
                {index < clues.length - 1 && (
                  <div className={`flex-1 h-1 mx-1 rounded ${
                    index < currentClue ? 'bg-green-500' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-eco-yellow to-amber-500 flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Feedback Popup */}
        {feedback && (
          <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-60 px-8 py-4 rounded-2xl text-white font-bold text-xl shadow-2xl animate-bounce-in ${
            feedback === "correct" ? 'bg-green-500' : 'bg-red-400'
          }`}>
            {feedback === "correct" ? "🎉 Correct! Moving to next clue..." : "❌ Try again!"}
          </div>
        )}

        {/* Current Clue */}
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 mb-6 border-2 border-primary/20">
          <div className="text-center mb-4">
            <span className="text-6xl mb-4 block">{clue.emoji}</span>
            <h3 className="text-xl font-bold text-foreground">Clue {clue.id}: {clue.title}</h3>
          </div>
          
          <div className="bg-card/80 p-4 rounded-xl mb-4">
            <p className="text-foreground italic text-center leading-relaxed">"{clue.riddle}"</p>
          </div>

          <div className="bg-muted p-4 rounded-xl">
            <p className="font-medium text-foreground text-center">{clue.question}</p>
          </div>
        </Card>

        {/* Answer Input */}
        <div className="space-y-4">
          <div className="flex gap-3">
            <Input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer..."
              className="flex-1 text-lg py-6 rounded-xl"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <Button
              onClick={handleSubmit}
              disabled={!answer.trim()}
              className="px-8 bg-gradient-to-r from-primary to-secondary rounded-xl"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Hint */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              onClick={() => setShowHint(true)}
              disabled={showHint}
              className="text-muted-foreground"
            >
              {showHint ? `💡 Hint: ${clue.hint}` : "Need a hint? 💡"}
            </Button>
          </div>
        </div>

        {/* Points Info */}
        <p className="text-center text-muted-foreground mt-4 text-sm">
          🎯 This clue is worth {clue.points} eco points!
        </p>
      </Card>
    </div>
  );
};

export default TreasureHuntGame;
