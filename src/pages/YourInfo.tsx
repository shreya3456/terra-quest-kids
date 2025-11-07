import { Users, Award, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const YourInfo = () => {
  const studentInfo = {
    name: "Alex Green",
    class: "Class 7-B",
    school: "Green Valley School",
  };

  const stats = [
    { label: "Friends", value: "24", icon: Users, color: "from-secondary to-eco-blue" },
    { label: "Eco Points", value: "1,250", icon: Award, color: "from-accent to-eco-yellow" },
    { label: "League Level", value: "Silver", icon: Trophy, color: "from-primary to-eco-green" },
  ];

  return (
    <div className="space-y-8 animate-bounce-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Your Profile
        </h2>
        <p className="text-muted-foreground text-lg">Track your eco-journey here! 🌱</p>
      </div>

      {/* Student Info Card */}
      <Card className="overflow-hidden border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="h-32 bg-gradient-to-r from-primary via-secondary to-accent relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        </div>
        <CardContent className="pt-0">
          <div className="flex flex-col items-center -mt-16 space-y-4">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-6xl border-4 border-card shadow-xl">
              🧑‍🎓
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-foreground">{studentInfo.name}</h3>
              <p className="text-lg text-muted-foreground">{studentInfo.class}</p>
              <p className="text-md text-muted-foreground">{studentInfo.school}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={stat.label}
            className="overflow-hidden border-2 border-border hover:border-primary/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Section */}
      <Card className="border-2 border-border shadow-lg">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold text-foreground">Next Level: Gold League</h4>
                <p className="text-sm text-muted-foreground">Keep going! You're doing amazing! 🎯</p>
              </div>
              <span className="text-2xl">🏆</span>
            </div>
            <div className="relative h-6 bg-muted rounded-full overflow-hidden">
              <div
                className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full transition-all duration-1000 ease-out"
                style={{ width: "65%" }}
              >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9InN0cmlwZXMiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjIwIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjc3RyaXBlcykiLz48L3N2Zz4=')] animate-[slide_1s_linear_infinite]"></div>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">1,250 Points</span>
              <span className="font-semibold text-primary">2,000 Points (Gold)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default YourInfo;
