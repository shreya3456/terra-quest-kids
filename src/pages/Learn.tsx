import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cloud, Droplets, Sprout, CloudRain, Trash2, LucideIcon } from "lucide-react";
import TopicModal from "@/components/TopicModal";
import TopicQuizModal from "@/components/TopicQuizModal";

interface Topic {
  title: string;
  icon: LucideIcon;
  color: string;
  description: string;
}

const Learn = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  const topics: Topic[] = [
    { title: "Air Pollution", icon: Cloud, color: "from-secondary to-eco-blue", description: "Learn about air quality, causes, and how to keep our air clean!" },
    { title: "Water Pollution", icon: Droplets, color: "from-eco-ocean to-secondary", description: "Discover how to protect our precious water resources." },
    { title: "Sustainable Development", icon: Sprout, color: "from-primary to-eco-leaf", description: "Explore ways to grow without harming our planet." },
    { title: "Rainwater Harvesting", icon: CloudRain, color: "from-eco-blue to-primary", description: "Save water for a brighter tomorrow!" },
    { title: "Waste Management", icon: Trash2, color: "from-accent to-eco-green", description: "Turn trash into treasure with smart waste handling." },
  ];

  const handleLearnClick = (topic: Topic) => {
    setSelectedTopic(topic);
    setIsTopicModalOpen(true);
  };

  const handleQuizClick = (topic: Topic) => {
    setSelectedTopic(topic);
    setIsQuizModalOpen(true);
  };

  const handleStartQuizFromModal = () => {
    setIsTopicModalOpen(false);
    setIsQuizModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-bounce-in">
      <div className="text-center space-y-2">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Learning Hub</h2>
        <p className="text-muted-foreground text-lg">Explore environmental topics and become an eco-hero! 📚</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => (
          <Card key={topic.title} className="overflow-hidden border-2 border-border hover:border-primary/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group" style={{ animationDelay: `${index * 100}ms` }}>
            <div className={`h-40 bg-gradient-to-br ${topic.color} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImRvdHMiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4zIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2RvdHMpIi8+PC9zdmc+')] opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <topic.icon className="w-12 h-12 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>
            <CardContent className="p-6 space-y-3">
              <h3 className="text-2xl font-bold text-foreground">{topic.title}</h3>
              <p className="text-muted-foreground">{topic.description}</p>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex gap-3">
              <Button onClick={() => handleLearnClick(topic)} className="flex-1 rounded-xl bg-gradient-to-r from-primary to-eco-green hover:shadow-lg transition-all duration-300">📖 Learn</Button>
              <Button onClick={() => handleQuizClick(topic)} variant="outline" className="flex-1 rounded-xl border-2 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300">🎯 Quiz</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <TopicModal isOpen={isTopicModalOpen} onClose={() => setIsTopicModalOpen(false)} topic={selectedTopic} onStartQuiz={handleStartQuizFromModal} />
      <TopicQuizModal isOpen={isQuizModalOpen} onClose={() => setIsQuizModalOpen(false)} topic={selectedTopic} />
    </div>
  );
};

export default Learn;
