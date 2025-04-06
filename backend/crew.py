from crewai import Crew, Process
from agents import all_agents
from tasks import all_tasks
from dotenv import load_dotenv
from pathlib import Path
import json
import os
import re
import crewai_tools
from urllib.parse import quote
from langchain.callbacks.tracers.langchain import LangChainTracer
from langsmith_logs import get_recent_runs

tracer = LangChainTracer()

load_dotenv()
os.environ['GOOGLE_API_KEY'] = os.getenv('GOOGLE_API_KEY')
os.environ['SERPER_API_KEY'] = os.getenv('SERPER_API_KEY')    
os.environ['LANGSMITH_API_KEY'] = os.getenv('LANGSMITH_API_KEY')    
# Step 1: Get user input
# print("\n🍽 Welcome to the Smart Recipe Assistant! Please enter a few details.")
# meal_type = input("What type of meal are you planning? (e.g., breakfast, lunch, dinner): ").strip()
# dish_type = input("What type of dish do you want? (e.g., soup, curry, dessert): ").strip()
# ingredients = input("List ingredients you have in your fridge (comma-separated): ").strip().split(',')
# allergies = input("Any allergies? (comma-separated, or type 'none'): ").strip()
# dietary_restriction = input("Any dietary restriction? (e.g., vegan, keto, gluten-free, none): ").strip()

# Clean inputs

def update_image_links(json_data: dict) -> dict:
    recipes = json_data.get("recipes", [])
    for recipe in recipes:
        title = recipe.get("title", "")
        if title:
            encoded_prompt = quote(f"high-quality photo of {title}, plated on a table, cinematic lighting")
            image_url = f"https://image.pollinations.ai/prompt/{encoded_prompt}"
            recipe["image"] = image_url
    return json_data

# === MAIN EXECUTION ===
def crew(dietaryRestriction, allergies, mealType, cuisine, fridgeItems):
    try:
        # Run the crew and capture the result
        ingredients = [item.strip() for item in fridgeItems]
        allergies = [] if allergies.lower() == 'none' else [item.strip() for item in allergies.split(',')]
        dietary_restriction = dietaryRestriction if dietaryRestriction else "none"

        # Store user preferences in shared memory
        user_preferences = {
            "meal_type": mealType,
            "dish_type": cuisine,
            "ingredients": ingredients,
            "allergies": allergies,
            "dietary_restriction": dietary_restriction
        }

        crewai_tools.shared_memory = user_preferences

        print(f"\n🚀 Generating recipe recommendations for your {mealType} ({cuisine})...\n")

        # Format task descriptions using user input
        for task in all_tasks:
            # task.description = task.description.format(**user_preferences)
            try:
                task.description = task.description.format(**user_preferences)
            except Exception as e:
                print(f"❌ Failed to format task: {task.description}")
                raise
            if hasattr(task, "expected_output") and task.expected_output:
                task.expected_output = task.expected_output.format(**user_preferences)

        # Assemble the crew
        recipe_recommendation_crew = Crew(
            agents=all_agents,
            tasks=all_tasks,
            process=Process.sequential,
            verbose=True,
            planning=True,
            callbacks=[tracer]
        )

        result = recipe_recommendation_crew.kickoff()

        # Handle result format (Pydantic, dict, or string)
        if hasattr(result, "dict"):
            json_data = result.dict()
        elif isinstance(result, str):
    # Remove json ...  if present
            cleaned = re.sub(r"^json|$", "", result.strip(), flags=re.IGNORECASE).strip()
            try:
                json_data = json.loads(cleaned)
            except json.JSONDecodeError:
                json_data = {"result": cleaned}
        else:
            json_data = result

        updated_data = update_image_links(json_data)
        logs = get_recent_runs(limit=20)  # or limit=10

        return {
            "recipes": updated_data,
            "logs": logs
        }
        
    except Exception as e:
        print(f"\n❌ Error encountered: {str(e)}")