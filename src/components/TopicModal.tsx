import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Cloud, Droplets, Sprout, CloudRain, Trash2, Leaf, Fish, Factory, LucideIcon } from "lucide-react";

interface TopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: {
    title: string;
    icon: LucideIcon;
    color: string;
  } | null;
  onStartQuiz: () => void;
}

const topicContent: Record<string, { content: string; facts: string[]; icon: string }> = {
  "Air Pollution": {
    content: `Air pollution happens when harmful substances like smoke, dust, and gases get mixed into the air we breathe. Imagine the air as a big invisible blanket that covers our whole planet - when bad things get into this blanket, it becomes dirty and can make people, animals, and plants sick!

The main causes of air pollution include factories that produce smoke, cars and trucks that release exhaust fumes, burning of garbage and fossil fuels, and even dust from construction sites. When we burn coal, oil, or gas for energy, we release harmful gases like carbon dioxide and sulfur dioxide into the atmosphere.

Air pollution affects our health in many ways. It can cause breathing problems like asthma, make our eyes water and itch, give us headaches, and even harm our hearts. Children and elderly people are especially vulnerable to dirty air. Animals and plants also suffer - birds can get sick, and trees can lose their leaves too early.

The good news is that we can all help reduce air pollution! We can plant more trees because they act like nature's air filters, absorbing bad gases and giving us clean oxygen. We can walk, bike, or use public transport instead of cars. We can save electricity at home, avoid burning garbage, and encourage our families to use cleaner energy sources like solar power.

Scientists around the world are working hard to create cleaner technologies and stricter rules to protect our air. Many cities now have air quality monitors that tell people when the air is safe to breathe. Remember, every small action counts - together, we can make our air cleaner and healthier for everyone!`,
    facts: ["A single tree can absorb up to 48 pounds of CO2 per year!", "Indoor air can be 2-5 times more polluted than outdoor air", "Planting trees is one of the best ways to fight air pollution"],
    icon: "🌫️"
  },
  "Water Pollution": {
    content: `Water is one of the most precious resources on our planet - we need it to drink, cook, bathe, and grow our food. But unfortunately, our rivers, lakes, and oceans are becoming polluted, which means they're getting dirty and unhealthy for the creatures that live in them and for us!

Water pollution happens when harmful substances like chemicals, plastic waste, sewage, and oil spills get into our water bodies. Factories sometimes release their waste into rivers, farmers use pesticides that wash into streams, and people throw garbage that ends up in the ocean. Even the soap and cleaning products we use at home can pollute water if not treated properly!

When water gets polluted, it affects everyone and everything. Fish and other sea creatures can get sick or die. Birds that eat fish from polluted waters also become ill. Plants that need clean water to grow can wither away. And when people drink or use polluted water, they can get serious diseases like cholera and typhoid.

The ocean is facing a huge problem with plastic pollution. Every year, millions of tons of plastic waste end up in the sea, harming marine animals like turtles, dolphins, and fish who mistake plastic for food. This plastic breaks into tiny pieces called microplastics that even get into the fish we eat!

We can all be water heroes! Start by never throwing garbage near water bodies, use less plastic, and pick up litter when you see it. At home, don't pour chemicals or medicines down the drain. Save water by turning off taps when not in use. Spread awareness about water conservation - tell your friends and family why clean water matters. Together, we can keep our waters crystal clear!`,
    facts: ["About 80% of ocean pollution comes from land", "A plastic bottle can take 450 years to decompose!", "Clean water access is a basic human right"],
    icon: "💧"
  },
  "Sustainable Development": {
    content: `Imagine if you had a magical cookie jar that gave you one cookie every day. If you ate only one cookie, you'd always have cookies! But if you ate three cookies every day, soon the jar would be empty. Sustainable development is kind of like using just enough from our planet's cookie jar so there's always enough for everyone, including future kids like your younger siblings!

Sustainable development means meeting our needs today without destroying the resources that future generations will need. It's about finding a balance between taking care of people, protecting the planet, and creating prosperity for all. Think of it as the three P's: People, Planet, and Prosperity working together!

In a sustainable world, we use renewable energy from the sun and wind instead of burning coal and oil that pollute the air. We recycle and reuse things instead of throwing them away. We build homes and schools that use less energy. We grow food in ways that don't harm the soil or use too much water. And we make sure everyone has access to education, healthcare, and clean water.

Many countries around the world have agreed to work on 17 Sustainable Development Goals (SDGs) to make our planet better by 2030. These goals include ending poverty and hunger, providing quality education, ensuring clean water, building sustainable cities, and taking action on climate change.

You can be part of sustainable development right now! Use cloth bags instead of plastic ones, turn off lights when leaving a room, eat more local fruits and vegetables, share and donate toys you don't use, and learn about ways to help your community. Every eco-friendly choice you make is a step toward a sustainable future!`,
    facts: ["There are 17 UN Sustainable Development Goals", "Renewable energy can power our entire planet!", "Sustainable choices today protect tomorrow's world"],
    icon: "🌍"
  },
  "Rainwater Harvesting": {
    content: `Did you know that raindrops falling from the sky are like little gifts of fresh water? Rainwater harvesting is the clever practice of collecting and storing this precious gift instead of letting it run away into drains. It's like having a giant savings account for water!

Rainwater harvesting has been practiced for thousands of years by ancient civilizations. In India, traditional methods like stepwells, tanks, and johads have been used for centuries to collect rain. Today, we use modern methods too - rooftop collection systems, storage tanks, and even underground reservoirs to save every drop!

The process is simple: when rain falls on rooftops, it's directed through pipes into storage tanks or allowed to seep into the ground to recharge underground water sources. This stored water can be used for gardening, washing, and after proper treatment, even for drinking! One heavy rainfall can fill a large tank with thousands of liters of free, clean water.

Rainwater harvesting is super important because many parts of the world face water shortages. Rivers and underground water levels are dropping because we use more water than nature can replenish. By harvesting rainwater, we reduce the pressure on rivers and borewells, prevent flooding in cities, and always have a backup water supply during dry seasons.

You can start rainwater harvesting at your own home! Ask your parents about installing a simple collection system. Even keeping buckets outside during rain to collect water for plants is a great start. Schools can have larger systems to water their gardens and flush toilets. Every drop of rain you save helps ensure water for the future!`,
    facts: ["A 1000 sq ft roof can collect 600 liters from 1cm of rainfall!", "Rainwater is naturally soft and great for plants", "Ancient Romans collected rainwater in cisterns"],
    icon: "🌧️"
  },
  "Waste Management": {
    content: `Every day, each person creates about 1-2 kilograms of waste - that's like throwing away a small watermelon daily! Now multiply that by billions of people, and you can imagine the mountain of garbage our planet faces. Waste management is all about handling this garbage smartly so it doesn't harm our environment.

The golden rule of waste management is the 5 R's: Refuse, Reduce, Reuse, Repurpose, and Recycle! First, refuse things you don't really need, especially single-use plastics. Reduce what you consume - do you really need ten toys or will five make you just as happy? Reuse items as many times as possible. Repurpose old things into new useful objects. And finally, recycle materials like paper, plastic, glass, and metal.

There are different types of waste: biodegradable waste like food scraps and leaves that can decompose naturally; non-biodegradable waste like plastic and glass that don't break down easily; hazardous waste like batteries and chemicals that need special handling; and e-waste like old phones and computers. Each type needs to be handled differently!

Composting is a magical process where food waste and garden waste turn into rich soil called compost. This compost helps plants grow bigger and stronger! Many families have compost bins in their gardens. Vermicomposting uses earthworms to speed up this process - the worms eat the waste and produce excellent fertilizer.

Start segregating waste at home into wet (biodegradable) and dry (recyclable) bins. Say no to plastic bags and carry your own cloth bags. Fix broken things instead of throwing them away. Donate old clothes and books. Make art from waste materials! Being a waste warrior is fun and helps keep our planet clean and healthy for everyone.`,
    facts: ["Recycling one ton of paper saves 17 trees!", "Food waste in landfills produces methane, a harmful gas", "The average person creates 4.5 pounds of trash daily"],
    icon: "♻️"
  }
};

const TopicModal = ({ isOpen, onClose, topic, onStartQuiz }: TopicModalProps) => {
  if (!topic) return null;
  
  const content = topicContent[topic.title] || {
    content: `${topic.title} is an important environmental topic that affects our planet and daily lives. Learning about this subject helps us understand how to protect our environment and create a sustainable future for all living beings. Every action we take can make a positive difference!`,
    facts: ["Every eco-action counts!", "Learning is the first step to change", "You can make a difference!"],
    icon: "🌱"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] bg-gradient-to-br from-card via-background to-card border-2 border-primary/30 rounded-3xl p-0 overflow-hidden">
        {/* Header with gradient */}
        <div className={`h-24 bg-gradient-to-r ${topic.color} relative flex items-center justify-center`}>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImRvdHMiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4zIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2RvdHMpIi8+PC9zdmc+')] opacity-50"></div>
          <div className="flex items-center gap-3 z-10">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <topic.icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">{topic.title}</h2>
            <span className="text-3xl">{content.icon}</span>
          </div>
        </div>

        <div className="p-6">
          <ScrollArea className="h-[400px] pr-4">
            {/* Main content */}
            <div className="space-y-6">
              <div className="prose prose-sm max-w-none">
                {content.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-foreground/90 leading-relaxed text-base mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Fun Facts Section */}
              <div className="bg-gradient-to-r from-accent/20 to-secondary/20 rounded-2xl p-4 border border-accent/30">
                <h4 className="font-bold text-foreground flex items-center gap-2 mb-3">
                  <span className="text-xl">💡</span> Fun Facts!
                </h4>
                <ul className="space-y-2">
                  {content.facts.map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className="text-primary">✨</span>
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollArea>

          {/* Action buttons */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-xl border-2 hover:bg-muted"
            >
              Close
            </Button>
            <Button
              onClick={onStartQuiz}
              className="flex-1 rounded-xl bg-gradient-to-r from-primary to-eco-green hover:shadow-lg transition-all"
            >
              🎯 Start Quiz
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TopicModal;
