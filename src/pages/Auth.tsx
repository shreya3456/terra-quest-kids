import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { School, Lock, Eye, EyeOff, Leaf, TreePine, Droplets, Sun } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState("student");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registrationNumber || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Simple login logic - in a real app, this would validate against a backend
    toast.success(`Welcome back, ${activeTab}! 🌿`);
    
    // Navigate based on user role
    setTimeout(() => {
      if (activeTab === "faculty") {
        navigate("/faculty/dashboard");
      } else {
        navigate("/dashboard");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-green/10 via-eco-blue/10 to-eco-yellow/10 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 animate-float">
        <TreePine className="w-16 h-16 text-eco-green/20" />
      </div>
      <div className="absolute top-20 right-20 animate-float" style={{ animationDelay: "1s" }}>
        <Sun className="w-20 h-20 text-eco-yellow/30" />
      </div>
      <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: "2s" }}>
        <Droplets className="w-12 h-12 text-eco-blue/25" />
      </div>
      <div className="absolute bottom-10 right-10 animate-wiggle">
        <Leaf className="w-14 h-14 text-eco-leaf/30" />
      </div>

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center z-10">
        {/* Left side - Branding and Mascot */}
        <div className="text-center md:text-left space-y-6 animate-bounce-in">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-eco-green via-eco-blue to-eco-yellow bg-clip-text text-transparent">
              TerraQuest
            </h1>
            <p className="text-2xl font-semibold text-eco-green">
              Learn. Play. Act. Impact. 🌍
            </p>
            <p className="text-lg text-muted-foreground italic">
              "Where learning meets sustainability." 🌱
            </p>
          </div>
          
          {/* Mascot Illustration - using emoji and decorative elements */}
          <div className="relative h-64 flex items-center justify-center">
            <div className="text-9xl animate-float">🌍</div>
            <div className="absolute top-0 right-1/4 text-4xl animate-wiggle">🌱</div>
            <div className="absolute bottom-0 left-1/4 text-3xl animate-float" style={{ animationDelay: "1.5s" }}>📚</div>
            <div className="absolute top-1/2 right-0 text-3xl animate-bounce-in" style={{ animationDelay: "0.5s" }}>🎮</div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <Card className="shadow-card animate-bounce-in border-2 border-eco-green/20" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold text-eco-green">
              Welcome to TerraQuest 🌿
            </CardTitle>
            <CardDescription className="text-base">
              Login to start your eco-learning journey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-eco-green/10">
                <TabsTrigger 
                  value="student" 
                  className="data-[state=active]:bg-eco-green data-[state=active]:text-white font-semibold"
                >
                  👨‍🎓 Student Login
                </TabsTrigger>
                <TabsTrigger 
                  value="faculty"
                  className="data-[state=active]:bg-eco-blue data-[state=active]:text-white font-semibold"
                >
                  👨‍🏫 Faculty Login
                </TabsTrigger>
              </TabsList>

              <TabsContent value="student">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-reg" className="text-base font-semibold">
                      School Registration Number
                    </Label>
                    <div className="relative">
                      <School className="absolute left-3 top-3 h-5 w-5 text-eco-green" />
                      <Input
                        id="student-reg"
                        type="text"
                        placeholder="Enter your registration number"
                        className="pl-10 h-12 text-base border-eco-green/30 focus:border-eco-green"
                        value={registrationNumber}
                        onChange={(e) => setRegistrationNumber(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="student-password" className="text-base font-semibold">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-eco-green" />
                      <Input
                        id="student-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10 h-12 text-base border-eco-green/30 focus:border-eco-green"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-eco-green transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember-student" 
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      className="border-eco-green data-[state=checked]:bg-eco-green"
                    />
                    <label
                      htmlFor="remember-student"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1 cursor-pointer"
                    >
                      <Leaf className="h-4 w-4 text-eco-green" />
                      Remember Me
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-eco-green to-eco-leaf hover:from-eco-green/90 hover:to-eco-leaf/90 transition-all duration-300 transform hover:scale-105"
                  >
                    Login 🌱
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      className="text-sm text-eco-blue hover:text-eco-ocean transition-colors underline"
                      onClick={() => toast.info("Password reset feature coming soon!")}
                    >
                      Forgot Password?
                    </button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="faculty">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="faculty-reg" className="text-base font-semibold">
                      School Registration Number
                    </Label>
                    <div className="relative">
                      <School className="absolute left-3 top-3 h-5 w-5 text-eco-blue" />
                      <Input
                        id="faculty-reg"
                        type="text"
                        placeholder="Enter your registration number"
                        className="pl-10 h-12 text-base border-eco-blue/30 focus:border-eco-blue"
                        value={registrationNumber}
                        onChange={(e) => setRegistrationNumber(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="faculty-password" className="text-base font-semibold">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-eco-blue" />
                      <Input
                        id="faculty-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10 h-12 text-base border-eco-blue/30 focus:border-eco-blue"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-eco-blue transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember-faculty" 
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      className="border-eco-blue data-[state=checked]:bg-eco-blue"
                    />
                    <label
                      htmlFor="remember-faculty"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1 cursor-pointer"
                    >
                      <Leaf className="h-4 w-4 text-eco-blue" />
                      Remember Me
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-eco-blue to-eco-ocean hover:from-eco-blue/90 hover:to-eco-ocean/90 transition-all duration-300 transform hover:scale-105"
                  >
                    Login 🌱
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      className="text-sm text-eco-blue hover:text-eco-ocean transition-colors underline"
                      onClick={() => toast.info("Password reset feature coming soon!")}
                    >
                      Forgot Password?
                    </button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center z-10">
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
          <span>Powered by TerraQuest Team</span>
          <span className="flex items-center gap-1">
            <TreePine className="w-4 h-4 text-eco-green" />
            <Sun className="w-4 h-4 text-eco-yellow" />
            <Droplets className="w-4 h-4 text-eco-blue" />
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
