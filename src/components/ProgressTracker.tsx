import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, Award, Target, Flame, Clock } from "lucide-react";

interface ProgressTrackerProps {
  user: any;
}

const ProgressTracker = ({ user }: ProgressTrackerProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [userStats, setUserStats] = useState(() => {
    const saved = localStorage.getItem('userStats');
    return saved ? JSON.parse(saved) : {
      totalWorkouts: 0,
      totalTime: 0,
      currentStreak: 0,
      totalCalories: 0,
      completedWorkouts: []
    };
  });

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const calculateAverageWorkoutTime = () => {
    if (userStats.totalWorkouts === 0) return "0m";
    const avgSeconds = userStats.totalTime / userStats.totalWorkouts;
    return formatTime(Math.round(avgSeconds));
  };

  const getLongestStreak = () => {
    // This would typically be calculated from workout dates
    // For now, we'll use current streak as longest
    return Math.max(userStats.currentStreak, 0);
  };

  const stats = {
    totalWorkouts: userStats.totalWorkouts,
    totalTime: formatTime(userStats.totalTime),
    currentStreak: userStats.currentStreak,
    longestStreak: getLongestStreak(),
    caloriesBurned: userStats.totalCalories,
    averageWorkoutTime: calculateAverageWorkoutTime(),
  };

  const recentWorkouts = userStats.completedWorkouts.slice(-4).reverse().map((workout: any, index: number) => ({
    id: index,
    name: workout.name,
    date: new Date(workout.date).toLocaleDateString(),
    duration: formatTime(workout.duration),
    exercises: workout.exercisesCompleted,
    calories: workout.caloriesEstimated,
    completed: true,
  }));

  // Generate weekly data from completed workouts
  const generateWeeklyData = () => {
    const today = new Date();
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weekData = weekDays.map(day => ({ day, workouts: 0, duration: 0 }));

    userStats.completedWorkouts.forEach((workout: any) => {
      const workoutDate = new Date(workout.date);
      const daysDiff = Math.floor((today.getTime() - workoutDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff >= 0 && daysDiff < 7) {
        const dayIndex = (today.getDay() + 6 - daysDiff) % 7; // Convert to Monday-first week
        if (dayIndex >= 0 && dayIndex < 7) {
          weekData[dayIndex].workouts += 1;
          weekData[dayIndex].duration += Math.round(workout.duration / 60); // Convert to minutes
        }
      }
    });

    return weekData;
  };

  const weeklyData = generateWeeklyData();

  const achievements = [
    {
      name: "First Workout",
      description: "Complete your first workout",
      icon: "🎯",
      unlocked: userStats.totalWorkouts >= 1,
    },
    {
      name: "Consistency King",
      description: "5-day workout streak",
      icon: "👑",
      unlocked: userStats.currentStreak >= 5,
    },
    {
      name: "Calorie Crusher",
      description: "Burn 500 calories",
      icon: "🔥",
      unlocked: userStats.totalCalories >= 500,
    },
    {
      name: "Time Master",
      description: "Complete 2 hours of workouts",
      icon: "⏰",
      unlocked: userStats.totalTime >= 7200, // 2 hours in seconds
    },
    {
      name: "Workout Warrior",
      description: "Complete 10 workouts",
      icon: "💪",
      unlocked: userStats.totalWorkouts >= 10,
    },
    {
      name: "Marathon Mindset",
      description: "Burn 1000 calories total",
      icon: "🏃‍♂️",
      unlocked: userStats.totalCalories >= 1000,
    },
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
      {recentWorkouts.length > 0 && (
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
      )}

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
