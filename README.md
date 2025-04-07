# 🧠 MASala AI — Your Multi-Agent Recipe Assistant!

<p align="center">
  <img src="https://github.com/user-attachments/assets/34765962-3f82-4432-9d4f-059b270753dd"/>
</p>

> 🍛 MASala: Multi-Agent AI That Cooks Up Recipes Just for You  
>   ~ From fridge to feast, MASALA plans it all.
---
## 👥 Team Members

- 👨‍💻 Dhyey Joshi  
- 👨‍💻 Ashutosh Gupta  
- 👩‍💻 Vedika Shinde  
- 👨‍💻 Naman Shah

---

### 🧠 Use Case: Smart Culinary Companion for Personalized Cooking

Our Multi-Agent System intelligently assists users in discovering healthy, personalized recipes using real-time inputs such as available ingredients, dietary restrictions, and allergies. With agents collaborating as an **Analyzer**, **Nutritionist**, **Chef**, and **Presenter**, the system ensures safe, delicious, and nutrition-aware meals — all generated automatically using modern AI.

---

### 🌍 Category Impact: Health & Lifestyle | AI for Personalized Wellness

By leveraging AI agents to simplify healthy cooking at home, our system:
- Reduces cognitive load on users,
- Promotes food safety through allergy and dietary filtering,
- Encourages smarter, personalized eating habits.

It’s a modern take on accessible wellness — powered by **collaborative intelligence**.

<p align="center">
  <img src="https://github.com/user-attachments/assets/69443d40-eb10-4620-b6d3-84cc085d3cad"/>
</p>

---

## 📌 About the Project

**MASala AI** is a creative, multi-agent system that generates **personalized recipes** for users by coordinating a set of intelligent agents. It adapts to user preferences, dietary needs, and allergies, delivering healthy and delicious options.

## 🎥 Project Demo
Watch MASala AI in action!   
👉 [Click here to view the demo on YouTube](https://www.youtube.com/watch?v=bwtq6kZqzOM)

<p align="center">
  <a href="https://www.youtube.com/watch?v=bwtq6kZqzOM" target="_blank">
    <img src="https://img.youtube.com/vi/bwtq6kZqzOM/hqdefault.jpg" alt="MASala AI Demo" width="50%"/>
  </a>
</p>

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
  <img src="https://github.com/user-attachments/assets/5e21f7b5-328a-470a-9c26-5e603a912fa6"/>
</p>

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Naman009/MASala.git
cd MASala
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
npm run dev
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

---

## 📄 License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

## ❤️ Acknowledgements

- [CrewAI](https://crewai.io)
- [LangSmith](https://smith.langchain.com)
- [Gemini by Google AI](https://deepmind.google/technologies/gemini)
- [Pollinations AI](https://pollinations.ai)
