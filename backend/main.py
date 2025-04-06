from fastapi import FastAPI, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.responses import PlainTextResponse
# from agent_handler import handle_request
from get_trace import get_latest_trace_url
from crew import crew

app = FastAPI()

# 🔥 TEMP: print validation errors clearly
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return PlainTextResponse(str(exc), status_code=422)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/process/")
async def process_input(dietaryRestriction: str = Form(...),allergies: str = Form(...),mealType: str = Form(...),cuisine: str = Form(...),fridgeItems: str = Form(...)):
    print("🎯 FastAPI received the request.")
    # Call your logic from recipe_engine.py
    result = crew(dietaryRestriction, allergies, mealType, cuisine, fridgeItems)
    print(result)
    return JSONResponse(content=result)

# In main.py
@app.get("/trigger-action/")
async def trigger_action():
    print("Fetching latest trace")
    return JSONResponse(content={"langsmith_trace_url": get_latest_trace_url()})