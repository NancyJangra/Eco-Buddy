import { TrendingDown, Users, Award, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const DashboardWidgets = () => {
  const todaysFootprint = 4.2;
  const dailyGoal = 5.1;
  const progressPercentage = ((dailyGoal - todaysFootprint) / dailyGoal) * 100;

  const weeklyGoals = [
    { name: "Bike to work", current: 3, target: 3, unit: "days" },
    { name: "Plant-based meals", current: 8, target: 10, unit: "meals" },
  ];

  const weeklyLeaders = [
    { name: "Alex Chen", points: 2840, position: 1, badge: "gold" },
    { name: "Maya Patel", points: 2650, position: 2, badge: "silver" },
    { name: "You", points: 2450, position: 3, badge: "bronze" },
  ];

  return (
    <div className="space-y-4">
      {/* Today's Footprint */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base">
            <TrendingDown className="h-4 w-4 text-eco-green" />
            <span>Today's Footprint</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="text-2xl font-bold text-eco-green">{todaysFootprint} kg CO₂</div>
            <div className="text-sm text-muted-foreground">
              {Math.round(progressPercentage)}% below your daily goal
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Daily Goal</span>
              <span>{todaysFootprint}/{dailyGoal} kg</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Weekly Goals */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base">
            <Target className="h-4 w-4 text-eco-green" />
            <span>Weekly Goals</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {weeklyGoals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{goal.name}</span>
                <span className="text-muted-foreground">
                  {goal.current}/{goal.target} {goal.unit}
                </span>
              </div>
              <Progress value={(goal.current / goal.target) * 100} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* This Week's Leaders */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base">
            <Users className="h-4 w-4 text-eco-green" />
            <span>This Week's Leaders</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {weeklyLeaders.map((leader, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-eco-green to-eco-green-light text-white text-xs font-bold">
                  {leader.position}
                </div>
                <span className="text-sm font-medium">{leader.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">{leader.points}</div>
                <Badge variant="secondary" className="text-xs">
                  {leader.badge === "gold" && "🥇"}
                  {leader.badge === "silver" && "🥈"}
                  {leader.badge === "bronze" && "🥉"}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Energy Tip */}
      <Card className="bg-gradient-to-r from-eco-green/5 to-eco-green-light/5 border-eco-green/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base">
            <Award className="h-4 w-4 text-eco-green" />
            <span>Energy Tip</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Switching to LED bulbs can reduce lighting energy usage by up to 75% and last 25 times longer!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardWidgets;