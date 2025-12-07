import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Trash2, Search, Users, MapPin } from "lucide-react";

interface GameSelectionPanelProps {
  mode: "single" | "multi";
  onClose: () => void;
  onSelectGame: (game: string) => void;
}

const singlePlayerGames = [
  {
    id: "waste-sorting",
    title: "Waste Sorting Game",
    description: "Drag waste items to the correct recycling bins!",
    emoji: "🗑️",
    icon: Trash2,
    color: "from-green-400 to-emerald-600",
    points: "Earn up to 100 pts",
  },
  {
    id: "word-search",
    title: "Eco Word Search",
    description: "Find hidden eco-friendly words in the puzzle!",
    emoji: "🔍",
    icon: Search,
    color: "from-blue-400 to-indigo-600",
    points: "Earn up to 120 pts",
  },
];

const multiPlayerGames = [
  {
    id: "eco-quiz",
    title: "Live Eco Quiz",
    description: "Compete with friends in real-time eco quizzes!",
    emoji: "🎯",
    icon: Users,
    color: "from-purple-400 to-pink-600",
    points: "Compete for top spot!",
  },
  {
    id: "treasure-hunt",
    title: "Eco Treasure Hunt",
    description: "Solve riddles and find the eco treasure!",
    emoji: "🗺️",
    icon: MapPin,
    color: "from-amber-400 to-orange-600",
    points: "Earn up to 100 pts",
  },
];

const GameSelectionPanel = ({ mode, onClose, onSelectGame }: GameSelectionPanelProps) => {
  const games = mode === "single" ? singlePlayerGames : multiPlayerGames;
  const title = mode === "single" ? "Single Player Games" : "Multiplayer Games";
  const subtitle = mode === "single" 
    ? "Challenge yourself with solo eco adventures!" 
    : "Team up or compete with friends!";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-gradient-to-br from-background to-primary/5 border-2 border-primary/30 p-6 animate-bounce-in">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {title}
            </h2>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Game Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {games.map((game) => (
            <Card
              key={game.id}
              onClick={() => onSelectGame(game.id)}
              className="overflow-hidden cursor-pointer group hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-primary/50"
            >
              <div className={`h-32 bg-gradient-to-br ${game.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-125 transition-transform duration-300">
                    {game.emoji}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <game.icon className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-foreground">{game.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{game.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                    {game.points}
                  </span>
                  <Button size="sm" className="bg-gradient-to-r from-primary to-secondary rounded-full">
                    Play Now 🎮
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center text-muted-foreground mt-6 text-sm">
          🌱 Complete games to earn eco points and unlock achievements!
        </p>
      </Card>
    </div>
  );
};

export default GameSelectionPanel;
