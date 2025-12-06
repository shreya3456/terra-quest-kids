import { useState } from "react";
import { X, Leaf, Droplets, Wind, Flame, Trash2, Factory, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import LocationSolutionModal from "@/components/LocationSolutionModal";

interface Location {
  id: string;
  name: string;
  x: number;
  y: number;
  icon: React.ElementType;
  iconColor: string;
  issue: string;
  issueType: string;
  description: string;
  details: string;
}

const punjabLocations: Location[] = [
  {
    id: "ludhiana",
    name: "Ludhiana",
    x: 48,
    y: 55,
    icon: Factory,
    iconColor: "text-amber-600",
    issue: "Industrial Pollution",
    issueType: "Air & Water Pollution",
    description: "Ludhiana is one of Punjab's most industrialized cities with textile and manufacturing units.",
    details: "The Buddha Nullah stream passing through Ludhiana has become heavily polluted due to untreated industrial waste and sewage. This affects drinking water quality and harms aquatic life. Many factories release harmful chemicals into the air, causing respiratory problems for residents."
  },
  {
    id: "amritsar",
    name: "Amritsar",
    x: 32,
    y: 28,
    icon: Droplets,
    iconColor: "text-blue-500",
    issue: "Water Scarcity",
    issueType: "Groundwater Depletion",
    description: "The holy city faces increasing water stress due to over-extraction of groundwater.",
    details: "Farmers and residents depend heavily on tube wells, causing water tables to drop rapidly. The traditional water harvesting systems have been neglected. Climate change has made rainfall patterns unpredictable, worsening the crisis."
  },
  {
    id: "patiala",
    name: "Patiala",
    x: 58,
    y: 68,
    icon: Trash2,
    iconColor: "text-emerald-600",
    issue: "Waste Management Crisis",
    issueType: "Solid Waste",
    description: "The city struggles with growing amounts of solid waste and limited recycling facilities.",
    details: "Open dumping grounds have become breeding spots for diseases. Plastic waste chokes drains during monsoons causing floods. There's a need for better segregation at source and more recycling plants to handle the waste sustainably."
  },
  {
    id: "bathinda",
    name: "Bathinda",
    x: 28,
    y: 72,
    icon: Flame,
    iconColor: "text-orange-500",
    issue: "Stubble Burning",
    issueType: "Air Pollution",
    description: "This agricultural hub sees massive crop residue burning after harvest season.",
    details: "Farmers burn paddy stubble to quickly clear fields for the next crop. This creates thick smog covering the region and neighboring states. The smoke contains harmful particles that cause breathing problems and reduce visibility. Alternative solutions like happy seeders are available but need wider adoption."
  },
  {
    id: "jalandhar",
    name: "Jalandhar",
    x: 42,
    y: 35,
    icon: Wind,
    iconColor: "text-sky-500",
    issue: "Urban Air Quality",
    issueType: "Vehicle Emissions",
    description: "Growing vehicle numbers have made air quality a concern in this sports goods hub.",
    details: "Traffic congestion releases high amounts of carbon monoxide and particulate matter. The city needs better public transport and cycling infrastructure. Tree cover has decreased due to rapid urbanization, reducing natural air purification."
  },
  {
    id: "sangrur",
    name: "Sangrur",
    x: 52,
    y: 78,
    icon: Leaf,
    iconColor: "text-green-600",
    issue: "Soil Degradation",
    issueType: "Chemical Overuse",
    description: "Excessive use of pesticides and fertilizers has damaged soil health in this farming district.",
    details: "The Green Revolution brought prosperity but also chemical dependency. Soil fertility is declining, requiring even more chemicals to maintain yields. This creates a harmful cycle affecting both environment and farmer health. Organic farming practices offer a sustainable alternative."
  },
  {
    id: "mansa",
    name: "Mansa",
    x: 38,
    y: 85,
    icon: Droplets,
    iconColor: "text-cyan-500",
    issue: "Canal Water Pollution",
    issueType: "Agricultural Runoff",
    description: "Irrigation canals carry polluted water containing pesticide residues.",
    details: "Chemical runoff from farms enters the canal system, spreading contamination. This water is used for irrigation downstream, affecting crop quality and entering the food chain. Fish populations in canals have declined significantly. Buffer zones and natural filtering systems are needed."
  },
  {
    id: "gurdaspur",
    name: "Gurdaspur",
    x: 45,
    y: 15,
    icon: Leaf,
    iconColor: "text-lime-600",
    issue: "Deforestation",
    issueType: "Forest Cover Loss",
    description: "The Shivalik foothills in this border district are losing valuable forest cover.",
    details: "Trees are cut for timber, firewood, and to make space for agriculture. This leads to soil erosion during monsoons, causing floods and landslides. Wildlife habitats are shrinking, threatening biodiversity. Community forestry programs can help restore the green cover."
  }
];

const MapRo = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showSolutionModal, setShowSolutionModal] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handlePinClick = (location: Location) => {
    setSelectedLocation(location);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedLocation(null), 300);
  };

  const handleOpenSolutionModal = () => {
    setShowSolutionModal(true);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-eco-blue/20 via-primary/10 to-eco-green/20 z-50 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
        <a href="/quiz" className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg hover:shadow-xl transition-all hover:scale-105">
          <span className="text-2xl">←</span>
          <span className="font-bold text-foreground">Back to Games</span>
        </a>
      </div>

      {/* Title Badge */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-xl flex items-center gap-3">
          <span className="text-3xl">🗺️</span>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              MapRo - Punjab Explorer
            </h1>
            <p className="text-xs text-muted-foreground">Click pins to discover environmental challenges!</p>
          </div>
          <Sparkles className="w-5 h-5 text-eco-yellow animate-pulse" />
        </div>
      </div>

      {/* Map Container */}
      <div className="absolute inset-0 flex items-center justify-center p-8 pt-20">
        <div className="relative w-full max-w-4xl aspect-[4/5] md:aspect-[5/4]">
          {/* Punjab Map SVG */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-2xl"
            style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.15))" }}
          >
            {/* Map Background */}
            <defs>
              <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                <stop offset="50%" stopColor="hsl(var(--eco-green))" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(var(--eco-blue))" stopOpacity="0.3" />
              </linearGradient>
              <pattern id="mapPattern" patternUnits="userSpaceOnUse" width="5" height="5">
                <circle cx="2.5" cy="2.5" r="0.5" fill="hsl(var(--primary))" opacity="0.1" />
              </pattern>
            </defs>
            
            {/* Simplified Punjab Shape */}
            <path
              d="M25 10 L50 5 L75 15 L80 35 L75 55 L70 75 L55 95 L35 90 L20 70 L15 45 L20 25 Z"
              fill="url(#mapGradient)"
              stroke="hsl(var(--primary))"
              strokeWidth="0.5"
              className="animate-pulse"
              style={{ animationDuration: "4s" }}
            />
            <path
              d="M25 10 L50 5 L75 15 L80 35 L75 55 L70 75 L55 95 L35 90 L20 70 L15 45 L20 25 Z"
              fill="url(#mapPattern)"
            />
            
            {/* District Boundaries (simplified) */}
            <path d="M35 20 L55 18 L60 35" stroke="hsl(var(--border))" strokeWidth="0.3" fill="none" opacity="0.5" />
            <path d="M25 40 L45 45 L55 60" stroke="hsl(var(--border))" strokeWidth="0.3" fill="none" opacity="0.5" />
            <path d="M40 55 L50 70 L45 85" stroke="hsl(var(--border))" strokeWidth="0.3" fill="none" opacity="0.5" />
            
            {/* Rivers */}
            <path 
              d="M30 15 Q40 30, 35 50 Q30 70, 40 90" 
              stroke="hsl(var(--eco-blue))" 
              strokeWidth="0.8" 
              fill="none" 
              opacity="0.6"
              strokeDasharray="2,1"
            />
            <path 
              d="M55 10 Q60 25, 55 45 Q50 65, 55 85" 
              stroke="hsl(var(--eco-blue))" 
              strokeWidth="0.8" 
              fill="none" 
              opacity="0.6"
              strokeDasharray="2,1"
            />
          </svg>

          {/* Location Pins */}
          {punjabLocations.map((location, index) => (
            <button
              key={location.id}
              onClick={() => handlePinClick(location)}
              className={`absolute transform -translate-x-1/2 -translate-y-full group cursor-pointer transition-all duration-300 hover:scale-125 z-20 ${
                selectedLocation?.id === location.id ? "scale-125 z-30" : ""
              }`}
              style={{
                left: `${location.x}%`,
                top: `${location.y}%`,
                animation: `bounce 2s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`
              }}
            >
              {/* Pin Body */}
              <div className={`relative flex flex-col items-center ${selectedLocation?.id === location.id ? "animate-pulse" : ""}`}>
                {/* Glow Effect */}
                <div className="absolute -inset-2 bg-white/50 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Pin Head */}
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center border-3 border-primary relative ${
                  selectedLocation?.id === location.id ? "ring-4 ring-primary/30" : ""
                }`}>
                  <location.icon className={`w-5 h-5 md:w-6 md:h-6 ${location.iconColor}`} />
                </div>
                
                {/* Pin Pointer */}
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-primary -mt-1" />
                
                {/* Location Name Tooltip */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-bold px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  {location.name}
                </div>
              </div>
            </button>
          ))}

          {/* Decorative Elements */}
          <div className="absolute top-[10%] left-[10%] text-2xl animate-bounce" style={{ animationDelay: "0.5s" }}>🌳</div>
          <div className="absolute top-[20%] right-[15%] text-2xl animate-bounce" style={{ animationDelay: "1s" }}>☁️</div>
          <div className="absolute bottom-[20%] left-[8%] text-2xl animate-bounce" style={{ animationDelay: "1.5s" }}>🌾</div>
          <div className="absolute bottom-[10%] right-[10%] text-2xl animate-bounce" style={{ animationDelay: "2s" }}>🌻</div>
          <div className="absolute top-[60%] right-[5%] text-xl animate-bounce" style={{ animationDelay: "0.8s" }}>🐦</div>
        </div>
      </div>

      {/* Side Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-[450px] bg-white/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ease-out z-40 ${
          isPanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedLocation && (
          <div className="h-full flex flex-col">
            {/* Panel Header */}
            <div className={`p-6 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 relative overflow-hidden`}>
              <button
                onClick={handleClosePanel}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-all hover:scale-110"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
              
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center`}>
                  <selectedLocation.icon className={`w-8 h-8 ${selectedLocation.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground">{selectedLocation.name}</h2>
                  <span className="inline-block mt-1 px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full">
                    {selectedLocation.issueType}
                  </span>
                </div>
              </div>
              
              {/* Decorative wave */}
              <div className="absolute bottom-0 left-0 right-0 h-6">
                <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full">
                  <path d="M0 20 Q25 0, 50 10 T100 0 L100 20 Z" fill="white" opacity="0.95" />
                </svg>
              </div>
            </div>

            {/* Panel Content */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {/* Issue Title */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                    <span className="text-xl">⚠️</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{selectedLocation.issue}</h3>
                </div>

                {/* Description */}
                <Card className="border-2 border-primary/20 bg-primary/5">
                  <CardContent className="p-4">
                    <p className="text-foreground leading-relaxed">{selectedLocation.description}</p>
                  </CardContent>
                </Card>

                {/* Detailed Case Study */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📖</span>
                    <h4 className="font-bold text-foreground">Case Study</h4>
                  </div>
                  <Card className="border border-border">
                    <CardContent className="p-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {selectedLocation.details}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Fun Facts */}
                <Card className="border-2 border-eco-yellow/30 bg-eco-yellow/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span>💡</span> Did You Know?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">
                      Small actions by students like you can make a big difference! Every solution idea helps create a cleaner, greener Punjab.
                    </p>
                  </CardContent>
                </Card>

                {/* Illustrations */}
                <div className="flex justify-center gap-4 py-4">
                  <span className="text-4xl animate-bounce" style={{ animationDelay: "0s" }}>🌍</span>
                  <span className="text-4xl animate-bounce" style={{ animationDelay: "0.2s" }}>🌱</span>
                  <span className="text-4xl animate-bounce" style={{ animationDelay: "0.4s" }}>💚</span>
                </div>
              </div>
            </ScrollArea>

            {/* Panel Footer */}
            <div className="p-6 border-t border-border bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
              <Button
                onClick={handleOpenSolutionModal}
                className="w-full h-14 text-lg font-bold rounded-2xl bg-gradient-to-r from-primary via-eco-green to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-3"
              >
                <span>Give Your Solution</span>
                <span className="text-xl">🌱</span>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Solution Modal */}
      {selectedLocation && (
        <LocationSolutionModal
          isOpen={showSolutionModal}
          onClose={() => setShowSolutionModal(false)}
          locationName={selectedLocation.name}
          issue={selectedLocation.issue}
        />
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs hidden md:block">
        <h3 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
          <span>📍</span> Map Legend
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Factory className="w-4 h-4 text-amber-600" />
            <span>Industrial</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-500" />
            <span>Water Issue</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>Burning</span>
          </div>
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-green-600" />
            <span>Forest/Soil</span>
          </div>
          <div className="flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-emerald-600" />
            <span>Waste</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-sky-500" />
            <span>Air Quality</span>
          </div>
        </div>
      </div>

      {/* Instruction hint */}
      <div className="absolute bottom-4 right-4 md:right-auto md:left-1/2 md:-translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg animate-bounce">
        <p className="text-sm font-medium text-muted-foreground">
          👆 Click on any pin to explore!
        </p>
      </div>
    </div>
  );
};

export default MapRo;
