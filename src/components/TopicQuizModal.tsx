import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Timer, Trophy, RotateCcw, CheckCircle2, XCircle, LucideIcon } from "lucide-react";
import confetti from "canvas-confetti";

interface TopicQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: {
    title: string;
    icon: LucideIcon;
    color: string;
  } | null;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const quizData: Record<string, Question[]> = {
  "Air Pollution": [
    { question: "What is the main cause of air pollution in cities?", options: ["Trees", "Vehicle exhaust", "Flowers", "Rivers"], correctAnswer: 1 },
    { question: "Which gas do trees absorb from the air?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"], correctAnswer: 2 },
    { question: "What can we do to reduce air pollution?", options: ["Burn more garbage", "Use public transport", "Cut trees", "Use more plastic"], correctAnswer: 1 },
    { question: "What causes smog in cities?", options: ["Clean air", "Smoke and fog mixing", "Rain", "Snow"], correctAnswer: 1 },
    { question: "Which of these is a renewable energy source?", options: ["Coal", "Oil", "Solar power", "Natural gas"], correctAnswer: 2 },
    { question: "What does AQI stand for?", options: ["Air Quality Index", "Air Quantity Index", "Average Quality Index", "Air Quick Index"], correctAnswer: 0 },
    { question: "How do masks help with air pollution?", options: ["They don't help", "Filter harmful particles", "Create more pollution", "Make you run faster"], correctAnswer: 1 },
    { question: "Which activity releases the most air pollution?", options: ["Walking", "Cycling", "Driving cars", "Reading"], correctAnswer: 2 },
    { question: "What color is the AQI when air is unhealthy?", options: ["Green", "Yellow", "Red", "Blue"], correctAnswer: 2 },
    { question: "Plants help clean the air by producing what?", options: ["Smoke", "Oxygen", "Pollution", "Dust"], correctAnswer: 1 }
  ],
  "Water Pollution": [
    { question: "What is the main source of water pollution?", options: ["Rain", "Industrial waste", "Clean rivers", "Clouds"], correctAnswer: 1 },
    { question: "How long can a plastic bottle take to decompose?", options: ["1 year", "10 years", "450 years", "1 day"], correctAnswer: 2 },
    { question: "What happens when oil spills in the ocean?", options: ["Fish become happy", "Marine life suffers", "Water becomes cleaner", "Nothing happens"], correctAnswer: 1 },
    { question: "Which animal is most affected by ocean plastic?", options: ["Dogs", "Cats", "Sea turtles", "Rabbits"], correctAnswer: 2 },
    { question: "What percentage of Earth's water is freshwater?", options: ["97%", "50%", "3%", "25%"], correctAnswer: 2 },
    { question: "What should we NOT throw in rivers?", options: ["Leaves", "Plastic waste", "Flower petals", "Nothing"], correctAnswer: 1 },
    { question: "How can we save water at home?", options: ["Keep taps running", "Take shorter showers", "Waste water", "Never drink water"], correctAnswer: 1 },
    { question: "What is water contamination?", options: ["Clean water", "Dirty water mixing with clean water", "Drinking water", "Rainwater"], correctAnswer: 1 },
    { question: "Which disease can spread through polluted water?", options: ["Headache", "Cholera", "Broken leg", "Toothache"], correctAnswer: 1 },
    { question: "Microplastics are tiny pieces of what?", options: ["Metal", "Glass", "Plastic", "Paper"], correctAnswer: 2 }
  ],
  "Sustainable Development": [
    { question: "What does 'sustainable' mean?", options: ["Use everything up quickly", "Meeting needs without harming future", "Wasting resources", "Ignoring environment"], correctAnswer: 1 },
    { question: "How many Sustainable Development Goals are there?", options: ["5", "10", "17", "25"], correctAnswer: 2 },
    { question: "Which energy source is sustainable?", options: ["Coal", "Oil", "Solar", "Gas"], correctAnswer: 2 },
    { question: "What are the 3 P's of sustainability?", options: ["People, Planet, Prosperity", "Plastic, Paper, Planet", "Peace, Power, Profit", "Play, Party, Planet"], correctAnswer: 0 },
    { question: "What does recycling help with?", options: ["Creating more waste", "Reducing landfill waste", "Making pollution", "Wasting resources"], correctAnswer: 1 },
    { question: "Why is planting trees sustainable?", options: ["Trees are ugly", "Trees clean air and provide oxygen", "Trees cause pollution", "Trees waste water"], correctAnswer: 1 },
    { question: "What is a carbon footprint?", options: ["A foot made of carbon", "Amount of CO2 we produce", "A black footprint", "A type of shoe"], correctAnswer: 1 },
    { question: "Which bag is more sustainable?", options: ["Plastic bag", "Cloth bag", "Paper bag", "No bag"], correctAnswer: 1 },
    { question: "What year are the SDGs meant to be achieved?", options: ["2020", "2025", "2030", "2050"], correctAnswer: 2 },
    { question: "Local food is sustainable because it...", options: ["Tastes bad", "Travels less distance", "Is more expensive", "Uses more plastic"], correctAnswer: 1 }
  ],
  "Rainwater Harvesting": [
    { question: "What is rainwater harvesting?", options: ["Wasting rain", "Collecting and storing rainwater", "Polluting rain", "Avoiding rain"], correctAnswer: 1 },
    { question: "Where is rainwater usually collected from?", options: ["Underground", "Rooftops", "Rivers", "Oceans"], correctAnswer: 1 },
    { question: "Why is rainwater harvesting important?", options: ["It wastes water", "It saves precious water", "It creates pollution", "It's not important"], correctAnswer: 1 },
    { question: "What is groundwater recharge?", options: ["Charging batteries", "Rain seeping into ground to refill water table", "Polluting ground", "Wasting water"], correctAnswer: 1 },
    { question: "Which ancient civilization practiced rainwater harvesting?", options: ["None", "Roman Empire", "No one ever", "Future people only"], correctAnswer: 1 },
    { question: "How can harvested rainwater be used?", options: ["Only for drinking", "Gardening and cleaning", "It cannot be used", "Only for swimming"], correctAnswer: 1 },
    { question: "What is a storage tank for rainwater called?", options: ["Pond", "Cistern", "River", "Ocean"], correctAnswer: 1 },
    { question: "Rainwater harvesting helps prevent what?", options: ["Good weather", "Flooding in cities", "Happy plants", "Clean water"], correctAnswer: 1 },
    { question: "Is rainwater naturally hard or soft?", options: ["Hard", "Soft", "Neither", "Both"], correctAnswer: 1 },
    { question: "How much water can a small roof collect during rain?", options: ["A few drops", "Hundreds of liters", "Nothing", "Only 1 liter"], correctAnswer: 1 }
  ],
  "Waste Management": [
    { question: "What is biodegradable waste?", options: ["Plastic", "Glass", "Food scraps and leaves", "Metal"], correctAnswer: 2 },
    { question: "What does the 'R' in Reduce, Reuse, Recycle stand for?", options: ["Run", "Read", "Reduce", "Rain"], correctAnswer: 2 },
    { question: "Where should batteries be disposed?", options: ["Regular trash", "Special e-waste collection", "In the garden", "In rivers"], correctAnswer: 1 },
    { question: "What is composting?", options: ["Throwing away food", "Turning waste into soil", "Burning garbage", "Washing clothes"], correctAnswer: 1 },
    { question: "Which bin should plastic bottles go in?", options: ["Wet waste", "Dry waste/Recyclables", "Compost", "Any bin"], correctAnswer: 1 },
    { question: "What animals help in vermicomposting?", options: ["Dogs", "Cats", "Earthworms", "Lions"], correctAnswer: 2 },
    { question: "How many R's are there in waste management?", options: ["1", "3", "5", "10"], correctAnswer: 2 },
    { question: "What is e-waste?", options: ["Electric waste", "Easy waste", "Empty waste", "Edible waste"], correctAnswer: 0 },
    { question: "What should we do with old clothes?", options: ["Throw away", "Donate or recycle", "Burn them", "Leave on street"], correctAnswer: 1 },
    { question: "Landfills can produce which harmful gas?", options: ["Oxygen", "Methane", "Nitrogen", "Helium"], correctAnswer: 1 }
  ]
};

const defaultQuestions: Question[] = [
  { question: "Why is protecting the environment important?", options: ["It's not important", "For healthy planet", "To create more pollution", "To waste resources"], correctAnswer: 1 },
  { question: "What can YOU do to help the environment?", options: ["Nothing", "Reduce, Reuse, Recycle", "Create more waste", "Ignore problems"], correctAnswer: 1 },
  { question: "Which is better for the environment?", options: ["Plastic bags", "Cloth bags", "More packaging", "Throwing litter"], correctAnswer: 1 },
  { question: "Trees help the environment by...", options: ["Creating pollution", "Providing oxygen", "Wasting water", "Nothing"], correctAnswer: 1 },
  { question: "What is an eco-friendly habit?", options: ["Wasting water", "Littering", "Turning off lights", "Using more plastic"], correctAnswer: 2 },
  { question: "Renewable energy comes from...", options: ["Coal", "Oil", "Sun and wind", "Garbage"], correctAnswer: 2 },
  { question: "Why should we save water?", options: ["Water is unlimited", "Water is precious and limited", "We shouldn't", "Water is free"], correctAnswer: 1 },
  { question: "What happens to litter in the ocean?", options: ["It disappears", "It harms marine life", "Fish eat it safely", "Nothing bad"], correctAnswer: 1 },
  { question: "Walking instead of driving helps reduce...", options: ["Health", "Air pollution", "Happiness", "Nothing"], correctAnswer: 1 },
  { question: "Being eco-friendly means...", options: ["Wasting resources", "Caring for Earth", "Ignoring nature", "Polluting more"], correctAnswer: 1 }
];

const TopicQuizModal = ({ isOpen, onClose, topic }: TopicQuizModalProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [quizComplete, setQuizComplete] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  const questions = topic ? (quizData[topic.title] || defaultQuestions) : defaultQuestions;

  const resetQuiz = useCallback(() => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(600);
    setQuizComplete(false);
    setAnsweredQuestions(new Array(questions.length).fill(false));
  }, [questions.length]);

  useEffect(() => {
    if (isOpen) {
      resetQuiz();
    }
  }, [isOpen, resetQuiz]);

  useEffect(() => {
    if (!isOpen || quizComplete || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setQuizComplete(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, quizComplete, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const ecoPoints = score * 10;

  if (!topic) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] bg-gradient-to-br from-card via-background to-card border-2 border-primary/30 rounded-3xl p-0 overflow-hidden">
        {/* Header */}
        <div className={`py-4 px-6 bg-gradient-to-r ${topic.color} flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <topic.icon className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">{topic.title} Quiz</h2>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <Timer className="w-5 h-5 text-white" />
            <span className={`font-bold ${timeLeft < 60 ? 'text-red-300 animate-pulse' : 'text-white'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="p-6">
          {!quizComplete ? (
            <>
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</span>
                  <span className="text-primary font-medium">Score: {score}/{questions.length}</span>
                </div>
                <Progress value={(currentQuestion / questions.length) * 100} className="h-3" />
              </div>

              {/* Question */}
              <Card className="p-6 mb-6 bg-gradient-to-br from-background to-muted/30 border-2 border-primary/20">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {questions[currentQuestion].question}
                </h3>
              </Card>

              {/* Options */}
              <div className="grid gap-3 mb-6">
                {questions[currentQuestion].options.map((option, index) => {
                  const isCorrect = index === questions[currentQuestion].correctAnswer;
                  const isSelected = index === selectedAnswer;
                  
                  let bgClass = "bg-card hover:bg-muted/50 border-border";
                  if (showResult) {
                    if (isCorrect) {
                      bgClass = "bg-green-100 border-green-500 dark:bg-green-900/30";
                    } else if (isSelected && !isCorrect) {
                      bgClass = "bg-red-100 border-red-500 dark:bg-red-900/30";
                    }
                  } else if (isSelected) {
                    bgClass = "bg-primary/20 border-primary";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={showResult}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-3 ${bgClass} ${!showResult && 'hover:scale-[1.02]'}`}
                    >
                      <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1 text-foreground">{option}</span>
                      {showResult && isCorrect && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                      {showResult && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-500" />}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              {showResult && (
                <Button
                  onClick={nextQuestion}
                  className="w-full rounded-xl bg-gradient-to-r from-primary to-eco-green py-6 text-lg"
                >
                  {currentQuestion < questions.length - 1 ? "Next Question ➡️" : "See Results 🎉"}
                </Button>
              )}
            </>
          ) : (
            /* Quiz Complete Screen */
            <div className="text-center py-8 space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-2">Quiz Complete! 🎉</h3>
                <p className="text-muted-foreground">Great effort on learning about {topic.title}!</p>
              </div>

              <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-6 inline-block">
                <div className="text-5xl font-bold text-primary mb-2">{score}/{questions.length}</div>
                <p className="text-muted-foreground">Questions Correct</p>
              </div>

              <div className="bg-gradient-to-r from-accent/20 to-secondary/20 rounded-2xl p-4">
                <p className="text-lg">
                  You earned <span className="font-bold text-primary text-2xl">+{ecoPoints}</span> Eco Points! 🌱
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 rounded-xl border-2"
                >
                  Close
                </Button>
                <Button
                  onClick={resetQuiz}
                  className="flex-1 rounded-xl bg-gradient-to-r from-secondary to-eco-blue gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retry Quiz
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TopicQuizModal;
