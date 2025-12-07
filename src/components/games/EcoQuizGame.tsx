import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Users, Trophy, Clock, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface EcoQuizGameProps {
  onClose: () => void;
  onComplete: (points: number) => void;
}

interface Question {
  question: string;
  options: string[];
  correct: number;
  emoji: string;
}

const quizQuestions: Question[] = [
  {
    question: "What is the main cause of global warming?",
    options: ["Planting trees", "Greenhouse gases", "Rain", "Wind"],
    correct: 1,
    emoji: "🌡️"
  },
  {
    question: "Which of these is biodegradable?",
    options: ["Plastic bag", "Banana peel", "Glass bottle", "Styrofoam"],
    correct: 1,
    emoji: "🍌"
  },
  {
    question: "What does the 3Rs stand for?",
    options: ["Run, Rest, Repeat", "Reduce, Reuse, Recycle", "Read, Right, React", "Rain, River, Rock"],
    correct: 1,
    emoji: "♻️"
  },
  {
    question: "Which energy source is renewable?",
    options: ["Coal", "Oil", "Solar", "Natural Gas"],
    correct: 2,
    emoji: "☀️"
  },
  {
    question: "What layer protects us from UV rays?",
    options: ["Troposphere", "Stratosphere", "Ozone Layer", "Mesosphere"],
    correct: 2,
    emoji: "🛡️"
  },
  {
    question: "How long does a plastic bottle take to decompose?",
    options: ["10 years", "50 years", "450 years", "1 year"],
    correct: 2,
    emoji: "🧴"
  },
  {
    question: "What is composting?",
    options: ["Burning waste", "Decomposing organic matter", "Freezing food", "Mixing chemicals"],
    correct: 1,
    emoji: "🌱"
  },
  {
    question: "Which animal is most affected by plastic pollution?",
    options: ["Birds", "Sea turtles", "Elephants", "Lions"],
    correct: 1,
    emoji: "🐢"
  },
];

const EcoQuizGame = ({ onClose, onComplete }: EcoQuizGameProps) => {
  const [gameMode, setGameMode] = useState<"menu" | "join" | "host" | "playing" | "results">("menu");
  const [roomCode, setRoomCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [players] = useState([
    { name: "You", score: 0 },
    { name: "EcoWarrior", score: 85 },
    { name: "GreenHero", score: 70 },
    { name: "NatureLover", score: 65 },
  ]);

  // Timer effect
  useEffect(() => {
    if (gameMode !== "playing" || showAnswer) return;
    
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameMode, showAnswer, currentQuestion]);

  const handleTimeUp = () => {
    setShowAnswer(true);
    setTimeout(() => nextQuestion(), 2000);
  };

  const handleAnswer = (index: number) => {
    if (showAnswer) return;
    
    setSelectedAnswer(index);
    setShowAnswer(true);
    
    if (index === quizQuestions[currentQuestion].correct) {
      const pointsEarned = Math.max(10, timer * 2);
      setScore(prev => prev + pointsEarned);
    }

    setTimeout(() => nextQuestion(), 2000);
  };

  const nextQuestion = () => {
    if (currentQuestion >= quizQuestions.length - 1) {
      setGameMode("results");
      onComplete(score);
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
      setTimer(15);
    }
  };

  const generateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);
    setGameMode("host");
  };

  const startGame = () => {
    setGameMode("playing");
    setCurrentQuestion(0);
    setScore(0);
    setTimer(15);
  };

  // Menu Screen
  if (gameMode === "menu") {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md bg-gradient-to-br from-background to-primary/5 border-2 border-primary/30 p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-secondary to-eco-blue rounded-full flex items-center justify-center">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Live Eco Quiz</h2>
                <p className="text-muted-foreground text-sm">Compete with friends!</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={() => setGameMode("join")}
              className="w-full py-8 text-lg bg-gradient-to-r from-primary to-secondary rounded-xl"
            >
              🎮 Join a Room
            </Button>
            <Button 
              onClick={generateRoomCode}
              className="w-full py-8 text-lg bg-gradient-to-r from-secondary to-eco-blue rounded-xl"
            >
              🏠 Host a Room
            </Button>
            <Button 
              onClick={startGame}
              variant="outline"
              className="w-full py-6 text-lg rounded-xl border-2"
            >
              ⚡ Quick Play (Solo)
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Join Room Screen
  if (gameMode === "join") {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md bg-gradient-to-br from-background to-primary/5 border-2 border-primary/30 p-8">
          <Button variant="ghost" size="icon" onClick={() => setGameMode("menu")} className="mb-4">
            ← Back
          </Button>
          
          <h2 className="text-2xl font-bold text-foreground mb-6">Join a Room</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Your Name</label>
              <Input
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
                className="text-lg py-6 rounded-xl"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Room Code</label>
              <Input
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="Enter 6-digit code"
                className="text-lg py-6 rounded-xl text-center tracking-widest"
                maxLength={6}
              />
            </div>
            <Button 
              onClick={startGame}
              disabled={!playerName || roomCode.length < 6}
              className="w-full py-6 text-lg bg-gradient-to-r from-primary to-secondary rounded-xl"
            >
              Join Game 🚀
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Host Room Screen
  if (gameMode === "host") {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md bg-gradient-to-br from-background to-primary/5 border-2 border-primary/30 p-8 text-center">
          <Button variant="ghost" size="icon" onClick={() => setGameMode("menu")} className="mb-4">
            ← Back
          </Button>
          
          <h2 className="text-2xl font-bold text-foreground mb-4">Share This Code</h2>
          
          <div className="bg-primary/20 rounded-2xl p-6 mb-6">
            <p className="text-5xl font-bold tracking-widest text-primary">{roomCode}</p>
          </div>
          
          <p className="text-muted-foreground mb-6">
            Share this code with your friends to join the quiz!
          </p>

          <div className="space-y-3 mb-6">
            <p className="text-sm text-muted-foreground">Players waiting: 3</p>
            <div className="flex justify-center gap-2">
              {["You", "Player 2", "Player 3"].map((p, i) => (
                <div key={i} className="px-3 py-1 bg-muted rounded-full text-sm">{p}</div>
              ))}
            </div>
          </div>

          <Button 
            onClick={startGame}
            className="w-full py-6 text-lg bg-gradient-to-r from-primary to-secondary rounded-xl"
          >
            Start Game! 🎮
          </Button>
        </Card>
      </div>
    );
  }

  // Results Screen
  if (gameMode === "results") {
    const sortedPlayers = [...players.map((p, i) => i === 0 ? { ...p, score } : p)].sort((a, b) => b.score - a.score);
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md bg-gradient-to-br from-eco-green/20 to-eco-blue/20 border-2 border-primary/30 p-8">
          <div className="text-center space-y-6">
            <Trophy className="w-16 h-16 mx-auto text-eco-yellow" />
            <h2 className="text-3xl font-bold text-foreground">Quiz Complete!</h2>
            
            <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              +{score} Points
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-foreground">Leaderboard</h3>
              {sortedPlayers.map((player, index) => (
                <div 
                  key={player.name}
                  className={`flex items-center justify-between p-3 rounded-xl ${
                    player.name === "You" ? 'bg-primary/20 border-2 border-primary' : 'bg-muted'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅'}</span>
                    <span className="font-medium">{player.name}</span>
                  </div>
                  <span className="font-bold">{player.score} pts</span>
                </div>
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

  // Playing Screen
  const question = quizQuestions[currentQuestion];
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-gradient-to-br from-background to-primary/5 border-2 border-primary/30 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl ${
              timer <= 5 ? 'bg-red-500 animate-pulse' : 'bg-primary'
            } text-white`}>
              <Clock className="w-5 h-5 mr-1" />
              {timer}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Question {currentQuestion + 1}/{quizQuestions.length}</p>
              <Progress value={(currentQuestion / quizQuestions.length) * 100} className="w-32 h-2" />
            </div>
          </div>
          <div className="flex items-center gap-2 bg-eco-yellow/20 px-4 py-2 rounded-full">
            <Zap className="w-5 h-5 text-eco-yellow" />
            <span className="font-bold">{score} pts</span>
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-6 p-6 bg-muted/50 rounded-2xl">
          <span className="text-5xl mb-4 block">{question.emoji}</span>
          <h3 className="text-xl md:text-2xl font-bold text-foreground">{question.question}</h3>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {question.options.map((option, index) => {
            let buttonClass = "py-6 text-lg rounded-xl border-2 transition-all ";
            
            if (showAnswer) {
              if (index === question.correct) {
                buttonClass += "bg-green-500 border-green-500 text-white";
              } else if (index === selectedAnswer) {
                buttonClass += "bg-red-400 border-red-400 text-white";
              } else {
                buttonClass += "bg-muted border-muted opacity-50";
              }
            } else {
              buttonClass += "bg-card border-border hover:border-primary hover:bg-primary/10";
            }

            return (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                variant="outline"
                disabled={showAnswer}
                className={buttonClass}
              >
                {option}
              </Button>
            );
          })}
        </div>

        {showAnswer && (
          <p className="text-center mt-4 text-muted-foreground animate-pulse">
            {selectedAnswer === question.correct ? "🎉 Correct!" : "❌ Wrong answer"} Next question coming...
          </p>
        )}
      </Card>
    </div>
  );
};

export default EcoQuizGame;
