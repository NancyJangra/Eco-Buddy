import { useState, useEffect } from "react";
import { User, Camera, Edit3, Heart, MessageCircle, Share, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ProfileEditor from "@/components/profile/ProfileEditor";

const ProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    display_name: "",
    bio: "",
    avatar_url: "",
    badge_level: "Bronze Eco-Warrior",
    total_points: 1250,
    streak: 7,
    achievements: ["First Goal Completed", "Week Streak", "Community Contributor"]
  });
  
  const [posts, setPosts] = useState([
    {
      id: "1",
      content: "Just completed a 5km bike ride to work! Saved 2.3kg of CO₂ emissions today. 🚴‍♀️ #EcoCommute",
      image: null,
      timestamp: "2 hours ago",
      likes: 12,
      comments: 3,
      isLiked: false
    },
    {
      id: "2",
      content: "Started my weekly meal prep with 100% plant-based ingredients. Small changes, big impact! 🌱",
      image: null,
      timestamp: "1 day ago", 
      likes: 8,
      comments: 2,
      isLiked: true
    },
    {
      id: "3",
      content: "Attended an amazing tree planting event with Green Earth Initiative. We planted 50 trees! 🌳",
      image: null,
      timestamp: "3 days ago",
      likes: 24,
      comments: 7,
      isLiked: true
    }
  ]);

  const [followingFeed] = useState([
    {
      id: "1",
      author: "EcoWarrior",
      authorInitials: "EW",
      content: "Just hit my monthly goal of cycling to work 15 times! The environment and my health thank me. 💪",
      timestamp: "4 hours ago",
      likes: 45,
      comments: 12
    },
    {
      id: "2", 
      author: "GreenThumb",
      authorInitials: "GT",
      content: "Started composting at home. Week 1 and I've already reduced my food waste by 70%! 🗂️",
      timestamp: "1 day ago",
      likes: 32,
      comments: 8
    }
  ]);

  const [newPost, setNewPost] = useState("");
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setUserProfile({
          display_name: data.display_name || user.user_metadata?.display_name || "User",
          bio: data.bio || "Passionate about sustainable living and making a positive environmental impact. 🌱",
          avatar_url: data.avatar_url || "",
          badge_level: data.badge_level || "Bronze Eco-Warrior",
          total_points: data.total_points || 1250,
          streak: data.streak || 7,
          achievements: ["First Goal Completed", "Week Streak", "Community Contributor"]
        });
      } else {
        setUserProfile(prev => ({
          ...prev,
          display_name: user.user_metadata?.display_name || "User"
        }));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load profile data."
      });
    }
  };

  const handleProfileUpdate = (updatedProfile: any) => {
    setUserProfile(prev => ({
      ...prev,
      ...updatedProfile
    }));
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now().toString(),
        content: newPost,
        image: null,
        timestamp: "Just now",
        likes: 0,
        comments: 0,
        isLiked: false
      };
      setPosts([post, ...posts]);
      setNewPost("");
      setIsCreatePostOpen(false);
    }
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={userProfile.avatar_url} />
                <AvatarFallback className="text-2xl font-bold bg-eco-green text-white">
                  {userProfile.display_name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex-1 space-y-3">
              <div>
                <h1 className="text-2xl font-bold">{userProfile.display_name}</h1>
                <Badge className="bg-bronze text-white mt-1">
                  {userProfile.badge_level}
                </Badge>
              </div>
              
              <p className="text-muted-foreground">{userProfile.bio}</p>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-eco-green">{userProfile.total_points}</div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-eco-green">{userProfile.streak}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-eco-green">{userProfile.achievements.length}</div>
                  <div className="text-sm text-muted-foreground">Achievements</div>
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="shrink-0"
              onClick={() => setIsEditProfileOpen(true)}
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {userProfile.achievements.map((achievement, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                🏆 {achievement}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Posts and Feed Tabs */}
      <Tabs defaultValue="my-posts" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-posts">My Posts</TabsTrigger>
          <TabsTrigger value="following">Following Feed</TabsTrigger>
        </TabsList>
        
        {/* My Posts Tab */}
        <TabsContent value="my-posts" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">My Posts</h2>
            <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
              <DialogTrigger asChild>
                <Button className="bg-eco-green hover:bg-eco-green-dark">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Post</DialogTitle>
                  <DialogDescription>
                    Share your eco-friendly activities with the community
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Textarea
                    placeholder="What eco-friendly action did you take today?"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    rows={4}
                  />
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <Camera className="h-4 w-4 mr-2" />
                      Add Photo
                    </Button>
                    <Button onClick={handleCreatePost} className="flex-1 bg-eco-green hover:bg-eco-green-dark">
                      Post
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={userProfile.avatar_url} />
                        <AvatarFallback className="bg-eco-green text-white text-xs">
                          {userProfile.display_name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{userProfile.display_name}</div>
                        <div className="text-sm text-muted-foreground">{post.timestamp}</div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <p className="mb-4">{post.content}</p>
                  
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={post.isLiked ? "text-red-500" : ""}
                    >
                      <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Following Feed Tab */}
        <TabsContent value="following" className="space-y-4">
          <h2 className="text-xl font-semibold">Following Feed</h2>
          
          <div className="space-y-4">
            {followingFeed.map((post) => (
              <Card key={post.id}>
                <CardContent className="pt-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-lavender text-white text-xs">
                        {post.authorInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{post.author}</div>
                      <div className="text-sm text-muted-foreground">{post.timestamp}</div>
                    </div>
                  </div>
                  
                  <p className="mb-4">{post.content}</p>
                  
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <ProfileEditor
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        onProfileUpdate={handleProfileUpdate}
      />
    </div>
  );
};

export default ProfilePage;