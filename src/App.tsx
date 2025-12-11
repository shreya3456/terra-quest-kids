import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import FacultyNavigation from "./components/FacultyNavigation";
import Auth from "./pages/Auth";
import YourInfo from "./pages/YourInfo";
import Learn from "./pages/Learn";
import QuizGames from "./pages/QuizGames";
import Create from "./pages/Create";
import MapRo from "./pages/MapRo";
import NotFound from "./pages/NotFound";
import FacultyDashboard from "./pages/FacultyDashboard";
import FacultyGames from "./pages/FacultyGames";
import FacultyRewards from "./pages/FacultyRewards";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          {/* Student Routes */}
          <Route
            path="/*"
            element={
              <>
                <Navigation />
                <main className="pt-24 md:pt-28 pb-12 px-4 container mx-auto">
                  <Routes>
                    <Route path="/dashboard" element={<YourInfo />} />
                    <Route path="/learn" element={<Learn />} />
                    <Route path="/quiz" element={<QuizGames />} />
                    <Route path="/mapro" element={<MapRo />} />
                    <Route path="/create" element={<Create />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </>
            }
          />
          {/* Faculty Routes */}
          <Route
            path="/faculty/*"
            element={
              <>
                <FacultyNavigation />
                <main className="pt-24 md:pt-28 pb-12 px-4 container mx-auto">
                  <Routes>
                    <Route path="/dashboard" element={<FacultyDashboard />} />
                    <Route path="/games" element={<FacultyGames />} />
                    <Route path="/rewards" element={<FacultyRewards />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
