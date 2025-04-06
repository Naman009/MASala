import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RecipeForm = ({ onSearch }: { onSearch: (data: RecipeFormData) => void }) => {
  const [formData, setFormData] = useState<RecipeFormData>({
    dietaryRestriction: "",
    allergies: "",
    mealType: "",
    cuisine: "",
    fridgeItems: ""
  });

  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (name: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormError(null); // clear error when user updates the form
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.dietaryRestriction || !formData.mealType || !formData.cuisine) {
      setFormError("Please fill out all required fields: Dietary Restriction, Meal Type, and Cuisine.");
      return;
    }

    setFormError(null); // clear error before submission
    onSearch(formData);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Find dishes to cook</h2>
        
        <div className="space-y-5">
          {/* Dietary Restriction + Cooking Time */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <Label htmlFor="dietaryRestriction" className="text-base">
                Dietary restrictions<span className="text-red-500 ml-1">*</span>
              </Label>
              <Select 
                value={formData.dietaryRestriction} 
                onValueChange={value => handleChange("dietaryRestriction", value)}
              >
                <SelectTrigger id="dietaryRestriction" className="border-input bg-white" title="Choose dietary preferences like vegan, keto, etc.">
                  <SelectValue placeholder="Select restriction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="pescatarian">Pescatarian</SelectItem>
                  <SelectItem value="keto">Keto</SelectItem>
                  <SelectItem value="paleo">Paleo</SelectItem>
                  <SelectItem value="gluten-free">Gluten-Free</SelectItem>
                  <SelectItem value="dairy-free">Dairy-Free</SelectItem>
                  <SelectItem value="low-carb">Low Carb</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Allergies */}
          <div className="space-y-2">
            <Label htmlFor="allergies" className="text-base">Allergies</Label>
            <Input 
              id="allergies" 
              placeholder="Enter your allergies separated by commas"
              className="border-input bg-white"
              title="Mention any ingredients you are allergic to" 
              value={formData.allergies}
              onChange={e => handleChange("allergies", e.target.value)}
            />
          </div>

          {/* Meal Type + Cuisine */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <Label htmlFor="mealType" className="text-base">
                Meal type<span className="text-red-500 ml-1">*</span>
              </Label>
              <Select 
                value={formData.mealType} 
                onValueChange={value => handleChange("mealType", value)}
              >
                <SelectTrigger id="mealType" className="border-input bg-white" title="Select the type of meal you're planning to make">
                  <SelectValue placeholder="Select meal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="dessert">Dessert</SelectItem>
                  <SelectItem value="snack">Snack</SelectItem>
                  <SelectItem value="appetizer">Appetizer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full">
              <Label htmlFor="cuisine" className="text-base">
                Cuisine<span className="text-red-500 ml-1">*</span>
              </Label>
              <Select 
                value={formData.cuisine} 
                onValueChange={value => handleChange("cuisine", value)}
              >
                <SelectTrigger id="cuisine" className="border-input bg-white" title="Select your preferred cuisine">
                  <SelectValue placeholder="Select cuisine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="indian">Indian</SelectItem>
                  <SelectItem value="thai">Thai</SelectItem>
                  <SelectItem value="chinese">Chinese</SelectItem>
                  <SelectItem value="italian">Italian</SelectItem>
                  <SelectItem value="mexican">Mexican</SelectItem>
                  <SelectItem value="japanese">Japanese</SelectItem>
                  <SelectItem value="mediterranean">Mediterranean</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="korean">Korean</SelectItem>
                  <SelectItem value="american">American</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Fridge Items */}
          <div className="space-y-2">
            <Label htmlFor="fridgeItems" className="text-base">What's your Fridge inventory or Kitchen pantry!</Label>
            <Textarea 
              id="fridgeItems" 
              placeholder="Enter your ingredients separated by commas" 
              className="min-h-20 border-input bg-white"
              title="Helps personalize recipes based on what you already have"
              value={formData.fridgeItems}
              onChange={e => handleChange("fridgeItems", e.target.value)}
            />
          </div>
        </div>

        {/* Validation Error */}
        {formError && (
          <p className="text-red-500 text-sm mt-4 text-center">{formError}</p>
        )}

        <div className="mt-4">
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-md"
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};

export interface RecipeFormData {
  dietaryRestriction: string;
  allergies: string;
  mealType: string;
  cuisine: string;
  fridgeItems: string;
}

export default RecipeForm;
