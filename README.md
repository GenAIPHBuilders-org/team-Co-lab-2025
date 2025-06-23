# 🚀 Team CoLab 2025 — AIWAKEN: Your Personalized AI Education Companion

🧠 AIWAKEN: Your Personalized AI Education Companion
AIWAKEN is an AI-powered gamified learning platform designed to deliver a dynamic and personalized educational experience for learners of all levels. It combines contextual hints, coaching, adaptive content, and a fun, companion-based approach to keep students engaged and motivated. 

# 📌 Project Description
Empower learners with an AI companion that dynamically generates study paths, delivers diverse materials, and adapts to user progress.
# ✨ Key Features

* 🎯 Personalized course generation based on user preferences

* 🎚️ Dynamic difficulty levels based on user performance

* 🤖 AI companion that guides, tests, and assists you with unique personality traits

* 💬 Contextual hints & motivational messages

* 🧠 Boss Battles to challenge your knowledge

* 🏅 Rewards upon course completion

* ❓ Quizzes to assess learning

* 🎁 Daily rewards, streak tracking, hearts, and coins to boost engagement
## Developers

- [@be3jaay](https://github.com/be3jaay) | [LinkedIn](https://www.linkedin.com/in/this-is-brian/)
- [@KentAcebedo](https://github.com/KentAcebedo)
- [@nasolgabriel](https://github.com/nasolgabriel)
- [@ryan](https://github.com/Pekatsou)

## 🚀 Getting Started after Installation Next JS (Quick Summary)
```bash
  git clone https://github.com/GenAIPHBuilders-org/team-Co-lab-2025.git
```
```bash
  cd next-aiwaken-frontend
```

```bash
  npm install / npm i
```

```bash
  add the provided env in the root folder
```
```bash
  npm run dev
```
```bash
  cd fast-aiwaken-be
```
```bash
  pip install -r requirements.txt
```

```bash
  Setup Database 
```

```bash
  Add env for API keys
```
# ⚙️ Setup Instructions

✅ Requirements

Client:

*    Node.js ≥ 18

*    npm

*    Next.js, TypeScript, Zod, ShadCN, Framer Motion

Server:

*    Python ≥ 3.9

*    FastAPI

*   PostgreSQL or SQLite (fallback)

*   GEMINI AI API key

*   YouTube API key

# 🚀 Usage Guide

📚 Trigger a Learning Session:

        1. Visit the front-end in your browser.

        2. Select your desired subject and companion.

        3. Start learning, take quizzes, and battle the boss!

🧪 Test the Agent:

        1. Change topics and observe dynamic course generation.

        2. Try different companions to see unique hints and messages.

        3. Use console logs or FastAPI docs (/docs) to inspect back-end tasks and API calls.

# 🧰 Additional Setup: Redis Installation & Usage

🧱 Install Redis for Windows

* Go to: https://github.com/tporadowski/redis/releases

* Download the latest .zip or .msi release under Assets

* Extract or install Redis to a directory, e.g., C:\Program Files\Redis

* ⚙️ Add Redis to Environment Variables

* Open System Properties → Environment Variables

* Under System Variables, find and select Path, then click Edit

* Add the path to the Redis bin folder (e.g., C:\Program Files\Redis)

* Click OK to save

# ✅ Verify Redis Installation

*  Restart your terminal and run:

*  redis-server

*  📦 Accessing Cached Course Data

*  To check or retrieve cached course content:

*  redis-cli

Then run:

*  GET /api/v1/companion/structure/cache:<userId>

# 🧩 Core Components

Agent Logic: Responsible for planning, reasoning, and tracking user learning progress

LLM & External APIs: Uses GEMINI AI for natural language tasks and YouTube API for educational videos

State Management: Handles user profiles

# 📂 Execution Script / Entry Points

next-aiwaken-frontend

Runs the React/Next.js client (npm run dev)

fast-aiwaken-be

Runs the FastAPI back-end (uvicorn main:app --reload)

.env files

Store secrets and configuration


## Front-end Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_API_URL`

## Back-end Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`USE_SQLITE_FALLBACK`
`POSTGRES_USER`
`POSTGRES_PASSWORD`
`POSTGRES_HOST`
`POSTGRES_PORT`
`POSTGRES_USER`
`POSTGRES_DB`
`SECRET_KEY`
`ACCESS_TOKEN_EXPIRE_MINUTES`
`REFRESH_TOKEN_EXPIRE_DAYS`
`YOUTUBE_API_KEY`
`GEMINI_API_KEY`


# ✅ Code Quality & Best Practices

🔑 Secrets managed via .env files — never commit secrets

📁 Organized structure for front-end and back-end

🗒️ Clear variable naming and comments where needed

📃 Docstrings and type hints for maintainability

🧹 Avoid hardcoded paths
## Demo

https://www.canva.com/design/DAGoViCQVPQ/S7JoFVwoQ2zs84zL5Yz6rQ/edit

