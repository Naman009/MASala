
# 🧠 MASala AI — Your Multi-Agent Recipe Assistant!

<p align ="center">
  <img src="https://user-images.githubusercontent.com/placeholder/logo.png" width="150"/>
</p>

> 🍛 MASala: Multi-Agent System for Autonomous Lifestyle Assistant  
> Your personalized smart cooking assistant powered by CrewAI, Gemini, LangChain, and LangSmith.

---

## 📌 About the Project

**MASala AI** is a powerful, multi-agent system (MAS) designed to recommend personalized recipes based on user preferences like ingredients, allergies, and dietary restrictions.

### 👨‍🍳 The Agents Behind the Magic
- 🧪 **Web Analyzer Agent** – Scrapes and analyzes top trending recipes from the web.
- 🥦 **Nutritionist Agent** – Filters ingredients based on allergies or restrictions.
- 🍳 **Chef Agent** – Crafts creative, delicious recipes.
- 🗣 **Presenter Agent** – Formats output in readable JSON and generates shareable visuals.

---

## 🧰 Tech Stack

- ⚙️ **CrewAI** – Orchestrates agent logic and flow
- 🧠 **Gemini (Google AI)** – Powers intelligent decision-making for agents
- 🔗 **LangChain + LangSmith** – Enables memory, tracing, and observability
- 🎨 **Pollinations API** – Generates AI-based food images
- 🚀 **FastAPI** – Serves backend API
- 💡 **React.js** – Frontend interface

---

## 📸 Architecture Overview

![Architecture](https://user-images.githubusercontent.com/placeholder/architecture.png)

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/masala-ai.git
cd masala-ai
```

### 2. Set Up Your Environment

Create a `.env` file in the root directory and add:

```bash
LANGSMITH_TRACING=true
LANGSMITH_ENDPOINT="https://api.smith.langchain.com"
LANGSMITH_API_KEY="your_langsmith_key"
LANGSMITH_PROJECT="your_project_id"
GOOGLE_API_KEY="your_google_api_key"
SERPER_API_KEY="your_serper_key"
```

### 3. Create Python Environment & Install

```bash
python -m venv masala_env
source masala_env/bin/activate   # or `masala_env\Scripts\activate` on Windows
pip install -r requirements.txt
```

### 4. Run Backend Server

```bash
cd backend
uvicorn main:app --reload
```

### 5. Run Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🧪 API Endpoints

| Endpoint       | Description                             |
|----------------|-----------------------------------------|
| `/generate`    | POST user inputs and get recipe JSON    |
| `/logs`        | Get recent LangSmith agent run logs     |
| `/trace`       | Returns public LangSmith trace link     |

---

## 📈 Real-Time Observability

- Logs are saved live using `langsmith_logs.py`
- Public trace link can be shared with `get_trace.py`

---

## 🖼 Image Generation

Recipes come with:
```
https://image.pollinations.ai/prompt/{recipe_title}
```

---

## 📄 License

This project is licensed under the MIT License.

---

## ❤️ Acknowledgements

- [CrewAI](https://crewai.io)
- [LangSmith](https://smith.langchain.com)
- [Gemini by Google AI](https://deepmind.google/technologies/gemini)
- [Pollinations API](https://pollinations.ai)
