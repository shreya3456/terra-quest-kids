import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Sparkles, Send, CheckCircle2, X } from "lucide-react";

interface LocationSolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationName: string;
  issue: string;
}

const LocationSolutionModal = ({ isOpen, onClose, locationName, issue }: LocationSolutionModalProps) => {
  const [solution, setSolution] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!solution.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setSolution("");
      setIsSuccess(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg rounded-3xl border-2 border-primary/20 p-0 overflow-hidden bg-background">
        {!isSuccess ? (
          <>
            {/* Header */}
            <div className="relative bg-gradient-to-r from-primary/20 via-eco-green/20 to-secondary/20 p-6 pb-10">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <span className="text-3xl">💡</span>
                  Your Eco Solution
                </DialogTitle>
              </DialogHeader>
              
              <div className="mt-3 flex items-center gap-2">
                <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full">
                  📍 {locationName}
                </span>
                <span className="px-3 py-1 bg-destructive/10 text-destructive text-sm font-medium rounded-full">
                  {issue}
                </span>
              </div>

              {/* Decorative wave */}
              <div className="absolute bottom-0 left-0 right-0 h-6">
                <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full">
                  <path d="M0 20 Q25 0, 50 10 T100 0 L100 20 Z" fill="hsl(var(--background))" />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              {/* Motivational message */}
              <div className="flex items-center gap-3 p-4 bg-eco-yellow/20 rounded-2xl border border-eco-yellow/30">
                <Sparkles className="w-6 h-6 text-eco-yellow flex-shrink-0" />
                <p className="text-sm font-medium text-foreground">
                  Every great change starts with an idea! Share your creative solution for this environmental challenge.
                </p>
              </div>

              {/* Solution textarea */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="text-lg">✏️</span>
                  Describe Your Solution
                </label>
                <Textarea
                  placeholder="Example: We can organize weekly cleanup drives and install dustbins at every corner. Students can create awareness posters and teach people about proper waste disposal..."
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  className="min-h-[140px] rounded-xl border-2 border-primary/20 focus:border-primary bg-primary/5 resize-none text-base placeholder:text-muted-foreground/60"
                />
                <p className="text-xs text-muted-foreground text-right">
                  {solution.length} characters
                </p>
              </div>

              {/* Upload option */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="text-lg">📎</span>
                  Add Supporting Media (Optional)
                </label>
                <div className="border-2 border-dashed border-primary/30 rounded-xl p-6 text-center hover:bg-primary/5 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-primary/50 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop images, diagrams, or videos
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    PNG, JPG, MP4 up to 10MB
                  </p>
                </div>
              </div>

              {/* Submit button */}
              <Button
                onClick={handleSubmit}
                disabled={!solution.trim() || isSubmitting}
                className="w-full h-14 text-lg font-bold rounded-2xl bg-gradient-to-r from-primary via-eco-green to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Send className="w-5 h-5" />
                    <span>Submit Solution</span>
                    <span className="text-xl">🚀</span>
                  </div>
                )}
              </Button>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="p-8 text-center space-y-6">
            {/* Success animation */}
            <div className="relative">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-eco-green/20 flex items-center justify-center animate-scale-in">
                <CheckCircle2 className="w-14 h-14 text-primary" />
              </div>
              
              {/* Confetti emojis */}
              <div className="absolute inset-0 pointer-events-none">
                {["🎉", "✨", "🌟", "💚", "🌱", "🎊"].map((emoji, i) => (
                  <span
                    key={i}
                    className="absolute text-2xl animate-bounce"
                    style={{
                      left: `${15 + i * 15}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.15}s`,
                      animationDuration: "1.5s"
                    }}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">
                Great Job, Eco Hero! 🌍
              </h3>
              <p className="text-muted-foreground text-lg">
                Your eco-solution for <span className="font-bold text-primary">{locationName}</span> has been recorded!
              </p>
            </div>

            <div className="p-4 bg-primary/10 rounded-2xl">
              <p className="text-sm text-foreground">
                🏆 You earned <span className="font-bold text-primary">+15 Eco Points</span> for submitting your solution!
              </p>
            </div>

            <p className="text-muted-foreground text-sm">
              Our team will review your solution. The best ideas may be featured on the school board! 📋
            </p>

            <Button
              onClick={handleClose}
              className="h-12 px-8 text-lg font-bold rounded-2xl bg-gradient-to-r from-primary to-secondary"
            >
              Awesome! 🎉
            </Button>

            {/* Decorative illustrations */}
            <div className="flex justify-center gap-4 pt-2">
              <span className="text-4xl animate-bounce" style={{ animationDelay: "0s" }}>🌳</span>
              <span className="text-4xl animate-bounce" style={{ animationDelay: "0.2s" }}>🌊</span>
              <span className="text-4xl animate-bounce" style={{ animationDelay: "0.4s" }}>🌻</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LocationSolutionModal;
