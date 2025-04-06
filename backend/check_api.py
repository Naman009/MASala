from google import generativeai as genai
import os
from dotenv import load_dotenv
import requests

# Load .env file
load_dotenv()

# Set API keys from environment variables
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
SERPER_API_KEY = os.getenv("SERPER_API_KEY")

# Debug print (optional)
print(f"🔑 GOOGLE_API_KEY: {'Found' if GOOGLE_API_KEY else 'Missing'}")
print(f"🔑 SERPER_API_KEY: {'Found' if SERPER_API_KEY else 'Missing'}")

# ✅ Test Google Gemini API
try:
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content("Explain how AI works in simple words.")
    print("\n✅ Gemini API Response:")
    print(response.text)
except Exception as e:
    print("\n❌ Gemini API Error:", e)

# ✅ Test Serper.dev API
try:
    search_query = "how does artificial intelligence work"
    url = "https://google.serper.dev/search"
    headers = {"X-API-KEY": SERPER_API_KEY}
    json_data = {"q": search_query}

    search_response = requests.post(url, headers=headers, json=json_data)
    search_response.raise_for_status()
    data = search_response.json()

    print("\n✅ Serper.dev API Response (Top Result):")
    if "organic" in data and len(data["organic"]) > 0:
        top_result = data["organic"][0]
        print(f"Title: {top_result.get('title')}")
        print(f"Link: {top_result.get('link')}")
    else:
        print("No search results found.")
except Exception as e:
    print("\n❌ Serper.dev API Error:", e)
