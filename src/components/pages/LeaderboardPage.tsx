import { useState } from "react";
import { Trophy, Medal, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const LeaderboardPage = () => {
  const [activeFilter, setActiveFilter] = useState("This Month");
  
  const filters = ["This Week", "This Month", "This Lifetime"];
  
  const topThree = [
    {
      id: "1",
      name: "EcoWarrior",
      initials: "EW",
      points: 2450,
      streak: 15,
      badge: "Gold",
      position: 1,
      icon: Trophy
    },
    {
      id: "2", 
      name: "GreenThumb",
      initials: "GT",
      points: 2280,
      streak: 12,
      badge: "Gold",
      position: 2,
      icon: Medal
    },
    {
      id: "3",
      name: "CarbonCrusher", 
      initials: "CC",
      points: 2150,
      streak: 18,
      badge: "Silver",
      position: 3,
      icon: Medal
    }
  ];

  const allRankings = [
    ...topThree.map(user => ({ ...user, isCurrentUser: false })),
    {
      id: "4",
      name: "EarthGuardian",
      initials: "EG", 
      points: 2050,
      streak: 8,
      badge: "Silver",
      position: 4,
      isCurrentUser: false
    },
    {
      id: "5",
      name: "PlanetProtector",
      initials: "PP",
      points: 1950,
      streak: 22,
      badge: "Silver", 
      position: 5,
      isCurrentUser: false
    },
    {
      id: "8",
      name: "You",
      initials: "YU",
      points: 1250,
      streak: 7,
      badge: "Bronze",
      position: 8,
      isCurrentUser: true
    },
    {
      id: "9",
      name: "NatureLover",
      initials: "NL",
      points: 1150,
      streak: 9,
      badge: "Bronze",
      position: 9,
      isCurrentUser: false
    },
    {
      id: "10", 
      name: "ClimateChamp",
      initials: "CC",
      points: 1050,
      streak: 3,
      badge: "Bronze",
      position: 10,
      isCurrentUser: false
    }
  ];

  const stats = {
    totalUsers: 2847,
    userProgress: 23,
    userRank: 42
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Gold": return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case "Silver": return "bg-gradient-to-r from-gray-300 to-gray-500";
      case "Bronze": return "bg-gradient-to-r from-amber-600 to-amber-800";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <h1 className="text-3xl font-bold">Leaderboard</h1>
        </div>
        <p className="text-muted-foreground">See how you rank among eco-warriors worldwide</p>
        
        {/* Filter Buttons */}
        <div className="flex justify-center space-x-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "rounded-full",
                activeFilter === filter && "bg-eco-green hover:bg-eco-green-dark"
              )}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Top 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topThree.map((user, index) => {
          const Icon = user.icon;
          return (
            <Card 
              key={user.id}
              className={cn(
                "relative overflow-hidden",
                index === 0 && "ring-2 ring-yellow-400/50 bg-gradient-to-br from-yellow-50 to-orange-50"
              )}
            >
              <CardHeader className="text-center pb-3">
                <div className="flex justify-center mb-2">
                  <Icon className={cn(
                    "h-8 w-8",
                    index === 0 ? "text-yellow-500" : 
                    index === 1 ? "text-gray-400" : "text-amber-600"
                  )} />
                </div>
                <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center text-lg font-bold">
                  {user.initials}
                </div>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <h3 className="font-semibold">{user.name}</h3>
                <div className="text-2xl font-bold text-eco-green">{user.points.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">points</div>
                <Badge className={getBadgeColor(user.badge) + " text-white"}>
                  {user.badge}
                </Badge>
                <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  <span>{user.streak} day streak</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Complete Rankings */}
      <Card>
        <CardHeader>
          <CardTitle>Complete Rankings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {allRankings.map((user) => (
            <div
              key={user.id}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg border",
                user.isCurrentUser && "bg-eco-green/5 border-eco-green/30"
              )}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  {user.position <= 3 ? (
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm",
                      user.position === 1 && "bg-yellow-500",
                      user.position === 2 && "bg-gray-400", 
                      user.position === 3 && "bg-amber-600"
                    )}>
                      {user.position === 1 && <Trophy className="h-4 w-4" />}
                      {user.position === 2 && <Medal className="h-4 w-4" />}
                      {user.position === 3 && <Medal className="h-4 w-4" />}
                    </div>
                  ) : (
                    <div className="w-8 h-8 flex items-center justify-center text-lg font-bold text-muted-foreground">
                      #{user.position}
                    </div>
                  )}
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-medium">
                    {user.initials}
                  </div>
                </div>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-3 w-3" />
                    <span>{user.streak} days</span>
                    <Badge className={getBadgeColor(user.badge) + " text-white text-xs"}>
                      {user.badge}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">{user.points.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">points</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Users className="h-8 w-8 mx-auto mb-2 text-eco-green" />
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Users</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-eco-green" />
            <div className="text-2xl font-bold text-eco-green">↑ {stats.userProgress}%</div>
            <div className="text-sm text-muted-foreground">Your Progress</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-eco-green" />
            <div className="text-2xl font-bold">#{stats.userRank}</div>
            <div className="text-sm text-muted-foreground">Your Rank</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeaderboardPage;