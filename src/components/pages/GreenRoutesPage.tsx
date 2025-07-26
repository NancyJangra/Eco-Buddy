import { useState } from "react";
import { MapPin, Navigation, Clock, Leaf, Car, Bike, Train, MapPinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const GreenRoutesPage = () => {
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [urgency, setUrgency] = useState("");
  const [routes, setRoutes] = useState([]);

  const sampleRoutes = [
    {
      id: "1",
      type: "walk",
      icon: MapPinIcon,
      title: "Walking Route",
      duration: "45 mins",
      distance: "3.2 km",
      carbonSaving: "2.1 kg CO₂",
      color: "bg-green-500",
      description: "Scenic route through Central Park",
      steps: ["Head north on Main St", "Turn right onto Park Ave", "Continue through Central Park"]
    },
    {
      id: "2", 
      type: "bike",
      icon: Bike,
      title: "Cycling Route",
      duration: "18 mins",
      distance: "3.2 km", 
      carbonSaving: "2.1 kg CO₂",
      color: "bg-blue-500",
      description: "Bike-friendly path with minimal traffic",
      steps: ["Take bike lane on Elm St", "Follow riverside path", "Turn left onto Destination St"]
    },
    {
      id: "3",
      type: "transit",
      icon: Train, 
      title: "Public Transit",
      duration: "25 mins",
      distance: "4.1 km",
      carbonSaving: "1.8 kg CO₂", 
      color: "bg-purple-500",
      description: "Metro + short walk combination",
      steps: ["Walk 3 mins to Metro Station", "Take Line 2 to Downtown", "Walk 5 mins to destination"]
    },
    {
      id: "4",
      type: "carpool",
      icon: Car,
      title: "Electric Carpool", 
      duration: "12 mins",
      distance: "3.8 km",
      carbonSaving: "1.2 kg CO₂",
      color: "bg-orange-500", 
      description: "Shared electric vehicle option",
      steps: ["Meet at pickup point", "Shared ride with 2 others", "Drop-off at destination"]
    }
  ];

  const handleSearch = () => {
    if (startLocation && destination && urgency) {
      // Filter routes based on urgency
      let filteredRoutes = [...sampleRoutes];
      
      if (urgency === "low") {
        filteredRoutes = sampleRoutes.filter(r => r.type === "walk" || r.type === "bike");
      } else if (urgency === "medium") {
        filteredRoutes = sampleRoutes.filter(r => r.type === "bike" || r.type === "transit");
      } else if (urgency === "high") {
        filteredRoutes = sampleRoutes.filter(r => r.type === "transit" || r.type === "carpool");
      }
      
      setRoutes(filteredRoutes);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "low": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800"; 
      case "high": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center space-x-2">
          <Navigation className="h-8 w-8 text-eco-green" />
          <span>Green Routes</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Find eco-friendly transportation options for your journey
        </p>
      </div>

      {/* Route Planner */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-eco-green" />
            <span>Plan Your Eco-Friendly Route</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <Input
                placeholder="Enter starting location"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <Input
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Urgency</label>
              <Select onValueChange={setUrgency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - I have time</SelectItem>
                  <SelectItem value="medium">Medium - Moderate rush</SelectItem>
                  <SelectItem value="high">High - Need to be fast</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button 
            onClick={handleSearch}
            className="w-full bg-eco-green hover:bg-eco-green-dark"
            disabled={!startLocation || !destination || !urgency}
          >
            <Navigation className="h-4 w-4 mr-2" />
            Find Green Routes
          </Button>
        </CardContent>
      </Card>

      {/* Route Results */}
      {routes.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recommended Routes</h2>
            <Badge className={getUrgencyColor(urgency)}>
              {urgency} urgency
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {routes.map((route) => {
              const Icon = route.icon;
              return (
                <Card key={route.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${route.color} text-white`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{route.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {route.description}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-eco-green text-white">
                        <Leaf className="h-3 w-3 mr-1" />
                        Eco
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="flex items-center justify-center space-x-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{route.duration}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Duration</div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center space-x-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{route.distance}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Distance</div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center space-x-1">
                          <Leaf className="h-4 w-4 text-eco-green" />
                          <span className="text-sm font-medium text-eco-green">{route.carbonSaving}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">CO₂ Saved</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Route Steps:</div>
                      <ul className="space-y-1">
                        {route.steps.map((step, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                            <span className="font-medium text-eco-green">{index + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      className="w-full bg-eco-green hover:bg-eco-green-dark"
                      size="sm"
                    >
                      Start Navigation
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Tips Section */}
      <Card className="bg-gradient-to-r from-eco-green/10 to-eco-green-light/10 border-eco-green/20">
        <CardContent className="pt-6">
          <h3 className="font-semibold flex items-center space-x-2 mb-3">
            <Leaf className="h-5 w-5 text-eco-green" />
            <span>Green Transportation Tips</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="font-medium">🚶‍♀️ Walking Benefits:</div>
              <ul className="text-muted-foreground space-y-1">
                <li>• Zero carbon emissions</li>
                <li>• Great for health and fitness</li>
                <li>• Discover your neighborhood</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="font-medium">🚴‍♂️ Cycling Benefits:</div>
              <ul className="text-muted-foreground space-y-1">
                <li>• 10x faster than walking</li>
                <li>• Excellent cardio exercise</li>
                <li>• Cost-effective transportation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Note */}
      <Card className="border-dashed">
        <CardContent className="pt-6 text-center">
          <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <h3 className="font-medium mb-2">Google Maps Integration</h3>
          <p className="text-sm text-muted-foreground">
            In production, this would integrate with Google Maps API for real-time route planning and navigation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GreenRoutesPage;