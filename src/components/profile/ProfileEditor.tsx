import { useState, useEffect } from "react";
import { Camera, Edit3, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ProfileData {
  display_name: string;
  bio: string;
  avatar_url?: string;
  badge_level: string;
  total_points: number;
  streak: number;
}

interface ProfileEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileUpdate: (profile: ProfileData) => void;
}

const ProfileEditor = ({ isOpen, onClose, onProfileUpdate }: ProfileEditorProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState<ProfileData>({
    display_name: "",
    bio: "",
    avatar_url: "",
    badge_level: "Bronze Eco-Warrior",
    total_points: 0,
    streak: 0
  });

  useEffect(() => {
    if (user && isOpen) {
      fetchProfile();
    }
  }, [user, isOpen]);

  const fetchProfile = async () => {
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
        setFormData({
          display_name: data.display_name || "",
          bio: data.bio || "",
          avatar_url: data.avatar_url || "",
          badge_level: data.badge_level || "Bronze Eco-Warrior",
          total_points: data.total_points || 0,
          streak: data.streak || 0
        });
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

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(fileName);

      setFormData(prev => ({ ...prev, avatar_url: publicUrl }));
      
      toast({
        title: "Image uploaded successfully",
        description: "Your profile picture has been updated."
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "Failed to upload profile picture."
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          display_name: formData.display_name,
          bio: formData.bio,
          avatar_url: formData.avatar_url,
          badge_level: formData.badge_level,
          total_points: formData.total_points,
          streak: formData.streak
        });

      if (error) throw error;

      onProfileUpdate(formData);
      onClose();
      
      toast({
        title: "Profile updated",
        description: "Your profile has been saved successfully."
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        variant: "destructive",
        title: "Save failed",
        description: "Failed to save profile changes."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Edit3 className="h-5 w-5" />
            <span>Edit Profile</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={formData.avatar_url} />
                <AvatarFallback className="text-2xl font-bold bg-eco-green text-white">
                  {formData.display_name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2">
                <Button
                  size="sm"
                  className="h-8 w-8 rounded-full p-0 bg-eco-green hover:bg-eco-green-dark"
                  disabled={uploading}
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                >
                  <Camera className="h-4 w-4" />
                </Button>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </div>
            </div>
            {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="display-name">Display Name</Label>
              <Input
                id="display-name"
                value={formData.display_name}
                onChange={(e) => setFormData(prev => ({ ...prev, display_name: e.target.value }))}
                placeholder="Your display name"
              />
            </div>
            
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell us about your eco journey..."
                rows={3}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-eco-green hover:bg-eco-green-dark"
              disabled={loading}
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditor;