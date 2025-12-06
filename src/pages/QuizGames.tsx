import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Users, Map } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuizGames = () => {
  const navigate = useNavigate();
  
  const gameModesData = [
    {
      title: "Single Player",
      icon: User,
      color: "from-primary to-eco-green",
      description: "Challenge yourself with solo quizzes and puzzles!",
      emoji: "🎲",
      action: () => {},
    },
    {
      title: "Multiplayer",
      icon: Users,
      color: "from-secondary to-eco-blue",
      description: "Compete with friends in exciting group challenges!",
      emoji: "🧩",
      action: () => {},
    },
    {
      title: "MapRo - Punjab",
      icon: Map,
      color: "from-accent to-eco-yellow",
      description: "Explore Punjab's map and discover environmental hotspots!",
      emoji: "🗺️",
      action: () => navigate("/mapro"),
    },
  ];

  return (
    <div className="space-y-8 animate-bounce-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Quiz & Games
        </h2>
        <p className="text-muted-foreground text-lg">Test your knowledge and have fun! 🎮</p>
      </div>

      {/* Game Modes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gameModesData.map((mode, index) => (
          <Card
            key={mode.title}
            className="overflow-hidden border-2 border-border hover:border-primary/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`h-48 bg-gradient-to-br ${mode.color} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImhleGFnb25zIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0zMCAwTDUyIDE1TDUyIDQ1TDMwIDYwTDggNDVMOCAxNVoiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjIiIHN0cm9rZS13aWR0aD0iMiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNoZXhhZ29ucykiLz48L3N2Zz4=')] opacity-30"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <mode.icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-6xl group-hover:animate-bounce">{mode.emoji}</span>
              </div>
            </div>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-2xl font-bold text-foreground">{mode.title}</h3>
              <p className="text-muted-foreground">{mode.description}</p>
              <Button 
                onClick={mode.action}
                className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300 text-lg py-6"
              >
                Start Playing! 🚀
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Fun Stats Section */}
      <Card className="border-2 border-primary/20 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-primary">42</div>
              <div className="text-muted-foreground">Quizzes Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary">89%</div>
              <div className="text-muted-foreground">Average Score</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent">12</div>
              <div className="text-muted-foreground">Badges Earned</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QuizGames;
