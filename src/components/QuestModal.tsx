import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  CalendarIcon,
  MapPin,
  Package,
  FileText,
  Upload,
  Sparkles,
  Leaf,
  TreePine,
  Globe,
  PartyPopper,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

interface QuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: {
    title: string;
    description: string;
    icon: LucideIcon;
    points: number;
    color: string;
  } | null;
}

const QuestModal = ({ isOpen, onClose, activity }: QuestModalProps) => {
  const [plan, setPlan] = useState("");
  const [location, setLocation] = useState("");
  const [materials, setMaterials] = useState("");
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset after showing success
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        setPlan("");
        setLocation("");
        setMaterials("");
        setDate(undefined);
      }, 2500);
    }, 1000);
  };

  const handleClose = () => {
    if (!isSubmitting && !showSuccess) {
      onClose();
      setPlan("");
      setLocation("");
      setMaterials("");
      setDate(undefined);
    }
  };

  if (!activity) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-2 border-primary/30 rounded-3xl">
        {/* Success State */}
        {showSuccess ? (
          <div className="p-8 text-center space-y-6 animate-bounce-in">
            {/* Confetti Effect */}
            <div className="relative">
              <div className="absolute inset-0 flex justify-center">
                {[...Array(12)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute text-2xl animate-float"
                    style={{
                      left: `${10 + i * 7}%`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: `${1 + Math.random()}s`,
                    }}
                  >
                    {["🎉", "🌟", "🌱", "✨", "🎊", "🌿"][i % 6]}
                  </span>
                ))}
              </div>
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-eco-green flex items-center justify-center animate-wiggle">
                <PartyPopper className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className="space-y-3 pt-8">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Quest Started! 🚀
              </h3>
              <p className="text-muted-foreground">
                Earn <span className="font-bold text-primary">+{activity.points} eco points</span> when you complete it!
              </p>
              <div className="flex justify-center gap-2 pt-2">
                <span className="text-3xl animate-bounce" style={{ animationDelay: "0s" }}>🌳</span>
                <span className="text-3xl animate-bounce" style={{ animationDelay: "0.1s" }}>🌍</span>
                <span className="text-3xl animate-bounce" style={{ animationDelay: "0.2s" }}>💚</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Header with Gradient */}
            <div className={`bg-gradient-to-br ${activity.color} p-6 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9InN0YXJzIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxjaXJjbGUgY3g9IjE1IiBjeT0iMTUiIHI9IjEuNSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC40Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3N0YXJzKSIvPjwvc3ZnPg==')] opacity-50"></div>
              
              {/* Floating decorations */}
              <div className="absolute top-2 right-4 text-2xl animate-float opacity-70">🌿</div>
              <div className="absolute bottom-2 left-4 text-xl animate-float" style={{ animationDelay: "0.5s" }}>✨</div>
              
              <DialogHeader className="relative">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center animate-wiggle">
                    <activity.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="text-left">
                    <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
                      Start Your Eco Quest <Leaf className="w-5 h-5" />
                    </DialogTitle>
                    <p className="text-white/90 text-sm mt-1">
                      Every eco action counts — let's do this! 🌍
                    </p>
                  </div>
                </div>
              </DialogHeader>
            </div>

            {/* Mascot */}
            <div className="absolute right-6 top-[72px] z-10">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center shadow-lg border-4 border-white animate-bounce">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-xs">😊</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Activity Name (Auto-filled) */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Activity Name
                </Label>
                <Input
                  value={activity.title}
                  disabled
                  className="bg-muted/50 border-2 border-primary/20 rounded-xl font-medium text-foreground"
                />
              </div>

              {/* Describe Your Plan */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <FileText className="w-4 h-4 text-secondary" />
                  Describe Your Plan
                </Label>
                <Textarea
                  placeholder="Tell us what you'll do to make an impact! 🌱"
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="border-2 border-input focus:border-primary rounded-xl min-h-[100px] resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Location */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                    <MapPin className="w-4 h-4 text-destructive" />
                    Location
                  </Label>
                  <Input
                    placeholder="Home, School..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border-2 border-input focus:border-primary rounded-xl"
                    required
                  />
                </div>

                {/* Materials Needed */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                    <Package className="w-4 h-4 text-accent" />
                    Materials Needed
                  </Label>
                  <Input
                    placeholder="Seeds, tools..."
                    value={materials}
                    onChange={(e) => setMaterials(e.target.value)}
                    className="border-2 border-input focus:border-primary rounded-xl"
                  />
                </div>
              </div>

              {/* Estimated Date */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <CalendarIcon className="w-4 h-4 text-primary" />
                  Estimated Completion Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-2 border-input rounded-xl hover:border-primary",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date 📅</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="pointer-events-auto rounded-xl"
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Upload Proof */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <Upload className="w-4 h-4 text-eco-ocean" />
                  Upload Proof (Optional)
                </Label>
                <div className="border-2 border-dashed border-input hover:border-primary rounded-xl p-6 text-center cursor-pointer transition-all hover:bg-muted/30 group">
                  <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Drag & drop or click to upload 📸
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Photo or video proof (can add later)
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 rounded-xl border-2"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-[2] rounded-xl bg-gradient-to-r from-primary to-eco-green hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-primary-foreground font-semibold"
                  disabled={isSubmitting || !plan || !location}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <TreePine className="w-4 h-4 animate-spin" />
                      Starting Quest...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Submit Quest 🚀
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuestModal;
