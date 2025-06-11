
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Target, Flame, Zap, Users } from "lucide-react";

interface WorkoutDashboardProps {
  user: any;
}

const WorkoutDashboard = ({ user }: WorkoutDashboardProps) => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const workoutCategories = [
    {
      id: "full-body",
      name: "Full Body",
      description: "Complete workout targeting all muscle groups",
      duration: "20-30 mins",
      difficulty: "Intermediate",
      icon: Users,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "chest",
      name: "Chest & Arms",
      description: "Upper body focus with push-up variations",
      duration: "15-20 mins",
      difficulty: "Beginner",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "abs",
      name: "Core & Abs",
      description: "Strengthen your core with targeted exercises",
      duration: "10-15 mins",
      difficulty: "All Levels",
      icon: Target,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "legs",
      name: "Legs & Glutes",
      description: "Lower body strength and toning",
      duration: "20-25 mins",
      difficulty: "Intermediate",
      icon: Flame,
      color: "from-orange-500 to-red-500",
    },
  ];

  const quickWorkouts = [
    { name: "Morning Energy", duration: "7 mins", type: "Full Body" },
    { name: "Lunch Break HIIT", duration: "12 mins", type: "HIIT" },
    { name: "Evening Stretch", duration: "10 mins", type: "Flexibility" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {user ? `Welcome back, ${user.name || "Fitness Warrior"}!` : "Ready to Get Fit?"}
        </h2>
        <p className="text-gray-600">Choose your workout and let's get moving!</p>
      </div>

      {/* Quick Stats */}
      {user && (
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100 border-0">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">7</div>
              <div className="text-sm text-blue-700">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 border-0">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">156</div>
              <div className="text-sm text-green-700">Workouts</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 border-0">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">42</div>
              <div className="text-sm text-purple-700">Hours</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Start */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Quick Start
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {quickWorkouts.map((workout, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div>
                  <div className="font-medium">{workout.name}</div>
                  <div className="text-sm text-gray-500">{workout.type}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {workout.duration}
                  </Badge>
                  <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workout Categories */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Workout Categories</h3>
        <div className="grid gap-4">
          {workoutCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedWorkout(category)}
              >
                <CardContent className="p-0">
                  <div className={`bg-gradient-to-r ${category.color} p-6 text-white rounded-t-lg`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xl font-bold">{category.name}</h4>
                        <p className="text-white/90 text-sm">{category.description}</p>
                      </div>
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {category.duration}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {category.difficulty}
                        </Badge>
                      </div>
                      <Button className="bg-gradient-to-r from-blue-500 to-purple-500">
                        Start Workout
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkoutDashboard;
