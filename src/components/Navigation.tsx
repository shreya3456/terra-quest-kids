import { NavLink } from "@/components/NavLink";
import { User, BookOpen, Gamepad2, Sparkles } from "lucide-react";

const Navigation = () => {
  const navItems = [
    { to: "/dashboard", label: "Your Info", icon: User },
    { to: "/learn", label: "Learn", icon: BookOpen },
    { to: "/quiz", label: "Quiz & Games", icon: Gamepad2 },
    { to: "/create", label: "Create", icon: Sparkles },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <span className="text-2xl">🌍</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TerraQuest
              </h1>
              <p className="text-xs text-muted-foreground">Learn. Play. Act. Impact.</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl text-foreground hover:bg-muted/50 transition-all duration-300 hover:scale-105"
                activeClassName="bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* User Greeting */}
          <div className="hidden lg:flex items-center gap-3 bg-muted/50 px-5 py-3 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-xl">
              👋
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Hi there,</p>
              <p className="font-semibold text-foreground">Young Explorer!</p>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-1 pb-4 overflow-x-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-foreground hover:bg-muted/50 transition-all min-w-[80px]"
              activeClassName="bg-gradient-to-r from-primary to-secondary text-primary-foreground"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium whitespace-nowrap">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
