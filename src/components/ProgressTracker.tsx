
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, Award, Target, Flame, Clock } from "lucide-react";

interface ProgressTrackerProps {
  user: any;
}

const ProgressTracker = ({ user }: ProgressTrackerProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const stats = {
    totalWorkouts: 42,
    totalTime: "14.5 hours",
    currentStreak: 7,
    longestStreak: 12,
    caloriesBurned: 2340,
    averageWorkoutTime: "21 mins",
  };

  const recentWorkouts = [
    {
      id: 1,
      name: "Morning Full Body",
      date: "2024-01-15",
      duration: "25 mins",
      exercises: 8,
      calories: 180,
      completed: true,
    },
    {
      id: 2,
      name: "Core Blast",
      date: "2024-01-14",
      duration: "15 mins",
      exercises: 6,
      calories: 120,
      completed: true,
    },
    {
      id: 3,
      name: "HIIT Cardio",
      date: "2024-01-13",
      duration: "20 mins",
      exercises: 7,
      calories: 200,
      completed: true,
    },
    {
      id: 4,
      name: "Upper Body",
      date: "2024-01-12",
      duration: "30 mins",
      exercises: 10,
      calories: 210,
      completed: true,
    },
  ];

  const achievements = [
    {
      name: "First Week",
      description: "Complete 7 workouts",
      icon: "🎯",
      unlocked: true,
    },
    {
      name: "Consistency King",
      description: "10-day workout streak",
      icon: "👑",
      unlocked: false,
    },
    {
      name: "Calorie Crusher",
      description: "Burn 1000 calories",
      icon: "🔥",
      unlocked: true,
    },
    {
      name: "Time Master",
      description: "Complete 10 hours of workouts",
      icon: "⏰",
      unlocked: true,
    },
  ];

  const weeklyData = [
    { day: "Mon", workouts: 1, duration: 25 },
    { day: "Tue", workouts: 1, duration: 20 },
    { day: "Wed", workouts: 0, duration: 0 },
    { day: "Thu", workouts: 1, duration: 30 },
    { day: "Fri", workouts: 1, duration: 15 },
    { day: "Sat", workouts: 2, duration: 45 },
    { day: "Sun", workouts: 1, duration: 20 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Progress Tracker</h2>
        <p className="text-gray-600">Track your fitness journey and celebrate achievements</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100 border-0">
          <CardContent className="p-4">
            <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{stats.totalWorkouts}</div>
            <div className="text-sm text-blue-700">Total Workouts</div>
          </CardContent>
        </Card>

        <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 border-0">
          <CardContent className="p-4">
            <Flame className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{stats.currentStreak}</div>
            <div className="text-sm text-green-700">Day Streak</div>
          </CardContent>
        </Card>

        <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 border-0">
          <CardContent className="p-4">
            <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{stats.totalTime}</div>
            <div className="text-sm text-purple-700">Total Time</div>
          </CardContent>
        </Card>

        <Card className="text-center bg-gradient-to-br from-orange-50 to-orange-100 border-0">
          <CardContent className="p-4">
            <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">{stats.caloriesBurned}</div>
            <div className="text-sm text-orange-700">Calories Burned</div>
          </CardContent>
        </Card>

        <Card className="text-center bg-gradient-to-br from-pink-50 to-pink-100 border-0">
          <CardContent className="p-4">
            <Award className="h-8 w-8 text-pink-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-pink-600">{stats.longestStreak}</div>
            <div className="text-sm text-pink-700">Longest Streak</div>
          </CardContent>
        </Card>

        <Card className="text-center bg-gradient-to-br from-indigo-50 to-indigo-100 border-0">
          <CardContent className="p-4">
            <Calendar className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-indigo-600">{stats.averageWorkoutTime}</div>
            <div className="text-sm text-indigo-700">Avg Duration</div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity Chart */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Weekly Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weeklyData.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-500 mb-2">{day.day}</div>
                <div
                  className={`w-full h-16 rounded-lg flex items-end justify-center text-white text-xs font-bold ${
                    day.workouts > 0
                      ? "bg-gradient-to-t from-blue-500 to-blue-400"
                      : "bg-gray-200"
                  }`}
                  style={{
                    backgroundSize: `100% ${Math.max(20, (day.duration / 50) * 100)}%`,
                  }}
                >
                  {day.workouts > 0 && (
                    <div className="pb-1">
                      {day.workouts}
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">{day.duration}m</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Workouts */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Recent Workouts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="font-medium">{workout.name}</div>
                  <div className="text-sm text-gray-500">
                    {workout.date} • {workout.exercises} exercises
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{workout.duration}</div>
                  <div className="text-sm text-gray-500">{workout.calories} cal</div>
                </div>
                <Badge className="ml-2 bg-green-100 text-green-800">
                  ✓ Done
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.unlocked
                    ? "border-yellow-300 bg-yellow-50"
                    : "border-gray-200 bg-gray-50 opacity-60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className={`font-medium ${achievement.unlocked ? "text-yellow-800" : "text-gray-600"}`}>
                      {achievement.name}
                    </div>
                    <div className="text-sm text-gray-600">{achievement.description}</div>
                  </div>
                  {achievement.unlocked && (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      Unlocked!
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracker;
