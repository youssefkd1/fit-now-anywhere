
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, User, BarChart3, Calendar, Settings, Dumbbell } from "lucide-react";
import UserProfile from "@/components/UserProfile";
import WorkoutDashboard from "@/components/WorkoutDashboard";
import ExerciseLibrary from "@/components/ExerciseLibrary";
import ProgressTracker from "@/components/ProgressTracker";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState(null);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Dumbbell },
    { id: "exercises", label: "Exercises", icon: Play },
    { id: "progress", label: "Progress", icon: BarChart3 },
    { id: "profile", label: "Profile", icon: User },
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "dashboard":
        return <WorkoutDashboard user={user} />;
      case "exercises":
        return <ExerciseLibrary />;
      case "progress":
        return <ProgressTracker user={user} />;
      case "profile":
        return <UserProfile user={user} setUser={setUser} />;
      default:
        return <WorkoutDashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">FitHome</h1>
              <p className="text-blue-100">No Equipment, No Excuses</p>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 pb-20">
        {renderActiveComponent()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-around items-center py-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
