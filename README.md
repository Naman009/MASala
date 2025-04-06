# 🧠 MASala AI — Your Multi-Agent Recipe Assistant!

<p align="center">
  <img src="https://github.com/user-attachments/assets/b212c9d0-6c5b-4aac-ae1a-7cfcccc03aff"/>
</p>

> 🍛 MASala: Multi-Agent AI That Cooks Up Recipes Just for You  
>   ~ From fridge to feast, MASALA plans it all.
---

## 🏆 Hackathon Submission

This project was built for the **Multi-Agent System Challenge**, where teams had to:
- Build a system with **at least 3 distinct agents**.
- Ensure agents **collaborate, negotiate, and coordinate** autonomously.
- Provide a **dashboard to visualize agent progress and communication**.

**Use Case Chosen:** Smart Recipe Recommendation System with allergy, preference, and dietary filtering  
**Category Impact:** Personalized Wellness, Lifestyle Assistant

---

## 📌 About the Project

**MASala AI** is a creative, multi-agent system that generates **personalized recipes** for users by coordinating a set of intelligent agents. It adapts to user preferences, dietary needs, and allergies, delivering healthy and delicious options.

---

## 👨‍🍳 The Agents Behind the Magic

| Agent               | Role                                                                 |
|---------------------|----------------------------------------------------------------------|
| 🧪 Web Analyzer      | Scrapes and analyzes trending recipes across the web.                |
| 🥦 Nutritionist      | Filters ingredients based on dietary restrictions and allergies.     |
| 🍳 Chef              | Crafts creative, personalized recipes based on filtered inputs.      |
| 🗣 Presenter         | Generates readable recipe JSON and visual prompts for sharing.       |

All agents **communicate through shared data**, orchestrated via **CrewAI**, ensuring a seamless flow and conflict-free coordination.

---

## 🧰 Tech Stack

- ⚙️ **CrewAI** – Orchestrates agent behavior and logic.
- 🧠 **Gemini (Google AI)** – Powers intelligent agent reasoning.
- 🔗 **LangChain + LangSmith** – Memory, observability, and traceable runs.
- 🎨 **Pollinations API** – Generates AI-based food imagery.
- 🚀 **FastAPI** – Powers the backend REST API.
- 💡 **React.js** – Interactive frontend dashboard.

---

## 🧱 Application Architecture

<p align="center">
  <img src="(https://github.com/user-attachments/assets/6922b66d-6664-4c67-9d4b-f62cea47743c" width="700"/>
</p>

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/masala-ai.git
cd masala-ai
```

### 2. Environment Setup

Create a `.env` file with the following:

```env
LANGSMITH_TRACING=true
LANGSMITH_ENDPOINT="https://api.smith.langchain.com"
LANGSMITH_API_KEY="your_langsmith_key"
LANGSMITH_PROJECT="your_project_id"
GOOGLE_API_KEY="your_google_api_key"
SERPER_API_KEY="your_serper_key"
```

### 3. Install Dependencies

```bash
python -m venv masala_env
source masala_env/bin/activate  # Windows: masala_env\Scripts\activate
pip install -r backend/requirements.txt
```

### 4. Run the Backend

```bash
cd backend
uvicorn main:app --reload
```

### 5. Start the Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🧪 API Endpoints

| Endpoint       | Description                             |
|----------------|-----------------------------------------|
| `POST /generate`    | Send user input → Get back recipe JSON   |
| `GET /logs`         | View LangSmith logs of recent agent runs |
| `GET /trace`        | Fetch public trace link for debugging     |

---

## 📊 Dashboard Features

- ✅ View active agents and their current tasks.
- 📡 Real-time communication and trace logs.
- 🍽️ Final JSON response and shareable recipe visual from Pollinations AI.
- 📊 Agent status: *Working*, *Pending*, *Completed*

---

## 🖼 Recipe Images

Each recipe has a unique image generated with:

```
https://image.pollinations.ai/prompt/{recipe_title}
```

---

## 📄 License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

## ❤️ Acknowledgements

- [CrewAI](https://crewai.io)
- [LangSmith](https://smith.langchain.com)
- [Gemini by Google AI](https://deepmind.google/technologies/gemini)
- [Pollinations AI](https://pollinations.ai)
