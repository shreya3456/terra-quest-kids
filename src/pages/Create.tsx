import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  ShoppingBag,
  Zap,
  Book,
  TreePine,
  Waves,
  Bike,
  Pencil,
  Ban,
} from "lucide-react";

const Create = () => {
  const activities = [
    {
      title: "Say No to Pesticides",
      description: "Launch a campaign against harmful pesticides in your community.",
      icon: Ban,
      points: 150,
      color: "from-destructive to-red-600",
    },
    {
      title: "Jute/Paper Bag Making",
      description: "Create eco-friendly bags and reduce plastic usage!",
      icon: ShoppingBag,
      points: 100,
      color: "from-accent to-eco-yellow",
    },
    {
      title: "Reduce Electricity Bill",
      description: "Save energy and cut your electricity bill by 20%!",
      icon: Zap,
      points: 200,
      color: "from-secondary to-eco-blue",
    },
    {
      title: "Use Recycled Books",
      description: "Exchange and reuse books to save trees.",
      icon: Book,
      points: 80,
      color: "from-eco-leaf to-primary",
    },
    {
      title: "Tree Plantation Drive",
      description: "Plant trees and watch your forest grow!",
      icon: TreePine,
      points: 250,
      color: "from-primary to-eco-green",
    },
    {
      title: "Clean a River Campaign",
      description: "Organize a cleanup drive for local water bodies.",
      icon: Waves,
      points: 180,
      color: "from-eco-ocean to-secondary",
    },
    {
      title: "Promote Eco-Vehicles",
      description: "Encourage cycling and electric vehicles in your area.",
      icon: Bike,
      points: 120,
      color: "from-eco-blue to-primary",
    },
    {
      title: "Eco Essay Competition",
      description: "Write about environmental issues and inspire others!",
      icon: Pencil,
      points: 90,
      color: "from-accent to-eco-yellow",
    },
    {
      title: "Mission No Plastic",
      description: "Start a plastic-free challenge in your school.",
      icon: Leaf,
      points: 300,
      color: "from-primary to-eco-leaf",
    },
  ];

  return (
    <div className="space-y-8 animate-bounce-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Create Impact
        </h2>
        <p className="text-muted-foreground text-lg">Take action and make a real difference! 🌱</p>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity, index) => (
          <Card
            key={activity.title}
            className="overflow-hidden border-2 border-border hover:border-primary/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={`h-32 bg-gradient-to-br ${activity.color} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9InN0YXJzIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxjaXJjbGUgY3g9IjE1IiBjeT0iMTUiIHI9IjEuNSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC40Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3N0YXJzKSIvPjwvc3ZnPg==')] opacity-50"></div>
              <div className="absolute top-4 right-4">
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 text-sm px-3 py-1">
                  +{activity.points} pts
                </Badge>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <activity.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>
            <CardContent className="p-5 space-y-3">
              <h3 className="text-xl font-bold text-foreground line-clamp-2">{activity.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{activity.description}</p>
            </CardContent>
            <CardFooter className="p-5 pt-0 flex gap-2">
              <Button className="flex-1 rounded-xl bg-gradient-to-r from-primary to-eco-green hover:shadow-lg transition-all duration-300">
                🚀 Start Quest
              </Button>
              <Button
                variant="outline"
                className="rounded-xl border-2 hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all duration-300 px-4"
              >
                📷
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Motivation Banner */}
      <Card className="border-2 border-primary/20 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-primary via-secondary to-accent p-8 text-center relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9Indhdml5IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0wIDIwIFEgMTAgMTAgMjAgMjAgVCAzMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3dhdml5KSIvPjwvc3ZnPg==')] opacity-30"></div>
          <div className="relative space-y-4">
            <div className="text-6xl">🌟</div>
            <h3 className="text-3xl font-bold text-white">You're Making a Difference!</h3>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Every action counts! Complete eco-quests, upload proof, and earn points to climb the leaderboard.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Create;
