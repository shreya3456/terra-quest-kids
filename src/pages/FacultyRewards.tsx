import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  ClipboardCheck, Eye, Award, MessageSquare, Check, X, 
  Gamepad2, Brain, Trash2, MapPin, Search
} from "lucide-react";
import { toast } from "sonner";

interface StudentActivity {
  id: number;
  studentName: string;
  studentAvatar: string;
  game: string;
  submissionDate: string;
  autoScore: number;
  maxScore: number;
  status: "Pending" | "Reviewed";
  answers?: { question: string; answer: string; correct: boolean }[];
}

const FacultyRewards = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActivity, setSelectedActivity] = useState<StudentActivity | null>(null);
  const [manualPoints, setManualPoints] = useState("");
  const [feedback, setFeedback] = useState("");

  const activities: StudentActivity[] = [
    {
      id: 1,
      studentName: "Arjun Singh",
      studentAvatar: "A",
      game: "Waste Sorting",
      submissionDate: "2024-01-15",
      autoScore: 85,
      maxScore: 100,
      status: "Pending",
      answers: [
        { question: "Plastic bottle sorting", answer: "Plastic bin", correct: true },
        { question: "Newspaper sorting", answer: "Paper bin", correct: true },
        { question: "Banana peel sorting", answer: "Plastic bin", correct: false },
      ],
    },
    {
      id: 2,
      studentName: "Priya Kaur",
      studentAvatar: "P",
      game: "Eco Quiz",
      submissionDate: "2024-01-15",
      autoScore: 90,
      maxScore: 100,
      status: "Pending",
      answers: [
        { question: "What is the main cause of air pollution?", answer: "Fossil fuels", correct: true },
        { question: "How can we conserve water?", answer: "Fix leaky taps", correct: true },
      ],
    },
    {
      id: 3,
      studentName: "Rahul Sharma",
      studentAvatar: "R",
      game: "Treasure Hunt",
      submissionDate: "2024-01-14",
      autoScore: 75,
      maxScore: 100,
      status: "Reviewed",
    },
    {
      id: 4,
      studentName: "Simran Gill",
      studentAvatar: "S",
      game: "Word Search",
      submissionDate: "2024-01-14",
      autoScore: 100,
      maxScore: 100,
      status: "Reviewed",
    },
    {
      id: 5,
      studentName: "Harpreet Kaur",
      studentAvatar: "H",
      game: "Eco Quiz",
      submissionDate: "2024-01-13",
      autoScore: 60,
      maxScore: 100,
      status: "Pending",
    },
  ];

  const filteredActivities = activities.filter(
    (activity) =>
      activity.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.game.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getGameIcon = (game: string) => {
    switch (game) {
      case "Waste Sorting": return <Trash2 className="w-4 h-4" />;
      case "Eco Quiz": return <Brain className="w-4 h-4" />;
      case "Word Search": return <Gamepad2 className="w-4 h-4" />;
      case "Treasure Hunt": return <MapPin className="w-4 h-4" />;
      default: return <Gamepad2 className="w-4 h-4" />;
    }
  };

  const handleReview = (activity: StudentActivity) => {
    setSelectedActivity(activity);
    setManualPoints(activity.autoScore.toString());
    setFeedback("");
  };

  const handleAwardFullPoints = () => {
    if (!selectedActivity) return;
    toast.success(`Full points (${selectedActivity.maxScore}) awarded to ${selectedActivity.studentName}! 🎉`);
    setSelectedActivity(null);
  };

  const handleAwardPartialPoints = () => {
    if (!selectedActivity || !manualPoints) return;
    toast.success(`${manualPoints} points awarded to ${selectedActivity.studentName}! ⭐`);
    setSelectedActivity(null);
  };

  const handleReject = () => {
    if (!selectedActivity) return;
    toast.error(`Submission rejected for ${selectedActivity.studentName}`);
    setSelectedActivity(null);
  };

  return (
    <div className="space-y-6 animate-bounce-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-eco-yellow to-accent flex items-center justify-center">
          <Award className="w-6 h-6 text-accent-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Check & Reward</h1>
          <p className="text-muted-foreground">Review student activities and award eco-points</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-eco-yellow/10 to-accent/10 border-eco-yellow/30">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-eco-yellow/20 flex items-center justify-center">
              <ClipboardCheck className="w-6 h-6 text-eco-yellow" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {activities.filter(a => a.status === "Pending").length}
              </p>
              <p className="text-sm text-muted-foreground">Pending Reviews</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-eco-green/10 to-eco-leaf/10 border-eco-green/30">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-eco-green/20 flex items-center justify-center">
              <Check className="w-6 h-6 text-eco-green" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {activities.filter(a => a.status === "Reviewed").length}
              </p>
              <p className="text-sm text-muted-foreground">Completed Reviews</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-eco-blue/10 to-eco-ocean/10 border-eco-blue/30">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-eco-blue/20 flex items-center justify-center">
              <Award className="w-6 h-6 text-eco-blue" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">2,450</p>
              <p className="text-sm text-muted-foreground">Points Awarded Today</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Table */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <Gamepad2 className="w-6 h-6 text-eco-green" />
              Student Activities
            </CardTitle>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by student or game..."
                className="pl-10 border-eco-green/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Student</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Game/Quiz</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Score</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredActivities.map((activity) => (
                  <tr 
                    key={activity.id} 
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-eco-green to-eco-leaf flex items-center justify-center text-primary-foreground font-medium">
                          {activity.studentAvatar}
                        </div>
                        <span className="font-medium">{activity.studentName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-eco-blue/20 flex items-center justify-center text-eco-blue">
                          {getGameIcon(activity.game)}
                        </div>
                        <span>{activity.game}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{activity.submissionDate}</td>
                    <td className="py-3 px-4">
                      <span className={`font-semibold ${
                        activity.autoScore >= 80 
                          ? "text-eco-green" 
                          : activity.autoScore >= 60 
                            ? "text-eco-yellow" 
                            : "text-destructive"
                      }`}>
                        {activity.autoScore}/{activity.maxScore}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        className={activity.status === "Pending" 
                          ? "bg-eco-yellow/20 text-eco-yellow border-eco-yellow/30" 
                          : "bg-eco-green/20 text-eco-green border-eco-green/30"
                        }
                      >
                        {activity.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button 
                        size="sm" 
                        onClick={() => handleReview(activity)}
                        className={activity.status === "Pending" 
                          ? "bg-eco-blue hover:bg-eco-blue/90" 
                          : "bg-muted text-muted-foreground"
                        }
                        disabled={activity.status === "Reviewed"}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        {activity.status === "Pending" ? "Review" : "Reviewed"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Review Modal */}
      <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <ClipboardCheck className="w-6 h-6 text-eco-blue" />
              Review: {selectedActivity?.studentName}'s {selectedActivity?.game}
            </DialogTitle>
          </DialogHeader>

          {selectedActivity && (
            <div className="space-y-6">
              {/* Student Info */}
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-eco-green to-eco-leaf flex items-center justify-center text-2xl text-primary-foreground font-bold">
                  {selectedActivity.studentAvatar}
                </div>
                <div>
                  <p className="font-bold text-lg">{selectedActivity.studentName}</p>
                  <p className="text-muted-foreground">
                    {selectedActivity.game} • {selectedActivity.submissionDate}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-3xl font-bold text-eco-green">
                    {selectedActivity.autoScore}
                    <span className="text-lg text-muted-foreground">/{selectedActivity.maxScore}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">Auto Score</p>
                </div>
              </div>

              {/* Answers (if available) */}
              {selectedActivity.answers && (
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Student Answers</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedActivity.answers.map((ans, index) => (
                      <div 
                        key={index}
                        className={`p-3 rounded-lg flex items-center justify-between ${
                          ans.correct ? "bg-eco-green/10" : "bg-destructive/10"
                        }`}
                      >
                        <div>
                          <p className="text-sm text-muted-foreground">{ans.question}</p>
                          <p className="font-medium">{ans.answer}</p>
                        </div>
                        {ans.correct ? (
                          <Check className="w-5 h-5 text-eco-green" />
                        ) : (
                          <X className="w-5 h-5 text-destructive" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Manual Points */}
              <div className="space-y-2">
                <Label>Manual Points Entry</Label>
                <Input
                  type="number"
                  value={manualPoints}
                  onChange={(e) => setManualPoints(e.target.value)}
                  placeholder="Enter points to award"
                  className="border-eco-green/30"
                  max={selectedActivity.maxScore}
                  min={0}
                />
              </div>

              {/* Feedback */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Feedback Comment (Optional)
                </Label>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Add a comment for the student..."
                  className="border-eco-blue/30"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={handleAwardFullPoints}
                  className="flex-1 bg-eco-green hover:bg-eco-green/90"
                >
                  <Award className="w-4 h-4 mr-2" />
                  Award Full Points ({selectedActivity.maxScore})
                </Button>
                <Button 
                  onClick={handleAwardPartialPoints}
                  variant="outline"
                  className="flex-1 border-eco-blue/30 text-eco-blue hover:bg-eco-blue/10"
                >
                  <Award className="w-4 h-4 mr-2" />
                  Award {manualPoints} Points
                </Button>
                <Button 
                  onClick={handleReject}
                  variant="outline"
                  className="border-destructive/30 text-destructive hover:bg-destructive/10"
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FacultyRewards;
