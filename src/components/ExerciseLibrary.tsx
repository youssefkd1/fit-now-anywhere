
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Play, Clock, Target, Filter } from "lucide-react";

const ExerciseLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const exercises = [
    {
      id: 1,
      name: "Push-ups",
      category: "Chest",
      difficulty: "Beginner",
      duration: "30 seconds",
      targetMuscles: ["Chest", "Triceps", "Shoulders"],
      description: "Classic upper body exercise targeting chest and arms",
      noEquipment: true,
    },
    {
      id: 2,
      name: "Squats",
      category: "Legs",
      difficulty: "Beginner",
      duration: "45 seconds",
      targetMuscles: ["Quadriceps", "Glutes", "Hamstrings"],
      description: "Fundamental lower body exercise for strength and mobility",
      noEquipment: true,
    },
    {
      id: 3,
      name: "Plank",
      category: "Abs",
      difficulty: "Intermediate",
      duration: "60 seconds",
      targetMuscles: ["Core", "Abs", "Back"],
      description: "Isometric exercise for core stability and strength",
      noEquipment: true,
    },
    {
      id: 4,
      name: "Mountain Climbers",
      category: "Full Body",
      difficulty: "Intermediate",
      duration: "30 seconds",
      targetMuscles: ["Core", "Legs", "Cardio"],
      description: "High-intensity cardio exercise engaging multiple muscle groups",
      noEquipment: true,
    },
    {
      id: 5,
      name: "Burpees",
      category: "Full Body",
      difficulty: "Advanced",
      duration: "20 seconds",
      targetMuscles: ["Full Body", "Cardio"],
      description: "Full-body explosive exercise for maximum calorie burn",
      noEquipment: true,
    },
    {
      id: 6,
      name: "Lunges",
      category: "Legs",
      difficulty: "Beginner",
      duration: "40 seconds",
      targetMuscles: ["Quadriceps", "Glutes", "Calves"],
      description: "Single-leg exercise for lower body strength and balance",
      noEquipment: true,
    },
  ];

  const categories = ["all", "Chest", "Legs", "Abs", "Full Body", "Arms"];
  const difficulties = ["all", "Beginner", "Intermediate", "Advanced"];

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || exercise.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || exercise.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Exercise Library</h2>
        <p className="text-gray-600">Discover exercises for every muscle group</p>
      </div>

      {/* Filters */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Category & Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Difficulty</label>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty === "all" ? "All Levels" : difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exercise Grid */}
      <div className="grid gap-4">
        {filteredExercises.map((exercise) => (
          <Card key={exercise.id} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{exercise.name}</h3>
                    <Badge className={getDifficultyColor(exercise.difficulty)}>
                      {exercise.difficulty}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{exercise.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      <Target className="h-3 w-3 mr-1" />
                      {exercise.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {exercise.duration}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-1">
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

                <div className="flex flex-col gap-2">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    <Play className="h-4 w-4 mr-2" />
                    Watch Demo
                  </Button>
                  <Button variant="outline" size="sm">
                    Add to Workout
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No exercises found matching your criteria.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSelectedDifficulty("all");
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExerciseLibrary;
