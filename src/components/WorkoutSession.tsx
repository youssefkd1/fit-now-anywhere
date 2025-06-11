
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { X, Trophy, Flame } from "lucide-react";
import ExerciseDemo from "./ExerciseDemo";

interface Exercise {
  id: number;
  name: string;
  category: string;
  difficulty: string;
  duration: number;
  targetMuscles: string[];
  description: string;
  instructions: string[];
  imageUrl: string;
}

interface WorkoutSessionProps {
  workoutName: string;
  exercises: Exercise[];
  user: any;
  onComplete: (workoutData: any) => void;
  onExit: () => void;
}

const WorkoutSession = ({ workoutName, exercises, user, onComplete, onExit }: WorkoutSessionProps) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [isResting, setIsResting] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(30); // 30 seconds rest

  useEffect(() => {
    if (!startTime) {
      setStartTime(new Date());
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isResting && restTimeLeft > 0) {
      interval = setInterval(() => {
        setRestTimeLeft((prev) => {
          if (prev <= 1) {
            setIsResting(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isResting, restTimeLeft]);

  const calculateCalories = (duration: number, userWeight: number) => {
    // Basic calorie calculation: METs value * weight * time
    // Average bodyweight exercises: 3-6 METs
    const metsValue = 4.5;
    const hours = duration / 3600; // convert seconds to hours
    return Math.round(metsValue * userWeight * hours);
  };

  const handleExerciseComplete = () => {
    const newCompleted = [...completedExercises, exercises[currentExerciseIndex].id];
    setCompletedExercises(newCompleted);

    if (currentExerciseIndex < exercises.length - 1) {
      setIsResting(true);
      setRestTimeLeft(30);
    } else {
      // Workout complete
      completeWorkout();
    }
  };

  const handleSkipExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      completeWorkout();
    }
  };

  const handleRestComplete = () => {
    setIsResting(false);
    setCurrentExerciseIndex(currentExerciseIndex + 1);
  };

  const completeWorkout = () => {
    const endTime = new Date();
    const duration = startTime ? Math.round((endTime.getTime() - startTime.getTime()) / 1000) : 0;
    const totalCalories = exercises.reduce((total, exercise) => {
      return total + calculateCalories(exercise.duration, user?.weight || 70);
    }, 0);

    const workoutData = {
      name: workoutName,
      date: endTime.toISOString(),
      duration,
      exercisesCompleted: completedExercises.length,
      totalExercises: exercises.length,
      caloriesEstimated: totalCalories,
      exercises: exercises.map(ex => ({
        id: ex.id,
        name: ex.name,
        completed: completedExercises.includes(ex.id)
      }))
    };

    onComplete(workoutData);
  };

  const progress = (completedExercises.length / exercises.length) * 100;
  const currentExercise = exercises[currentExerciseIndex];

  if (isResting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="text-6xl font-bold text-blue-600 mb-2">{restTimeLeft}</div>
              <div className="text-gray-600">Rest Time</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${((30 - restTimeLeft) / 30) * 100}%` }}
              />
            </div>
            <div className="text-sm text-gray-500 mb-4">
              Next: {exercises[currentExerciseIndex + 1]?.name || "Workout Complete!"}
            </div>
            <Button onClick={handleRestComplete} className="w-full">
              Skip Rest
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">{workoutName}</h1>
          <Button variant="ghost" size="icon" onClick={onExit} className="text-white hover:bg-white/20">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Exercise {currentExerciseIndex + 1} of {exercises.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Exercise Demo */}
      <div className="container mx-auto px-4 py-6">
        {currentExercise && (
          <ExerciseDemo
            exercise={currentExercise}
            onComplete={handleExerciseComplete}
            onSkip={handleSkipExercise}
          />
        )}

        {/* Upcoming Exercises */}
        {currentExerciseIndex < exercises.length - 1 && (
          <Card className="mt-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Up Next</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {exercises.slice(currentExerciseIndex + 1, currentExerciseIndex + 4).map((exercise, index) => (
                  <div key={exercise.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="font-medium">{exercise.name}</span>
                    <Badge variant="outline">{exercise.duration}s</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WorkoutSession;
