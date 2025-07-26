import { Calendar, MapPin, Users, Heart, ExternalLink, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const NGOsPage = () => {
  const upcomingEvents = [
    {
      id: "1",
      title: "Community Tree Planting",
      date: "March 15, 2024",
      time: "9:00 AM",
      location: "Central Park",
      organizer: "Green Earth Initiative",
      participants: 45,
      maxParticipants: 50,
      description: "Join us for a community tree planting event to help restore our local ecosystem."
    },
    {
      id: "2", 
      title: "Beach Cleanup Drive",
      date: "March 20, 2024",
      time: "2:00 PM",
      location: "Sunset Beach",
      organizer: "Ocean Guardians",
      participants: 28,
      maxParticipants: 40,
      description: "Help clean our beautiful beaches and protect marine life."
    },
    {
      id: "3",
      title: "Climate Action Workshop", 
      date: "March 25, 2024",
      time: "6:00 PM",
      location: "Community Center",
      organizer: "Climate Warriors",
      participants: 12,
      maxParticipants: 30,
      description: "Learn practical steps to reduce your carbon footprint in daily life."
    }
  ];

  const ngos = [
    {
      id: "1",
      name: "Green Earth Initiative",
      logo: "GE",
      mission: "Promoting sustainable living through community engagement and environmental education.",
      campaigns: ["Tree Planting", "Green Energy", "Waste Reduction"],
      followers: 1250,
      verified: true
    },
    {
      id: "2",
      name: "Ocean Guardians", 
      logo: "OG",
      mission: "Protecting marine ecosystems through conservation efforts and awareness campaigns.",
      campaigns: ["Ocean Cleanup", "Marine Protection", "Plastic Free"],
      followers: 890,
      verified: true
    },
    {
      id: "3",
      name: "Climate Warriors",
      logo: "CW", 
      mission: "Empowering individuals and communities to take action against climate change.",
      campaigns: ["Carbon Reduction", "Renewable Energy", "Climate Education"],
      followers: 2100,
      verified: true
    },
    {
      id: "4",
      name: "Sustainable Future",
      logo: "SF",
      mission: "Building sustainable communities through innovative environmental solutions.",
      campaigns: ["Sustainable Agriculture", "Water Conservation", "Green Building"],
      followers: 756,
      verified: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center space-x-2">
          <Users className="h-8 w-8 text-eco-green" />
          <span>NGOs & Events</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Connect with environmental organizations and join community events
        </p>
      </div>

      {/* Upcoming Events */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-eco-green" />
          <span>Upcoming Events</span>
        </h2>
        
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-4 min-w-max">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="w-80 shrink-0">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{event.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        by {event.organizer}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {event.participants}/{event.maxParticipants}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{event.participants} participants</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-eco-green hover:bg-eco-green-dark"
                    >
                      Join Event
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* NGO Profiles */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <Heart className="h-5 w-5 text-eco-green" />
          <span>Environmental Organizations</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ngos.map((ngo) => (
            <Card key={ngo.id}>
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-eco-green text-white font-bold">
                      {ngo.logo}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{ngo.name}</CardTitle>
                      {ngo.verified && (
                        <Badge className="text-xs bg-eco-green">
                          ✓ Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{ngo.followers.toLocaleString()} followers</span>
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {ngo.mission}
                </p>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">Active Campaigns:</div>
                  <div className="flex flex-wrap gap-1">
                    {ngo.campaigns.map((campaign, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {campaign}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Follow
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-eco-green hover:bg-eco-green-dark"
                  >
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-eco-green/10 to-eco-green-light/10 border-eco-green/20">
        <CardContent className="pt-6 text-center space-y-4">
          <h3 className="text-lg font-semibold">Want to list your organization?</h3>
          <p className="text-sm text-muted-foreground">
            Join our platform to connect with eco-conscious individuals and grow your impact.
          </p>
          <Button className="bg-eco-green hover:bg-eco-green-dark">
            Register Your NGO
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NGOsPage;