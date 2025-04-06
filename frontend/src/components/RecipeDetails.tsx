
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Recipe } from "./RecipeCard";
import { Separator } from "@/components/ui/separator";
import { Clock, Utensils, BarChart } from "lucide-react";

interface RecipeDetailsProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
}

const RecipeDetails = ({ recipe, isOpen, onClose }: RecipeDetailsProps) => {
  if (!recipe) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">{recipe.title}</DialogTitle>
          <DialogDescription className="text-base">{recipe.summary}</DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-64 object-cover rounded-lg"
          />
          
          <div className="grid grid-cols-3 gap-4 my-6">
            <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
              <Clock className="h-6 w-6 text-primary mb-1" />
              <p className="text-sm font-medium">Time</p>
              <p className="text-lg">{recipe.readyInMinutes} min</p>
            </div>
            <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
              <Utensils className="h-6 w-6 text-primary mb-1" />
              <p className="text-sm font-medium">Ingredients</p>
              <p className="text-lg">{recipe.ingredients.length}</p>
            </div>
            <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
              <BarChart className="h-6 w-6 text-primary mb-1" />
              <p className="text-sm font-medium">Calories</p>
              <p className="text-lg">{recipe.nutrition?.calories || "N/A"}</p>
            </div>
          </div>

          <Separator />
          
          <div className="my-6">
            <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
            <ul className="list-disc pl-5 space-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-muted-foreground">{ingredient}</li>
              ))}
            </ul>
          </div>

          <Separator />
          
          <div className="my-6">
            <h3 className="text-lg font-semibold mb-3">Instructions</h3>
            <ol className="list-decimal pl-5 space-y-3">
              {recipe.steps.map((step, index) => (
                <li key={index} className="text-muted-foreground">{step}</li>
              ))}
            </ol>
          </div>

          {recipe.nutrition && (
            <>
              <Separator />
              
              <div className="my-6">
                <h3 className="text-lg font-semibold mb-3">Nutrition</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-muted p-3 rounded-lg text-center">
                    <p className="text-sm font-medium">Calories</p>
                    <p className="text-lg">{recipe.nutrition.calories}</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg text-center">
                    <p className="text-sm font-medium">Protein</p>
                    <p className="text-lg">{recipe.nutrition.protein}</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg text-center">
                    <p className="text-sm font-medium">Carbs</p>
                    <p className="text-lg">{recipe.nutrition.carbs}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetails;
