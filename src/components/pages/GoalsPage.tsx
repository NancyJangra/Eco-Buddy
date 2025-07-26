import { useState } from "react";
import { Plus, Target, Upload, Car, Trash2, Lightbulb, Utensils, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const GoalsPage = () => {
  const [goals, setGoals] = useState([
    {
      id: "1",
      title: "Bike to work",
      category: "Transport",
      target: 3,
      current: 3,
      unit: "times/week",
      icon: Car,
      color: "bg-eco-green"
    },
    {
      id: "2", 
      title: "Plant-based meals",
      category: "Diet",
      target: 10,
      current: 8,
      unit: "meals/week", 
      icon: Utensils,
      color: "bg-eco-green-light"
    },
    {
      id: "3",
      title: "Reduce electricity usage",
      category: "Electricity", 
      target: 20,
      current: 15,
      unit: "% reduction",
      icon: Lightbulb,
      color: "bg-gold"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    category: "",
    target: "",
    unit: "",
  });

  const categories = [
    { name: "Transport", icon: Car, color: "bg-eco-green" },
    { name: "Diet", icon: Utensils, color: "bg-eco-green-light" },
    { name: "Electricity", icon: Lightbulb, color: "bg-gold" },
    { name: "Waste", icon: Trash2, color: "bg-bronze" },
    { name: "Volunteering", icon: Heart, color: "bg-eco-green-dark" },
  ];

  const handleCreateGoal = () => {
    if (newGoal.title && newGoal.category && newGoal.target) {
      const category = categories.find(c => c.name === newGoal.category);
      const goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        category: newGoal.category,
        target: parseInt(newGoal.target),
        current: 0,
        unit: newGoal.unit || "times",
        icon: category?.icon || Target,
        color: category?.color || "bg-gray-500"
      };
      setGoals([...goals, goal]);
      setNewGoal({ title: "", category: "", target: "", unit: "" });
      setIsDialogOpen(false);
    }
  };

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return "bg-eco-green";
    if (percentage >= 75) return "bg-eco-green-light";
    if (percentage >= 50) return "bg-gold";
    return "bg-muted";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-2">
            <Target className="h-8 w-8 text-eco-green" />
            <span>My Goals</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your eco-friendly habits and make a positive impact
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-eco-green hover:bg-eco-green-dark">
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
              <DialogDescription>
                Set a new eco-friendly goal to track your progress
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Goal title (e.g., Walk to work)"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              />
              <Select onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.name} value={category.name}>
                      <div className="flex items-center space-x-2">
                        <category.icon className="h-4 w-4" />
                        <span>{category.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Target (e.g., 3)"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                />
                <Input
                  placeholder="Unit (e.g., times/week)"
                  value={newGoal.unit}
                  onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                />
              </div>
              <Button onClick={handleCreateGoal} className="w-full bg-eco-green hover:bg-eco-green-dark">
                Create Goal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Goal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const progress = (goal.current / goal.target) * 100;
          const isCompleted = goal.current >= goal.target;
          
          return (
            <Card key={goal.id} className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4" style={{ borderLeftColor: `hsl(var(--eco-green))` }}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`p-3 rounded-xl ${goal.color} text-white shadow-sm`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg font-semibold line-clamp-2">{goal.title}</CardTitle>
                      <Badge variant="outline" className="text-xs mt-2 bg-eco-green/10 text-eco-green border-eco-green/20">
                        {goal.category}
                      </Badge>
                    </div>
                  </div>
                  {isCompleted && (
                    <Badge className="bg-eco-green hover:bg-eco-green-dark text-white shadow-sm">
                      ✓ Complete
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6 pt-2">
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-muted-foreground font-medium">Progress</span>
                    <span className="font-bold text-eco-green">
                      {goal.current}/{goal.target} {goal.unit}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <Progress 
                      value={Math.min(progress, 100)} 
                      className="h-3 bg-muted"
                    />
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">0</span>
                      <span className="font-bold text-eco-green bg-eco-green/10 px-2 py-1 rounded-full">
                        {Math.round(progress)}%
                      </span>
                      <span className="text-muted-foreground">{goal.target}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 hover:bg-destructive/10 hover:border-destructive hover:text-destructive transition-colors"
                    onClick={() => {
                      const updated = goals.map(g => 
                        g.id === goal.id ? { ...g, current: Math.max(0, g.current - 1) } : g
                      );
                      setGoals(updated);
                    }}
                  >
                    -1
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-eco-green hover:bg-eco-green-dark text-white shadow-sm"
                    onClick={() => {
                      const updated = goals.map(g => 
                        g.id === goal.id ? { ...g, current: g.current + 1 } : g
                      );
                      setGoals(updated);
                    }}
                  >
                    +1
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="hover:bg-eco-green/10 hover:border-eco-green hover:text-eco-green transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
              
              {isCompleted && (
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-eco-green"></div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="bg-gradient-to-br from-eco-green/5 to-eco-green-light/5 border-eco-green/20 hover:shadow-lg transition-all duration-300">
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-eco-green mb-2">
              {goals.filter(g => g.current >= g.target).length}
            </div>
            <div className="text-sm text-muted-foreground font-medium">Goals Completed</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-eco-green-light/5 to-eco-green/5 border-eco-green/20 hover:shadow-lg transition-all duration-300">
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-eco-green mb-2">
              {Math.round(goals.reduce((acc, g) => acc + (g.current / g.target), 0) / goals.length * 100)}%
            </div>
            <div className="text-sm text-muted-foreground font-medium">Average Progress</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-eco-green-dark/5 to-eco-green/5 border-eco-green/20 hover:shadow-lg transition-all duration-300">
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-eco-green mb-2">{goals.length}</div>
            <div className="text-sm text-muted-foreground font-medium">Active Goals</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GoalsPage;