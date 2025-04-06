import crewai_tools
from crewai_tools import SerperDevTool
from langchain.tools import Tool
from urllib.parse import quote
from dotenv import load_dotenv
import requests
from bs4 import BeautifulSoup
import requests
from urllib.parse import quote


load_dotenv()

import os
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")
os.environ['SERPER_API_KEY'] = os.getenv('SERPER_API_KEY')

search_tool = SerperDevTool()  

def web_scraper(url: str) -> dict:
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                      "(KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        return {"error": f"Error fetching the webpage: {e}"}

    soup = BeautifulSoup(response.text, 'html.parser')

    title = soup.title.string.strip() if soup.title else "No title found"
    meta_description_tag = soup.find("meta", attrs={"name": "description"})
    meta_description = meta_description_tag["content"].strip() if meta_description_tag else "No meta description found"
    headings = {f"H{i}": [h.get_text(strip=True) for h in soup.find_all(f"h{i}")] for i in range(1, 7)}
    links = [a["href"] for a in soup.find_all("a", href=True) if a["href"].startswith("http")]

    tables = []
    for table in soup.find_all("table"):
        rows = []
        for tr in table.find_all("tr"):
            cells = [td.get_text(strip=True) for td in tr.find_all(["td", "th"])]
            rows.append(cells)
        tables.append(rows)

    for script in soup(["script", "style"]):
        script.extract()

    text = soup.get_text(separator="\n").strip()

    return {
        "title": title,
        "meta_description": meta_description,
        "headings": headings,
        "links": links[:20],
        "tables": tables[:3],
        "text_content": text[:4000]
    }

# ✅ CrewAI-compatible Tool
web_scraper_tool = Tool(
    name="Advanced Web Scraper",
    func=web_scraper,
    description="Scrapes a webpage and extracts structured data including headings, metadata, links, tables, and main content."
)

# 🥗 Nutrition Filter Tool
def filter_ingredients(_: str = "") -> str:
    # Get shared memory data
    ingredients = crewai_tools.shared_memory.get("ingredients", [])
    allergies = crewai_tools.shared_memory.get("allergies", [])

    # Normalize both lists
    ingredients = [i.strip() for i in ingredients if i.strip() and i.lower() != "none"]
    allergies = [a.strip() for a in allergies if a.strip() and a.lower() != "none"]

    # Handle empty or missing ingredients
    if not ingredients:
        return "✅ No specific ingredients provided — assume model can use any ingredients."

    # If no allergies, return full list of ingredients
    if not allergies:
        return "✅ No allergies specified — safe ingredients: " + ", ".join(ingredients)

    # Filter ingredients
    safe_ingredients = [
        i for i in ingredients if i.lower() not in [a.lower() for a in allergies]
    ]

    if safe_ingredients:
        return (
            "✅ Safe ingredients after filtering: " + ", ".join(safe_ingredients)
        )
    else:
        return "⚠️ No safe ingredients found after filtering based on allergies."

# CrewAI-compatible tool
nutrition_filter_tool = Tool(
    name="Nutrition Filter",
    func=filter_ingredients,
    description=(
        "Filters user-provided ingredients based on allergy restrictions. "
        "If user types 'none' or leaves blank, the model assumes no restrictions."
    )
)

# 👨‍🍳 Recipe Generator Tool
def generate_recipes(_: str = "") -> str:
    ingredients = crewai_tools.shared_memory.get("ingredients", [])
    dish_type = crewai_tools.shared_memory.get("dish_type", "")

    if not ingredients:
        return "No ingredients provided."

    return (
        f"*Recipe 1: {dish_type.title()} Delight*\n\n"
        f"*Ingredients:*\n"
        f"{chr(10).join(['* ' + i for i in ingredients])}\n\n"
        f"*Instructions:*\n"
        "1. Prep ingredients.\n"
        "2. Cook with spices and serve hot.\n\n"
        f"*Recipe 2: Easy {dish_type.title()}*\n\n"
        f"*Ingredients:*\n"
        f"{chr(10).join(['* ' + i for i in ingredients[:3]])}\n\n"
        f"*Instructions:*\n"
        "1. Quick stir-fry.\n"
        "2. Serve with sauce.\n\n"
        f"*Recipe 3: Classic {dish_type.title()} Bake*\n\n"
        f"*Ingredients:*\n"
        f"{chr(10).join(['* ' + i for i in ingredients])}\n\n"
        f"*Instructions:*\n"
        "1. Mix, bake at 375°F for 30 mins.\n"
        "2. Garnish and enjoy."
    )

recipe_tool = Tool(
    name="Recipe Generator",
    func=generate_recipes,
    description="Suggests 3 safe recipes using only user-approved ingredients."
)

# 🎁 Presenter Tool: Parse to structured JSON
def extract_recipe_blocks(text: str) -> list:
    return re.split(r"\n\s*\*\*Recipe \d+: ", text)[1:]

def extract_nutrition(lines: list[str]) -> dict:
    nutrition = {
        "calories": "N/A",
        "protein": "N/A",
        "carbs": "N/A",
        "fat": "N/A"
    }

    for line in lines:
        lower = line.lower()
        if "calories" in lower:
            nutrition["calories"] = line.split(":")[-1].strip()
        elif "protein" in lower:
            nutrition["protein"] = line.split(":")[-1].strip()
        elif "carbs" in lower:
            nutrition["carbs"] = line.split(":")[-1].strip()
        elif "fat" in lower:
            nutrition["fat"] = line.split(":")[-1].strip()

    return nutrition

def parse_final_recipe_block(block: str, index: int) -> dict:
    lines = block.strip().splitlines()
    title = lines[0].strip("") if lines else f"Recipe {index + 1}"
    summary = f"A delicious recipe for {title.lower()}."

    ingredients_start = next((i for i, line in enumerate(lines) if "Ingredients:" in line), -1)
    instructions_start = next((i for i, line in enumerate(lines) if "Instructions:" in line), -1)

    ingredients = []
    steps = []

    if ingredients_start != -1 and instructions_start != -1:
        ingredients = [line.strip("* ").strip() for line in lines[ingredients_start + 1:instructions_start] if line.strip()]
        steps = [line.strip().lstrip("0123456789. ") for line in lines[instructions_start + 1:] if line.strip()]

    image_url = f"https://source.unsplash.com/800x600/?{quote(title)}"
    nutrition = extract_nutrition(lines)

    return {
        "id": str(index + 1),
        "title": title,
        "summary": summary,
        "image": f"https://image.pollinations.ai/prompt/{title}",
        "readyInMinutes": 30,  # You can update this later from Chef
        "ingredients": ingredients,
        "steps": steps,
        "nutrition": nutrition
    }


def format_final_recipes(raw_text: str) -> list[dict]:
    blocks = extract_recipe_blocks(raw_text)
    return [parse_final_recipe_block(block, i) for i, block in enumerate(blocks)]


def format_recipes(raw_text: str) -> list[dict]:
    blocks = extract_recipe_blocks(raw_text)
    return [parse_final_recipe_block(block) for block in blocks]

presentation_tool = Tool(
    name="Recipe Formatter",
    func=format_recipes,
    description="Parses unstructured recipe output into structured JSON with title, ingredients, steps, nutrition info, and image."
)