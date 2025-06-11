
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Flame, Clock, Target, Share2 } from "lucide-react";

interface WorkoutCompleteProps {
  workoutData: any;
  onContinue: () => void;
}

const WorkoutComplete = ({ workoutData, onContinue }: WorkoutCompleteProps) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const shareWorkout = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Workout Complete!',
        text: `Just completed "${workoutData.name}" - ${workoutData.exercisesCompleted}/${workoutData.totalExercises} exercises, ${workoutData.caloriesEstimated} calories burned in ${formatDuration(workoutData.duration)}!`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
          <Trophy className="h-16 w-16 mx-auto mb-4" />
          <CardTitle className="text-2xl">Workout Complete!</CardTitle>
          <p className="text-green-100">Amazing job! You crushed it!</p>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{workoutData.name}</h3>
            <Badge className="bg-green-100 text-green-800">
              {workoutData.exercisesCompleted}/{workoutData.totalExercises} Exercises Completed
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">{workoutData.caloriesEstimated}</div>
              <div className="text-sm text-orange-700">Calories</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{formatDuration(workoutData.duration)}</div>
              <div className="text-sm text-blue-700">Duration</div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <h4 className="font-medium text-gray-900">Exercises Completed:</h4>
            {workoutData.exercises.map((exercise: any, index: number) => (
              <div key={exercise.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">{exercise.name}</span>
                {exercise.completed ? (
                  <Badge className="bg-green-100 text-green-800 text-xs">✓ Done</Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">Skipped</Badge>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <Button onClick={onContinue} className="w-full bg-gradient-to-r from-green-500 to-emerald-500">
              Continue
            </Button>
            
            <Button 
              variant="outline" 
              onClick={shareWorkout}
              className="w-full"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Achievement
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutComplete;
