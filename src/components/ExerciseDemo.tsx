
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, SkipForward, RotateCcw, Volume2, VolumeX } from "lucide-react";

interface Exercise {
  id: number;
  name: string;
  category: string;
  difficulty: string;
  duration: number; // in seconds
  targetMuscles: string[];
  description: string;
  instructions: string[];
  imageUrl: string;
}

interface ExerciseDemoProps {
  exercise: Exercise;
  onComplete: () => void;
  onSkip: () => void;
}

const ExerciseDemo = ({ exercise, onComplete, onSkip }: ExerciseDemoProps) => {
  const [timeLeft, setTimeLeft] = useState(exercise.duration);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, onComplete]);

  const handlePlayPause = () => {
    if (!isPlaying && timeLeft === 0) {
      setTimeLeft(exercise.duration);
    }
    setIsPlaying(!isPlaying);
    setIsPaused(!isPlaying);
  };

  const handleReset = () => {
    setTimeLeft(exercise.duration);
    setIsPlaying(false);
    setIsPaused(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((exercise.duration - timeLeft) / exercise.duration) * 100;

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
        <CardTitle className="text-center text-xl">{exercise.name}</CardTitle>
        <div className="text-center">
          <Badge variant="secondary" className="bg-white/20 text-white">
            {exercise.category} • {exercise.difficulty}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Exercise Image/Demo */}
        <div className="relative mb-6">
          <img
            src={`https://images.unsplash.com/${exercise.imageUrl}?w=400&h=300&fit=crop`}
            alt={exercise.name}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-4xl font-bold mb-2">{formatTime(timeLeft)}</div>
              <div className="w-32 h-2 bg-white/30 rounded-full mx-auto">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Exercise Description */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm mb-3">{exercise.description}</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {exercise.targetMuscles.map((muscle, index) => (
              <span
                key={index}
                className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
              >
                {muscle}
              </span>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Instructions:</h4>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
            {exercise.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={handleReset}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>

          <Button
            onClick={handlePlayPause}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            size="lg"
          >
            {isPlaying ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
            {isPlaying ? "Pause" : timeLeft === 0 ? "Start Again" : "Start"}
          </Button>

          <Button
            variant="outline"
            onClick={onSkip}
          >
            <SkipForward className="h-4 w-4 mr-2" />
            Skip
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExerciseDemo;
