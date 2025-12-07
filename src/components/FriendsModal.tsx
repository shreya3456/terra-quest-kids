import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Users, Trophy, Sparkles, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Friend {
  id: string;
  name: string;
  avatar: string;
  ecoPoints: number;
  league: string;
  school?: string;
  class?: string;
}

interface FriendsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialFriends: Friend[] = [
  { id: "1", name: "Emma Green", avatar: "👧", ecoPoints: 1450, league: "Gold", school: "Green Valley School", class: "7-A" },
  { id: "2", name: "Liam Forest", avatar: "👦", ecoPoints: 980, league: "Silver", school: "Green Valley School", class: "7-B" },
  { id: "3", name: "Sophia Rivers", avatar: "👩", ecoPoints: 2100, league: "Platinum", school: "Eco Academy", class: "8-A" },
  { id: "4", name: "Noah Ocean", avatar: "🧑", ecoPoints: 750, league: "Bronze", school: "Green Valley School", class: "7-B" },
  { id: "5", name: "Ava Meadow", avatar: "👱‍♀️", ecoPoints: 1680, league: "Gold", school: "Nature School", class: "7-C" },
  { id: "6", name: "Oliver Earth", avatar: "👨", ecoPoints: 890, league: "Silver", school: "Green Valley School", class: "6-A" },
];

const initialSuggestions: Friend[] = [
  { id: "s1", name: "Mia Sunshine", avatar: "👩‍🦰", ecoPoints: 1200, league: "Gold", school: "Green Valley School", class: "7-B" },
  { id: "s2", name: "Ethan Leaf", avatar: "👨‍🦱", ecoPoints: 650, league: "Bronze", school: "Green Valley School", class: "7-A" },
  { id: "s3", name: "Chloe Bloom", avatar: "👩‍🦳", ecoPoints: 1890, league: "Platinum", school: "Eco Academy", class: "7-B" },
  { id: "s4", name: "Lucas Wind", avatar: "🧔", ecoPoints: 420, league: "Bronze", school: "Green Valley School", class: "7-B" },
  { id: "s5", name: "Lily Rain", avatar: "👧", ecoPoints: 1100, league: "Silver", school: "Nature School", class: "7-C" },
];

const getLeagueColor = (league: string) => {
  switch (league.toLowerCase()) {
    case "platinum": return "from-purple-400 to-purple-600";
    case "gold": return "from-yellow-400 to-amber-500";
    case "silver": return "from-gray-300 to-gray-500";
    case "bronze": return "from-orange-400 to-orange-600";
    default: return "from-green-400 to-green-600";
  }
};

const getLeagueBadgeClass = (league: string) => {
  switch (league.toLowerCase()) {
    case "platinum": return "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300";
    case "gold": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300";
    case "silver": return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    case "bronze": return "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300";
    default: return "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300";
  }
};

const FriendsModal = ({ isOpen, onClose }: FriendsModalProps) => {
  const [friends, setFriends] = useState<Friend[]>(initialFriends);
  const [suggestions, setSuggestions] = useState<Friend[]>(initialSuggestions);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const handleAddFriend = (friend: Friend) => {
    setFriends(prev => [...prev, friend]);
    setSuggestions(prev => prev.filter(s => s.id !== friend.id));
    setAddedIds(prev => new Set([...prev, friend.id]));
    
    toast({
      title: "Friend Added! 🎉",
      description: `${friend.name} is now your eco-buddy!`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] bg-gradient-to-br from-card via-background to-card border-2 border-primary/30 rounded-3xl p-0 overflow-hidden">
        {/* Header */}
        <div className="py-5 px-6 bg-gradient-to-r from-secondary to-eco-blue relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImRvdHMiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4zIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2RvdHMpIi8+PC9zdmc+')] opacity-50"></div>
          <div className="relative flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Your Eco Friends</h2>
              <p className="text-white/80 text-sm">{friends.length} friends on your eco-journey! 🌱</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <ScrollArea className="h-[500px] pr-4">
            {/* Friends List */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-4">
                <span className="text-xl">👥</span> Your Friends ({friends.length})
              </h3>
              <div className="grid gap-3">
                {friends.map((friend, index) => (
                  <Card
                    key={friend.id}
                    className="p-4 border-2 border-border hover:border-primary/30 transition-all duration-300 hover:shadow-md animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${getLeagueColor(friend.league)} flex items-center justify-center text-2xl shadow-md`}>
                        {friend.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{friend.name}</h4>
                        <p className="text-sm text-muted-foreground">{friend.school} • {friend.class}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center gap-1 justify-end">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <span className="font-bold text-primary">{friend.ecoPoints.toLocaleString()}</span>
                        </div>
                        <Badge className={`${getLeagueBadgeClass(friend.league)}`}>
                          <Trophy className="w-3 h-3 mr-1" />
                          {friend.league}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Friend Suggestions */}
            {suggestions.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-4">
                  <span className="text-xl">✨</span> Suggested Friends
                  <span className="text-sm font-normal text-muted-foreground">(Same school or class)</span>
                </h3>
                <div className="grid gap-3">
                  {suggestions.map((suggestion, index) => (
                    <Card
                      key={suggestion.id}
                      className="p-4 border-2 border-dashed border-accent/50 bg-accent/5 hover:border-accent transition-all duration-300 hover:shadow-md animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${getLeagueColor(suggestion.league)} flex items-center justify-center text-2xl shadow-md`}>
                          {suggestion.avatar}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{suggestion.name}</h4>
                          <p className="text-sm text-muted-foreground">{suggestion.school} • {suggestion.class}</p>
                        </div>
                        <div className="text-right space-y-2">
                          <div className="flex items-center gap-1 justify-end">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="font-bold text-primary">{suggestion.ecoPoints.toLocaleString()}</span>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleAddFriend(suggestion)}
                            disabled={addedIds.has(suggestion.id)}
                            className="rounded-full bg-gradient-to-r from-primary to-eco-green hover:shadow-md gap-1"
                          >
                            {addedIds.has(suggestion.id) ? (
                              <>
                                <Check className="w-4 h-4" />
                                Added
                              </>
                            ) : (
                              <>
                                <UserPlus className="w-4 h-4" />
                                Add Friend
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>

          {/* Close Button */}
          <div className="mt-6 pt-4 border-t border-border">
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full rounded-xl border-2"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FriendsModal;
