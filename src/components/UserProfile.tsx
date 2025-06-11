
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { User, Target, Activity } from "lucide-react";

interface UserProfileProps {
  user: any;
  setUser: (user: any) => void;
}

const UserProfile = ({ user, setUser }: UserProfileProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(
    user || {
      age: "",
      gender: "",
      weight: "",
      height: "",
      fitnessLevel: "",
      goal: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(formData);
    localStorage.setItem("userProfile", JSON.stringify(formData));
    toast({
      title: "Profile Updated!",
      description: "Your fitness profile has been saved successfully.",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Fitness Profile</h2>
        <p className="text-gray-600">Tell us about yourself to get personalized workouts</p>
      </div>

      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  placeholder="Enter your age"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  placeholder="Enter your weight"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  placeholder="Enter your height"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Fitness Level */}
            <div>
              <Label className="flex items-center gap-2 mb-3">
                <Activity className="h-4 w-4" />
                Fitness Level
              </Label>
              <RadioGroup
                value={formData.fitnessLevel}
                onValueChange={(value) => handleInputChange("fitnessLevel", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <Label htmlFor="beginner" className="flex-1 cursor-pointer">
                    <div className="font-medium">Beginner</div>
                    <div className="text-sm text-gray-500">New to fitness or returning after a break</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate" className="flex-1 cursor-pointer">
                    <div className="font-medium">Intermediate</div>
                    <div className="text-sm text-gray-500">Regular exercise routine, comfortable with most movements</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <Label htmlFor="advanced" className="flex-1 cursor-pointer">
                    <div className="font-medium">Advanced</div>
                    <div className="text-sm text-gray-500">Experienced with complex exercises and high intensity</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Goals */}
            <div>
              <Label className="flex items-center gap-2 mb-3">
                <Target className="h-4 w-4" />
                Fitness Goal
              </Label>
              <RadioGroup
                value={formData.goal}
                onValueChange={(value) => handleInputChange("goal", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="lose-weight" id="lose-weight" />
                  <Label htmlFor="lose-weight" className="flex-1 cursor-pointer">
                    <div className="font-medium">Lose Weight</div>
                    <div className="text-sm text-gray-500">Burn calories and reduce body fat</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="build-muscle" id="build-muscle" />
                  <Label htmlFor="build-muscle" className="flex-1 cursor-pointer">
                    <div className="font-medium">Build Muscle</div>
                    <div className="text-sm text-gray-500">Increase strength and muscle mass</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="stay-fit" id="stay-fit" />
                  <Label htmlFor="stay-fit" className="flex-1 cursor-pointer">
                    <div className="font-medium">Stay Fit</div>
                    <div className="text-sm text-gray-500">Maintain current fitness level and health</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Save Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
