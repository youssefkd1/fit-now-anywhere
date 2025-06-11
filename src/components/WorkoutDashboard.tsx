
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Target, Flame, Zap, Users } from "lucide-react";
import WorkoutSession from "./WorkoutSession";
import WorkoutComplete from "./WorkoutComplete";

interface WorkoutDashboardProps {
  user: any;
}

const WorkoutDashboard = ({ user }: WorkoutDashboardProps) => {
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [workoutComplete, setWorkoutComplete] = useState<any>(null);
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

  // Generate personalized exercises based on user data
  const generateExercises = (category: string, userLevel: string = 'intermediate') => {
    const baseExercises = {
      'full-body': [
        {
          id: 1,
          name: "Jumping Jacks",
          category: "Full Body",
          difficulty: "Beginner",
          duration: 30,
          targetMuscles: ["Cardio", "Legs", "Arms"],
          description: "Full-body cardio exercise to warm up",
          instructions: [
            "Stand with feet together, arms at sides",
            "Jump while spreading legs shoulder-width apart",
            "Simultaneously raise arms overhead",
            "Jump back to starting position",
            "Maintain steady rhythm"
          ],
          imageUrl: "photo-1571019613454-1cb2f99b2d8b"
        },
        {
          id: 2,
          name: "Push-ups",
          category: "Chest",
          difficulty: userLevel === 'beginner' ? "Knee Push-ups" : "Standard",
          duration: user?.weight > 80 ? 45 : 30,
          targetMuscles: ["Chest", "Triceps", "Shoulders"],
          description: "Upper body strength exercise",
          instructions: [
            "Start in plank position",
            "Lower body until chest nearly touches floor",
            "Push back up to starting position",
            "Keep core engaged throughout",
            "Maintain straight line from head to heels"
          ],
          imageUrl: "photo-1571019613454-1cb2f99b2d8b"
        },
        {
          id: 3,
          name: "Squats",
          category: "Legs",
          difficulty: "Intermediate",
          duration: user?.height > 170 ? 40 : 35,
          targetMuscles: ["Quadriceps", "Glutes", "Hamstrings"],
          description: "Lower body strength exercise",
          instructions: [
            "Stand with feet shoulder-width apart",
            "Lower hips back and down as if sitting",
            "Keep chest up and knees behind toes",
            "Lower until thighs parallel to floor",
            "Push through heels to return to start"
          ],
          imageUrl: "photo-1571019613454-1cb2f99b2d8b"
        }
      ],
      'chest': [
        {
          id: 4,
          name: "Standard Push-ups",
          category: "Chest",
          difficulty: "Intermediate",
          duration: user?.weight > 80 ? 40 : 30,
          targetMuscles: ["Chest", "Triceps", "Shoulders"],
          description: "Classic chest exercise",
          instructions: [
            "Start in plank position",
            "Lower chest to floor",
            "Push back up",
            "Keep core tight"
          ],
          imageUrl: "photo-1571019613454-1cb2f99b2d8b"
        }
      ]
    };

    return baseExercises[category] || baseExercises['full-body'];
  };

  const workoutCategories = [
    {
      id: "full-body",
      name: "Full Body",
      description: "Complete workout targeting all muscle groups",
      duration: "20-30 mins",
      difficulty: "Intermediate",
      icon: Users,
      color: "from-green-500 to-emerald-500",
      exercises: generateExercises('full-body', user?.fitnessLevel)
    },
    {
      id: "chest",
      name: "Chest & Arms",
      description: "Upper body focus with push-up variations",
      duration: "15-20 mins",
      difficulty: "Beginner",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      exercises: generateExercises('chest', user?.fitnessLevel)
    },
    {
      id: "abs",
      name: "Core & Abs",
      description: "Strengthen your core with targeted exercises",
      duration: "10-15 mins",
      difficulty: "All Levels",
      icon: Target,
      color: "from-purple-500 to-pink-500",
      exercises: generateExercises('full-body', user?.fitnessLevel).filter(ex => 
        ex.targetMuscles.some(muscle => muscle.toLowerCase().includes('core') || muscle.toLowerCase().includes('abs'))
      )
    },
    {
      id: "legs",
      name: "Legs & Glutes",
      description: "Lower body strength and toning",
      duration: "20-25 mins",
      difficulty: "Intermediate",
      icon: Flame,
      color: "from-orange-500 to-red-500",
      exercises: generateExercises('full-body', user?.fitnessLevel).filter(ex => 
        ex.targetMuscles.some(muscle => 
          muscle.toLowerCase().includes('leg') || 
          muscle.toLowerCase().includes('glute') || 
          muscle.toLowerCase().includes('quad')
        )
      )
    },
  ];

  const quickWorkouts = [
    { 
      name: "Morning Energy", 
      duration: "7 mins", 
      type: "Full Body",
      exercises: generateExercises('full-body', user?.fitnessLevel).slice(0, 2)
    },
    { 
      name: "Lunch Break HIIT", 
      duration: "12 mins", 
      type: "HIIT",
      exercises: generateExercises('full-body', user?.fitnessLevel)
    },
    { 
      name: "Evening Stretch", 
      duration: "10 mins", 
      type: "Flexibility",
      exercises: generateExercises('full-body', user?.fitnessLevel).slice(0, 1)
    },
  ];

  const handleWorkoutComplete = (workoutData: any) => {
    // Update user stats
    const newStats = {
      ...userStats,
      totalWorkouts: userStats.totalWorkouts + 1,
      totalTime: userStats.totalTime + workoutData.duration,
      totalCalories: userStats.totalCalories + workoutData.caloriesEstimated,
      completedWorkouts: [...userStats.completedWorkouts, workoutData],
      currentStreak: userStats.currentStreak + 1
    };
    
    setUserStats(newStats);
    localStorage.setItem('userStats', JSON.stringify(newStats));
    
    setCurrentSession(null);
    setWorkoutComplete(workoutData);
  };

  const startWorkout = (workout: any) => {
    setCurrentSession({
      name: workout.name,
      exercises: workout.exercises,
      user
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  if (workoutComplete) {
    return (
      <WorkoutComplete
        workoutData={workoutComplete}
        onContinue={() => setWorkoutComplete(null)}
      />
    );
  }

  if (currentSession) {
    return (
      <WorkoutSession
        workoutName={currentSession.name}
        exercises={currentSession.exercises}
        user={user}
        onComplete={handleWorkoutComplete}
        onExit={() => setCurrentSession(null)}
      />
    );
  }

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
              <div className="text-2xl font-bold text-blue-600">{userStats.currentStreak}</div>
              <div className="text-sm text-blue-700">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 border-0">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{userStats.totalWorkouts}</div>
              <div className="text-sm text-green-700">Workouts</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 border-0">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">{formatTime(userStats.totalTime)}</div>
              <div className="text-sm text-purple-700">Total Time</div>
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
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-blue-500 to-purple-500"
                    onClick={() => startWorkout(workout)}
                  >
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
                      <Button 
                        className="bg-gradient-to-r from-blue-500 to-purple-500"
                        onClick={() => startWorkout(category)}
                      >
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
