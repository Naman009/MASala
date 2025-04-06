from pydantic import BaseModel
from typing import List, Dict

class NutritionInfo(BaseModel):
    calories: str
    protein: str
    carbs: str
    fat: str

class FinalRecipe(BaseModel):
    id: str
    title: str
    summary: str
    image: str
    readyInMinutes: int
    ingredients: List[str]
    steps: List[str]
    nutrition: NutritionInfo

class FinalRecipeList(BaseModel):
    recipes: List[FinalRecipe]