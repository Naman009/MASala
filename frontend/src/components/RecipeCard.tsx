
export interface Recipe {
  id: string;
  title: string;
  summary: string;
  image: string;
  readyInMinutes: number;
  steps: string[];
  ingredients: string[];
  nutrition?: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
}

const RecipeCard = ({ recipe, onClick }: { recipe: Recipe; onClick: () => void }) => {
  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-md"
      onClick={onClick}
    >
      <div className="h-40 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
        <p className="text-muted-foreground line-clamp-3 text-sm mb-2">{recipe.summary}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
