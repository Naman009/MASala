from crewai import Task
from agents import web_analyzer_agent, nutritionist_agent, chef_agent, presenter_agent
from dotenv import load_dotenv
from tools import search_tool, web_scraper_tool, nutrition_filter_tool, recipe_tool, presentation_tool
from schemas import FinalRecipeList
from pydantic import BaseModel
from typing import List

class RecipeList(BaseModel):
    recipes: List[FinalRecipeList]

load_dotenv()

import os
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")
os.environ['SERPER_API_KEY'] = os.getenv('SERPER_API_KEY')


task1 = Task(
    description=(
        "Analyze the user's preferences including dietary restrictions, allergies, cuisine type ({dish_type}), "
        "and available ingredients ({ingredients}). Summarize insights on what kind of meals can be prepared "
        "based on common pairings, cultural styles, and health considerations. Use trusted sources only."
    ),
    expected_output="Concise summary of user preferences with any important observations or advice.",
    tools=[search_tool, web_scraper_tool],
    agent=web_analyzer_agent,
    async_execution=False
)

task2 = Task(
description=(
        "Take the ingredient list: ({ingredients}), and eliminate anything that matches these allergies: ({allergies}). "
        "Ensure all remaining ingredients fully comply with the dietary restriction: ({dietary_restriction}). "
        "Be strict — no compromises.\n\n"
        "Return only the ingredients that are safe to use.\n\n"
        "Then, using these final safe ingredients, provide an estimated nutritional summary per serving, including:\n"
        "- Calories (in kcal)\n"
        "- Protein (in grams)\n"
        "- Carbohydrates (in grams)\n"
        "- Fat (in grams)\n\n"
        "Use general dietary knowledge to make your estimates. This nutritional summary will help the Chef plan appropriate recipes."
    ),
    expected_output="A list of safe ingredients that are allergy-free and diet-compliant.",
    tools=[nutrition_filter_tool, search_tool, web_scraper_tool],
    agent=nutritionist_agent,
    async_execution=False
)

task3 = Task(
    description=(
        "Using the filtered ingredients, generate 3 unique and healthy recipes suitable for a ({dish_type}). "
        "Each recipe should use only the provided ingredients and comply with dietary restrictions. "
        "Structure clearly with ingredients, steps, and estimated cooking time."
    ),
    expected_output="3 cleanly structured recipes based on ingredients and cooking preferences.",
    tools=[recipe_tool, search_tool,web_scraper_tool],
    agent=chef_agent,
    async_execution=False
)

task4 = Task(
description=( 
    "Format the final recipes into the following JSON structure: "
    "[{{ id, title, summary, image, readyInMinutes, ingredients, steps, nutrition {{ calories, protein, carbs, fat }} }}]"
),
    expected_output="A JSON list of cleanly formatted recipe cards with nutrition info and images.",
    tools=[presentation_tool, search_tool,web_scraper_tool],
    agent=presenter_agent,
    async_execution=False,
    output_json=FinalRecipeList
)

all_tasks = [task1, task2, task3, task4]
