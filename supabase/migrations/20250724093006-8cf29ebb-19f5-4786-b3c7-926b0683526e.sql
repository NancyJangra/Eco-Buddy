-- Create user goals table
CREATE TABLE public.user_goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_value NUMERIC NOT NULL,
  current_value NUMERIC DEFAULT 0,
  unit TEXT NOT NULL DEFAULT 'kg',
  category TEXT NOT NULL DEFAULT 'carbon_reduction',
  target_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user activities table
CREATE TABLE public.user_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  activity_type TEXT NOT NULL,
  description TEXT NOT NULL,
  carbon_impact NUMERIC NOT NULL,
  points_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_goals
CREATE POLICY "Users can view their own goals" 
ON public.user_goals 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own goals" 
ON public.user_goals 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals" 
ON public.user_goals 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own goals" 
ON public.user_goals 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for user_activities
CREATE POLICY "Users can view their own activities" 
ON public.user_activities 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own activities" 
ON public.user_activities 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own activities" 
ON public.user_activities 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own activities" 
ON public.user_activities 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for updating timestamps
CREATE TRIGGER update_user_goals_updated_at
BEFORE UPDATE ON public.user_goals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to update user profile points and streak
CREATE OR REPLACE FUNCTION public.update_user_points_and_streak()
RETURNS TRIGGER AS $$
BEGIN
  -- Update total points in profiles table
  UPDATE public.profiles 
  SET 
    total_points = COALESCE(total_points, 0) + NEW.points_earned,
    updated_at = now()
  WHERE user_id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically update points when activities are added
CREATE TRIGGER update_points_on_activity
AFTER INSERT ON public.user_activities
FOR EACH ROW
EXECUTE FUNCTION public.update_user_points_and_streak();