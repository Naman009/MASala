from crewai import Crew, Process
from agents import all_agents
from tasks import all_tasks
from pathlib import Path
from urllib.parse import quote
import crewai_tools
import json
import os
import re
from langchain.callbacks.tracers.langchain import LangChainTracer
from langsmith_logs import get_recent_runs

# === Setup ===
tracer = LangChainTracer()

# Load environment variables manually or using dotenv
os.environ['GOOGLE_API_KEY'] = os.getenv('GOOGLE_API_KEY')
os.environ['SERPER_API_KEY'] = os.getenv('SERPER_API_KEY')
os.environ['LANGSMITH_API_KEY'] = os.getenv('LANGSMITH_API_KEY')


# === Image Update Helper ===
def update_image_links(json_data: dict) -> dict:
    recipes = json_data.get("recipes", [])
    for recipe in recipes:
        title = recipe.get("title", "")
        if title:
            encoded_prompt = quote(f"high-quality photo of {title}, plated on a table, cinematic lighting")
            image_url = f"https://image.pollinations.ai/prompt/{encoded_prompt}"
            recipe["image"] = image_url
    return json_data


# === Core Function ===
def generate_recipe_plan() -> dict:
    print("\n🍽 Welcome to the Smart Recipe Assistant! Please enter a few details.")
    meal_type = input("What type of meal are you planning? (e.g., breakfast, lunch, dinner): ").strip()
    dish_type = input("What type of dish do you want? (e.g., soup, curry, dessert): ").strip()
    ingredients = input("List ingredients you have in your fridge (comma-separated): ").strip().split(',')
    allergies = input("Any allergies? (comma-separated, or type 'none'): ").strip()
    dietary_restriction = input("Any dietary restriction? (e.g., vegan, keto, gluten-free, none): ").strip()

    # Clean input
    ingredients = [item.strip() for item in ingredients]
    allergies = [] if allergies.lower() == 'none' else [item.strip() for item in allergies.split(',')]
    dietary_restriction = dietary_restriction if dietary_restriction else "none"

    # Shared memory
    user_preferences = {
        "meal_type": meal_type,
        "dish_type": dish_type,
        "ingredients": ingredients,
        "allergies": allergies,
        "dietary_restriction": dietary_restriction
    }
    crewai_tools.shared_memory = user_preferences

    print(f"\n🚀 Generating recipe recommendations for your {meal_type} ({dish_type})...\n")

    # Format tasks
    for task in all_tasks:
        task.description = task.description.format(**user_preferences)
        if hasattr(task, "expected_output") and task.expected_output:
            task.expected_output = task.expected_output.format(**user_preferences)

    # Assemble and run crew
    recipe_crew = Crew(
        agents=all_agents,
        tasks=all_tasks,
        process=Process.sequential,
        verbose=True,
        planning=True,
        callbacks=[tracer]
    )

    try:
        result = recipe_crew.kickoff()

        # Normalize to dict
        if hasattr(result, "dict"):
            json_data = result.dict()
        elif isinstance(result, str):
            cleaned = re.sub(r"^json|$", "", result.strip(), flags=re.IGNORECASE).strip()
            try:
                json_data = json.loads(cleaned)
            except json.JSONDecodeError:
                json_data = {"result": cleaned}
        else:
            json_data = result

        # Add image URLs
        updated_data = update_image_links(json_data)
        logs = get_recent_runs(limit=20)  # or limit=10

        return {
            "recipes": updated_data,
            "logs": logs
        }
    except Exception as e:
        return {"error": str(e)}


# === Run as script ===
if __name__ == "__main__":
    data = generate_recipe_plan()
    print(json.dumps(data, indent=2, ensure_ascii=False))
