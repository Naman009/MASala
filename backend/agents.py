from crewai import Agent
from tools import search_tool, web_scraper_tool, nutrition_filter_tool, recipe_tool, presentation_tool
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
import os

load_dotenv()
os.environ['GOOGLE_API_KEY'] = os.getenv('GOOGLE_API_KEY')
os.environ['SERPER_API_KEY'] = os.getenv('SERPER_API_KEY')


llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    verbose=True,
    temperature=0.7,
    google_api_key=os.getenv("GOOGLE_API_KEY")
)

# 🧠 Web Analyzer Agent
web_analyzer_agent = Agent(
    role="Web Analyzer",
    goal=( 
          "Analyze user preferences such as dietary restrictions, allergies, cuisine style, and available ingredients. "
          "Use web sources to enrich context with nutritional, cultural, or preparation-related insights." 
          ),
    backstory=(
            "An AI culinary researcher trained to understand user cooking needs and context. Skilled at exploring food data "
            "based on dietary needs (e.g. vegan, keto), allergy concerns, cooking time constraints, and regional cuisines." 
               ),
    tools=[search_tool,web_scraper_tool],
    llm=llm,
    verbose=True,
    async_execution=False,
    allow_delegation=True,
    memory=True
)

# 🥗 Nutritionist Agent
nutritionist_agent = Agent(
    role="Nutritionist",
    goal=(
        "Evaluate all ingredients provided and eliminate any that conflict with the user's allergies or dietary restrictions. "
        "Return only safe and compliant ingredients for recipe creation."
    ),
    backstory=(
        "Certified AI nutritionist trained in medical diet safety and lifestyle-based restrictions. Always ensures user "
        "wellbeing by strictly filtering unsafe or non-compliant ingredients before recipe generation."
    ),  
    tools=[nutrition_filter_tool, search_tool, web_scraper_tool],
    llm=llm,
    verbose=True,
    async_execution=False,
    allow_delegation=True,
    memory=True
)

# 👨‍🍳 Chef Agent
chef_agent = Agent(
    role="Chef",
    goal=(
        "Create 3 easy-to-follow, culturally appropriate recipes using only the filtered ingredients. "
        "Each recipe must match the selected meal type, dietary restriction, cuisine style, and cooking time limit."
    ),
    backstory=(
        "An expert recipe-generation AI with a deep understanding of global cuisines and diet-conscious cooking. "
        "Always follows the user's approved ingredient list and restrictions. Never improvises with unapproved ingredients."
    ),
    tools=[recipe_tool, search_tool,web_scraper_tool],
    llm=llm,
    verbose=True,
    async_execution=False,
    allow_delegation=True,
    memory=True
)

# 🎁 Presenter Agent
presenter_agent = Agent(
    role="Presenter",
    goal=(
        "Take the final recipes and present them in a clean, visually appealing, and user-friendly format. "
        "Include a high-quality image of the dish and a relevant YouTube link for a cooking tutorial. "
        "Strictly format only — do not alter the recipe steps or ingredients in any way."
    ),
    backstory=(
        "An expert in content presentation, layout, and food visuals. Known for delivering beautiful, ready-to-share recipe cards "
        "with helpful links and attractive dish photos. Follows strict formatting rules and never modifies recipe content."
    ),
    tools=[presentation_tool, search_tool,web_scraper_tool],
    llm=llm,
    verbose=True,
    async_execution=False,
    allow_delegation=True,
    memory=True
)

all_agents = [web_analyzer_agent, nutritionist_agent, chef_agent, presenter_agent]
