import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Trophy, TreePine, Droplets, Recycle, Leaf, X, Ban, Trash2, Sun } from "lucide-react";

interface Activity {
  id: number;
  name: string;
  date: string;
  points: number;
  status: "Completed" | "Pending Verification";
  icon: React.ReactNode;
}

interface EcoPointsModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalPoints: number;
}

const activities: Activity[] = [
  { id: 1, name: "Tree Plantation", date: "Nov 15, 2024", points: 20, status: "Completed", icon: <TreePine className="w-5 h-5" /> },
  { id: 2, name: "No Plastic Challenge", date: "Nov 10, 2024", points: 15, status: "Completed", icon: <Ban className="w-5 h-5" /> },
  { id: 3, name: "Park Cleanup Drive", date: "Nov 5, 2024", points: 25, status: "Completed", icon: <Trash2 className="w-5 h-5" /> },
  { id: 4, name: "River Cleanup", date: "Oct 28, 2024", points: 30, status: "Completed", icon: <Droplets className="w-5 h-5" /> },
  { id: 5, name: "Recycling Mission", date: "Oct 20, 2024", points: 18, status: "Completed", icon: <Recycle className="w-5 h-5" /> },
  { id: 6, name: "Solar Awareness", date: "Oct 15, 2024", points: 12, status: "Pending Verification", icon: <Sun className="w-5 h-5" /> },
  { id: 7, name: "Jute Bag Making", date: "Oct 10, 2024", points: 22, status: "Completed", icon: <Leaf className="w-5 h-5" /> },
];

const leagues = [
  { name: "Rookie", minPoints: 0, color: "bg-slate-400" },
  { name: "Pro", minPoints: 500, color: "bg-blue-500" },
  { name: "Expert", minPoints: 1000, color: "bg-purple-500" },
  { name: "Eco Master", minPoints: 2000, color: "bg-gradient-to-r from-yellow-400 to-amber-500" },
];

const EcoPointsModal = ({ isOpen, onClose, totalPoints }: EcoPointsModalProps) => {
  const [visibleActivities, setVisibleActivities] = useState(activities);

  // Calculate current and next league
  const getCurrentLeague = () => {
    for (let i = leagues.length - 1; i >= 0; i--) {
      if (totalPoints >= leagues[i].minPoints) {
        return { current: leagues[i], next: leagues[i + 1] || null, index: i };
      }
    }
    return { current: leagues[0], next: leagues[1], index: 0 };
  };

  const { current, next } = getCurrentLeague();
  const progressToNext = next 
    ? ((totalPoints - current.minPoints) / (next.minPoints - current.minPoints)) * 100 
    : 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md md:max-w-lg bg-gradient-to-br from-card via-card to-primary/5 border-2 border-primary/20 rounded-3xl p-0 overflow-hidden">
        {/* Header with decorative elements */}
        <div className="relative bg-gradient-to-r from-primary via-secondary to-accent p-6 pb-8">
          <div className="absolute inset-0 opacity-20">
            {[...Array(8)].map((_, i) => (
              <Sparkles
                key={i}
                className="absolute text-white animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`,
                  width: 12 + Math.random() * 8,
                }}
              />
            ))}
          </div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <DialogHeader className="relative z-10">
            <DialogTitle className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              Your Eco Points 🌱
            </DialogTitle>
          </DialogHeader>

          {/* Total Points Badge */}
          <div className="mt-4 flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 flex items-center gap-3">
              <Trophy className="w-8 h-8 text-eco-yellow" />
              <div>
                <p className="text-white/80 text-sm font-medium">Total Points</p>
                <p className="text-3xl font-bold text-white">{totalPoints.toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <p className="text-white/80 text-xs">Current League</p>
              <p className="text-lg font-bold text-white">{current.name}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Progress to Next League */}
          {next && (
            <div className="bg-muted/50 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Progress to {next.name}
                </span>
                <span className="text-sm font-bold text-primary">
                  {totalPoints} / {next.minPoints}
                </span>
              </div>
              <div className="relative">
                <Progress value={progressToNext} className="h-4 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground drop-shadow">
                    {Math.round(progressToNext)}%
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                {leagues.map((league, i) => (
                  <div key={league.name} className="flex flex-col items-center">
                    <span className={`w-3 h-3 rounded-full ${league.color} ${totalPoints >= league.minPoints ? 'ring-2 ring-offset-1 ring-primary' : ''}`} />
                    <span className="mt-1">{league.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activities List */}
          <div>
            <h4 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              Points Breakdown
            </h4>
            <ScrollArea className="h-[240px] pr-4">
              <div className="space-y-3">
                {visibleActivities.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="bg-card border border-border/50 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md hover:border-primary/30 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      activity.status === "Completed" 
                        ? "bg-gradient-to-br from-primary to-eco-green text-white" 
                        : "bg-gradient-to-br from-eco-yellow to-accent text-foreground"
                    }`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">{activity.name}</p>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge 
                        className={`${
                          activity.status === "Completed"
                            ? "bg-primary/10 text-primary border-primary/20"
                            : "bg-eco-yellow/20 text-amber-700 border-eco-yellow/30"
                        } font-bold text-sm px-3 py-1`}
                      >
                        +{activity.points}
                      </Badge>
                      <span className={`text-xs ${
                        activity.status === "Completed" ? "text-primary" : "text-amber-600"
                      }`}>
                        {activity.status === "Completed" ? "✓ Completed" : "⏳ Pending"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-primary to-eco-green hover:from-primary/90 hover:to-eco-green/90 text-white font-semibold rounded-xl py-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EcoPointsModal;
