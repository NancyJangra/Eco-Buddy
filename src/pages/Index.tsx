import { useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import ChatBot from "@/components/chat/ChatBot";
import DashboardWidgets from "@/components/dashboard/DashboardWidgets";
import GoalsPage from "@/components/pages/GoalsPage";
import LeaderboardPage from "@/components/pages/LeaderboardPage";
import NGOsPage from "@/components/pages/NGOsPage";
import GreenRoutesPage from "@/components/pages/GreenRoutesPage";
import ProfilePage from "@/components/pages/ProfilePage";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("goals");

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-eco-green mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to auth if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "goals":
        return <GoalsPage />;
      case "leaderboard":
        return <LeaderboardPage />;
      case "ngos":
        return <NGOsPage />;
      case "routes":
        return <GreenRoutesPage />;
      case "profile":
        return <ProfilePage />;
      default:
        return <GoalsPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-6">
        {activeTab === "goals" ? (
          // Dashboard layout for Goals page (AI Chat + Widgets + Content)
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <GoalsPage />
            </div>
            
            {/* Sidebar with Chat and Widgets */}
            <div className="lg:col-span-1 order-1 lg:order-2 space-y-6">
              <ChatBot />
              <DashboardWidgets />
            </div>
          </div>
        ) : (
          // Standard layout for other pages
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
