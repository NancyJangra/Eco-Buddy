import { Target, Trophy, Users, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: "goals", label: "Goals", icon: Target },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "ngos", label: "NGOs & Events", icon: Users },
    { id: "routes", label: "Green Routes", icon: MapPin },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="border-b bg-background">
      <div className="container overflow-x-auto">
        <div className="flex space-x-1 min-w-max px-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant="ghost"
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex items-center space-x-2 h-12 px-4 rounded-none border-b-2 border-transparent hover:border-eco-green/50 transition-colors",
                  activeTab === tab.id && "border-eco-green text-eco-green bg-eco-green/5"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium whitespace-nowrap">{tab.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;