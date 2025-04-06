import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import RecipeForm, { RecipeFormData } from "@/components/RecipeForm";
import RecipeCard, { Recipe } from "@/components/RecipeCard";
import RecipeDetails from "@/components/RecipeDetails";
import AIAgentsProcessing from "@/components/AIAgentsProcessing";
import { toast } from "sonner";
import LogsModal from "@/components/LogsModal";

const fetchRecipesFromBackend = async (formData: RecipeFormData): Promise<Recipe[]> => {
  const form = new FormData();
  if (formData.dietaryRestriction) form.append("dietaryRestriction", formData.dietaryRestriction);
  if (formData.allergies) form.append("allergies", formData.allergies);
  if (formData.mealType) form.append("mealType", formData.mealType);
  if (formData.cuisine) form.append("cuisine", formData.cuisine);
  if (formData.fridgeItems) form.append("fridgeItems", formData.fridgeItems);

  const response = await fetch("http://127.0.0.1:8000/process/", {
    method: "POST",
    body: form,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recipes from backend.");
  }

  const data = await response.json();
  console.log(data);
  console.log(data.recipes)
  console.log(data['recipes']);
  console.log(data['logs']);
  return data;
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showAgentsProcessing, setShowAgentsProcessing] = useState(false);
  const [logsData, setLogsData] = useState([]);
  const [fullJson, setFullJson] = useState({});
  const [showLogs, setShowLogs] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async (formData: RecipeFormData) => {
    //setIsLoading(true);
    setShowResults(false);
    setShowAgentsProcessing(true);
    
    try {
      // This would be your actual API call
      // const data = await mockFetchRecipes(formData);
      const data = await fetchRecipesFromBackend(formData);
      console.log(data);
      console.log(data['recipes']);
      console.log(data['logs'])
      console.log(data['recipes'].recipes);
      setLogsData(data['logs'])
      setFullJson(data['logs'])
      setRecipes(data["recipes"].recipes);
      
      // Show success toast
      toast.success("Recipes found based on your criteria!");
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      toast.error("Failed to find recipes. Please try again.");
      //setShowAgentsProcessing(false);
    } finally {
      setIsLoading(false);
      setShowAgentsProcessing(false);
    }
  };

  const handleAgentsComplete = () => {
    setShowAgentsProcessing(false);
    setShowResults(true);
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsDetailsOpen(true);
  };

  const handleSpecialAction = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/trigger_action/", {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error("Backend call failed");
      }
  
      const data = await response.json();
      const latestUrl = data.url;
      console.log(latestUrl);
  
      // ✅ Open in new tab
      window.open(latestUrl, "_blank");
    } catch (error) {
      console.error("❌ Error getting latest URL:", error);
      toast.error("Failed to fetch image URL");
    }
  };  

  const handleLogClick = async () => {
    setShowLogs(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="food-pattern-header py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-6">
          <h1
  className="text-7xl md:text-7xl font-extrabold mb-2 tracking-wide"
  style={{
    fontFamily: 'Regad',
    color: 'rgb(82, 52, 0)',
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.2)',
  }}
>
  MASala
</h1>

          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <RecipeForm onSearch={handleSearch} />
          </div>
          
          <div className="md:w-2/3">
            {isLoading && (
              <div className="flex justify-center my-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            )}

            {showAgentsProcessing && (
              <AIAgentsProcessing 
                isVisible={showAgentsProcessing} 
                onComplete={handleAgentsComplete} 
              />
            )}

            {isLoading && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleSpecialAction}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Get latest trace of AI agents
                </button>
              </div>
            )}


            {showResults && !showAgentsProcessing && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Recommended Recipes</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recipes.map((recipe) => (
                    <RecipeCard 
                      key={recipe.id}
                      recipe={recipe}
                      onClick={() => handleRecipeClick(recipe)}
                    />
                  ))}
                </div>
              </div>
            )}

            {!showResults && !showAgentsProcessing && (
              <div className="flex items-center justify-center h-full animate-fade-in">
              <video
              src="/homeVideo.mp4"  // Place your video in the public folder
              autoPlay
              loop
              muted
              playsInline
              className="w-full max-w-4xl rounded-2xl"
              style={{ background: "transparent", maxHeight: "550px" }}
            />
            </div>
            )}
          </div>
        </div>
      </main>

      <RecipeDetails 
        recipe={selectedRecipe} 
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />

{showResults && !showAgentsProcessing && (
        <>
        <button
        onClick={handleLogClick} // ✅ Use navigate instead of router.push
        className="fixed bottom-6 right-6 px-5 py-3 bg-primary text-white font-semibold rounded-full shadow-lg hover:bg-primary/90 transition-all z-50"
      >
        View Logs
      </button>
      {showLogs && (
        <LogsModal
          logs={logsData}
          fullJson={fullJson}
          onClose={() => setShowLogs(false)}
        />
      )}
      {/* Open External URL Button */}
    <button
      onClick={() => window.open("https://smith.langchain.com/o/faef8860-9b0b-41f6-951c-902f1da8509d/dashboards/dc85c6e2-891b-4c3c-99e6-b943a2d79862", "_blank")}
      className="fixed bottom-6 right-44 px-5 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all z-50"
    >
      Insiteful Dashboard
    </button>
      </>
      )}
      
    </div>
  );
};

export default Index;
