import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Trash2, PuzzleIcon, Brain, MapPin, Plus, Save, Eye, Upload,
  Recycle, FileText, Apple
} from "lucide-react";
import { toast } from "sonner";

interface WasteItem {
  id: number;
  name: string;
  correctBin: string;
  explanation: string;
}

interface WordItem {
  id: number;
  word: string;
  meaning: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface TreasureClue {
  id: number;
  clueText: string;
  location: string;
  fact: string;
  answer: string;
}

const FacultyGames = () => {
  const [activeTab, setActiveTab] = useState("waste-sorting");
  
  // Waste Sorting State
  const [wasteItems, setWasteItems] = useState<WasteItem[]>([
    { id: 1, name: "Plastic Bottle", correctBin: "plastic", explanation: "Plastic bottles can be recycled into new products!" },
    { id: 2, name: "Newspaper", correctBin: "paper", explanation: "Paper can be recycled up to 7 times!" },
  ]);
  const [newWasteItem, setNewWasteItem] = useState({ name: "", correctBin: "", explanation: "" });

  // Word Search State
  const [words, setWords] = useState<WordItem[]>([
    { id: 1, word: "RECYCLE", meaning: "To convert waste into reusable material" },
    { id: 2, word: "COMPOST", meaning: "Decayed organic matter used as fertilizer" },
  ]);
  const [newWord, setNewWord] = useState({ word: "", meaning: "" });

  // Quiz State
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  });
  const [roomCode, setRoomCode] = useState("");

  // Treasure Hunt State
  const [clues, setClues] = useState<TreasureClue[]>([]);
  const [newClue, setNewClue] = useState({ clueText: "", location: "", fact: "", answer: "" });

  const handleAddWasteItem = () => {
    if (!newWasteItem.name || !newWasteItem.correctBin) {
      toast.error("Please fill all required fields");
      return;
    }
    setWasteItems([...wasteItems, { ...newWasteItem, id: Date.now() }]);
    setNewWasteItem({ name: "", correctBin: "", explanation: "" });
    toast.success("Waste item added successfully! 🌿");
  };

  const handleAddWord = () => {
    if (!newWord.word || !newWord.meaning) {
      toast.error("Please fill all fields");
      return;
    }
    setWords([...words, { ...newWord, id: Date.now(), word: newWord.word.toUpperCase() }]);
    setNewWord({ word: "", meaning: "" });
    toast.success("Word added successfully! 📚");
  };

  const handleAddQuestion = () => {
    if (!newQuestion.question || newQuestion.options.some(o => !o)) {
      toast.error("Please fill all question fields");
      return;
    }
    setQuestions([...questions, { ...newQuestion, id: Date.now() }]);
    setNewQuestion({ question: "", options: ["", "", "", ""], correctAnswer: 0 });
    toast.success("Question added! 🎯");
  };

  const handleGenerateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);
    toast.success(`Room code generated: ${code}`);
  };

  const handleAddClue = () => {
    if (!newClue.clueText || !newClue.answer) {
      toast.error("Please fill required fields");
      return;
    }
    setClues([...clues, { ...newClue, id: Date.now() }]);
    setNewClue({ clueText: "", location: "", fact: "", answer: "" });
    toast.success("Clue added! 🗺️");
  };

  const getBinIcon = (bin: string) => {
    switch (bin) {
      case "plastic": return <Recycle className="w-4 h-4 text-eco-blue" />;
      case "paper": return <FileText className="w-4 h-4 text-eco-yellow" />;
      case "food": return <Apple className="w-4 h-4 text-eco-green" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-bounce-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-eco-green to-eco-leaf flex items-center justify-center">
          <Trash2 className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Games & Quizzes Management</h1>
          <p className="text-muted-foreground">Add and modify game content for students</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 gap-2 bg-muted/50 p-1 h-auto">
          <TabsTrigger 
            value="waste-sorting" 
            className="data-[state=active]:bg-eco-green data-[state=active]:text-primary-foreground py-3"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Waste Sorting
          </TabsTrigger>
          <TabsTrigger 
            value="word-search"
            className="data-[state=active]:bg-eco-blue data-[state=active]:text-primary-foreground py-3"
          >
            <PuzzleIcon className="w-4 h-4 mr-2" />
            Word Search
          </TabsTrigger>
          <TabsTrigger 
            value="eco-quiz"
            className="data-[state=active]:bg-eco-yellow data-[state=active]:text-accent-foreground py-3"
          >
            <Brain className="w-4 h-4 mr-2" />
            Eco Quiz
          </TabsTrigger>
          <TabsTrigger 
            value="treasure-hunt"
            className="data-[state=active]:bg-eco-ocean data-[state=active]:text-primary-foreground py-3"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Treasure Hunt
          </TabsTrigger>
        </TabsList>

        {/* Waste Sorting Tab */}
        <TabsContent value="waste-sorting" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Plus className="w-5 h-5 text-eco-green" />
                  Add New Waste Item
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Item Name *</Label>
                  <Input
                    placeholder="e.g., Plastic Bottle"
                    value={newWasteItem.name}
                    onChange={(e) => setNewWasteItem({ ...newWasteItem, name: e.target.value })}
                    className="border-eco-green/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Correct Bin *</Label>
                  <Select
                    value={newWasteItem.correctBin}
                    onValueChange={(value) => setNewWasteItem({ ...newWasteItem, correctBin: value })}
                  >
                    <SelectTrigger className="border-eco-green/30">
                      <SelectValue placeholder="Select bin type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plastic">🔵 Plastic</SelectItem>
                      <SelectItem value="paper">📄 Paper</SelectItem>
                      <SelectItem value="food">🍎 Food Waste</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Explanation for Students</Label>
                  <Textarea
                    placeholder="Why does this item go in this bin?"
                    value={newWasteItem.explanation}
                    onChange={(e) => setNewWasteItem({ ...newWasteItem, explanation: e.target.value })}
                    className="border-eco-green/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Upload Icon/Image (Optional)</Label>
                  <div className="border-2 border-dashed border-eco-green/30 rounded-xl p-4 text-center cursor-pointer hover:bg-eco-green/5 transition-colors">
                    <Upload className="w-8 h-8 text-eco-green/50 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload image</p>
                  </div>
                </div>
                <Button 
                  onClick={handleAddWasteItem}
                  className="w-full bg-eco-green hover:bg-eco-green/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="w-5 h-5 text-eco-blue" />
                  Current Items ({wasteItems.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {wasteItems.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {getBinIcon(item.correctBin)}
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{item.correctBin} bin</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Word Search Tab */}
        <TabsContent value="word-search" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Plus className="w-5 h-5 text-eco-blue" />
                  Add New Word
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Word *</Label>
                  <Input
                    placeholder="e.g., BIODIVERSITY"
                    value={newWord.word}
                    onChange={(e) => setNewWord({ ...newWord, word: e.target.value })}
                    className="border-eco-blue/30 uppercase"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Meaning *</Label>
                  <Textarea
                    placeholder="Define the word..."
                    value={newWord.meaning}
                    onChange={(e) => setNewWord({ ...newWord, meaning: e.target.value })}
                    className="border-eco-blue/30"
                  />
                </div>
                <Button 
                  onClick={handleAddWord}
                  className="w-full bg-eco-blue hover:bg-eco-blue/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Word
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-eco-blue/30 text-eco-blue"
                >
                  <PuzzleIcon className="w-4 h-4 mr-2" />
                  Generate Word Search Grid
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="w-5 h-5 text-eco-blue" />
                  Word List ({words.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {words.map((item) => (
                    <div 
                      key={item.id}
                      className="p-3 bg-eco-blue/10 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-bold text-eco-blue">{item.word}</p>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.meaning}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Eco Quiz Tab */}
        <TabsContent value="eco-quiz" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="w-5 h-5 text-eco-yellow" />
                  Create Live Quiz
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Quiz Title *</Label>
                  <Input
                    placeholder="e.g., Environmental Awareness Quiz"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    className="border-eco-yellow/30"
                  />
                </div>
                
                <div className="p-4 bg-eco-yellow/10 rounded-xl">
                  <Label className="block mb-3">Question</Label>
                  <Textarea
                    placeholder="Enter your question..."
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                    className="border-eco-yellow/30 mb-3"
                  />
                  <Label className="block mb-2">Options</Label>
                  {newQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={newQuestion.correctAnswer === index}
                        onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: index })}
                        className="accent-eco-green"
                      />
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...newQuestion.options];
                          newOptions[index] = e.target.value;
                          setNewQuestion({ ...newQuestion, options: newOptions });
                        }}
                        className="border-eco-yellow/30 flex-1"
                      />
                    </div>
                  ))}
                  <p className="text-xs text-muted-foreground mt-2">
                    Select the correct answer using the radio buttons
                  </p>
                </div>

                <Button 
                  onClick={handleAddQuestion}
                  className="w-full bg-eco-yellow text-accent-foreground hover:bg-eco-yellow/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Question
                </Button>

                <div className="flex gap-2">
                  <Button 
                    onClick={handleGenerateRoomCode}
                    variant="outline"
                    className="flex-1 border-eco-green/30 text-eco-green"
                  >
                    Generate Room Code
                  </Button>
                  {roomCode && (
                    <div className="px-4 py-2 bg-eco-green/10 rounded-lg font-mono font-bold text-eco-green">
                      {roomCode}
                    </div>
                  )}
                </div>

                <Button className="w-full bg-eco-green hover:bg-eco-green/90">
                  <Save className="w-4 h-4 mr-2" />
                  Save Quiz
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="w-5 h-5 text-eco-yellow" />
                  Questions Added ({questions.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {questions.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No questions added yet. Start creating your quiz!
                    </p>
                  ) : (
                    questions.map((q, index) => (
                      <div 
                        key={q.id}
                        className="p-3 bg-eco-yellow/10 rounded-xl"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-medium">Q{index + 1}: {q.question}</p>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-sm">
                          {q.options.map((opt, i) => (
                            <p 
                              key={i}
                              className={`px-2 py-1 rounded ${
                                i === q.correctAnswer 
                                  ? "bg-eco-green/20 text-eco-green font-medium" 
                                  : "text-muted-foreground"
                              }`}
                            >
                              {String.fromCharCode(65 + i)}. {opt}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Treasure Hunt Tab */}
        <TabsContent value="treasure-hunt" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-eco-ocean" />
                  Add New Clue
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Clue Text *</Label>
                  <Textarea
                    placeholder="Write your riddle or clue..."
                    value={newClue.clueText}
                    onChange={(e) => setNewClue({ ...newClue, clueText: e.target.value })}
                    className="border-eco-ocean/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    placeholder="e.g., School Garden"
                    value={newClue.location}
                    onChange={(e) => setNewClue({ ...newClue, location: e.target.value })}
                    className="border-eco-ocean/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Environmental Fact</Label>
                  <Textarea
                    placeholder="Share an eco fact students will learn..."
                    value={newClue.fact}
                    onChange={(e) => setNewClue({ ...newClue, fact: e.target.value })}
                    className="border-eco-ocean/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Answer to Unlock Next Clue *</Label>
                  <Input
                    placeholder="Correct answer"
                    value={newClue.answer}
                    onChange={(e) => setNewClue({ ...newClue, answer: e.target.value })}
                    className="border-eco-ocean/30"
                  />
                </div>
                <Button 
                  onClick={handleAddClue}
                  className="w-full bg-eco-ocean hover:bg-eco-ocean/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Clue
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="w-5 h-5 text-eco-ocean" />
                  Clue Pathway ({clues.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {clues.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No clues added yet. Create your treasure hunt!
                    </p>
                  ) : (
                    clues.map((clue, index) => (
                      <div 
                        key={clue.id}
                        className="p-3 bg-eco-ocean/10 rounded-xl relative"
                      >
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-eco-ocean text-primary-foreground flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="ml-6">
                          <div className="flex items-start justify-between">
                            <p className="font-medium text-eco-ocean">{clue.clueText}</p>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          {clue.location && (
                            <p className="text-xs text-muted-foreground mt-1">📍 {clue.location}</p>
                          )}
                          <p className="text-sm text-eco-green mt-2">Answer: {clue.answer}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {clues.length > 0 && (
                  <Button className="w-full mt-4 bg-eco-green hover:bg-eco-green/90">
                    <Save className="w-4 h-4 mr-2" />
                    Save Treasure Hunt
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FacultyGames;
