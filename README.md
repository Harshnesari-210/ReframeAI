
<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React.js%20%7C%20TailwindCSS-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-026e00?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Database-MongoDB-4DB33D?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/LLM-Gemini-blueviolet?style=for-the-badge&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/Event-KLE%20Mini%20Project-6f42c1?style=for-the-badge&logo=github&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Completed-28a745?style=for-the-badge&logo=checkmarx&logoColor=white" />
  <img src="https://img.shields.io/github/license/Harshnesari-210/ReframeAI?style=for-the-badge&color=grey&logo=book-open&logoColor=white" />
</p>


<h1 align="center">🧠 ReframeAI</h1>
<p align="center"><i>An AI-powered prompt enhancement tool that rewrites raw user input into optimized prompts for better LLM responses.</i></p>

---

## 📌 Project Overview

**ReframeAI** is a smart utility that refines and restructures user-written prompts before sending them to large language models (LLMs) like OpenAI’s GPT. This results in clearer, more structured, and more effective prompts — improving the quality, relevance, and accuracy of AI-generated responses.

---

## 🧩 Why ReframeAI?

Raw user prompts are often vague or poorly structured. Even great language models like GPT-4 can underperform when the prompt lacks context or clarity.  
**ReframeAI** solves this by applying intelligent prompt engineering techniques behind the scenes — so that **users get great responses without knowing how to write great prompts.**

---

## 🚀 Features

- 🔁 Auto-enhance user prompts with zero-shot or contextual reframing
- 🧠 Uses Ttrained ML model (T5 tokenizer) and  Gemini API to generate structured prompts
- 🗨️ Displays both original & reframed prompt + final AI response
- 🖼️ Clean UI (React + TailwindCSS)
- 👩‍🏫 Prompt history and profile managesment pages

---

## 🛠️ Tech Stack

| Layer        | Tech Used                                |
|--------------|-------------------------------------------|
| **Frontend** | React.js, Tailwind CSS                    |
| **Backend**  | Node.js, Express.js                       |
| **LLM Layer**| Gemini        |
| **Database** | MongoDB (for user auth, history – optional) |
| **Auth**     | JWT-based login          |

---

## 📁 Folder Structure
```
ReframeAI/
├── backend/
│ ├── controllers/ # Core logic for prompt reframing
│ ├── routes/ # Auth, prompt, and history APIs
│ ├── models/ # User and prompt schemas (MongoDB)
│ ├── epoch-2/ # (Excluded) Model files (2.7GB+) if needed
│ └── server.js # Express app entry point
│
├── frontend/
│ ├── components/ # React components (PromptBox, Result, etc.)
│ ├── pages/ # Home, Login, Dashboard
│ └── App.js
│
├── .gitignore
├── README.md
├── LICENSE
└── .env # API keys & config (not committed)
```

---

## ⚙️ How to Run Locally

```bash
# Clone the repo
git clone https://github.com/Harshnesari-210/ReframeAI.git
cd ReframeAI

# Backend setup
cd backend
npm install
npm dev

# Frontend setup (in new terminal)
cd ../frontend
npm install
npm run start

#ML model+ Gemini API
cd ../backend
python run_servers.py

# Note: Create .env file in backend for OpenAI key, Mongo URI, JWT_SECRET

```
---
## 📄 License
This project is licensed under the MIT License.
