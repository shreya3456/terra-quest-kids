import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Auth from "./pages/Auth";
import YourInfo from "./pages/YourInfo";
import Learn from "./pages/Learn";
import QuizGames from "./pages/QuizGames";
import Create from "./pages/Create";
import MapRo from "./pages/MapRo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
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
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
