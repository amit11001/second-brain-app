
# 🧠 Second Brain - AI-Powered Note Application

Second Brain is a full-stack web application designed to help you capture your thoughts and automatically generate concise summaries using Artificial Intelligence. Built with a modern tech stack, it features secure user authentication and a clean, intuitive user interface.

## ✨ Features

- **Secure Authentication:** User registration and login powered by JSON Web Tokens (JWT) and bcrypt password hashing.
- **Smart Note Management:** Create, read, and delete your personal notes. Notes are strictly tied to your authenticated account for privacy.
- **AI Summarization:** Click a button to instantly generate a 3-bullet-point summary of any note using Google's powerful Gemini 1.5 Flash AI model.
- **Modern UI:** A beautiful, responsive interface built with React, styled with Tailwind CSS, and featuring Lucide icons.

## 🛠️ Tech Stack

**Frontend:**

- React (via Vite)
- Tailwind CSS (for styling)
- Axios (for API requests)
- Lucide React (for icons)

**Backend:**

- Node.js & Express
- MongoDB & Mongoose (Database)
- Google Generative AI SDK (`@google/generative-ai`)
- JSON Web Tokens (`jsonwebtoken`) & bcryptjs

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

You will need the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Docker](https://www.docker.com/) (for running MongoDB locally)
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### 1. Database Setup (Docker)

Start a local MongoDB container using Docker:

```bash
docker run -d -p 27017:27017 --name second-brain-mongo mongo
```

### 2. Backend Setup

Open a terminal and navigate to your backend directory:

```bash
# Install dependencies
npm install

# Create a .env file
touch .env
```

Add the following environment variables to your backend `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/secondBrainDB
GEMINI_API_KEY=your_actual_gemini_api_key_here
JWT_SECRET=a_very_long_and_secure_random_string
```

Start the backend server:

```bash
npm start
# or 'node server.js'
```

### 3. Frontend Setup

Open a new terminal and navigate to your frontend directory:

```bash
# Install dependencies
npm install

# Create a .env file
touch .env
```

Add the following environment variable to your frontend `.env` file (Vite requires the `VITE_` prefix):

```env
VITE_BACKEND_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

## 💡 How to Use

1. Open your browser to the local port provided by Vite (usually `http://localhost:5173`).
2. Click **Sign Up** to create a new account.
3. Log in with your new credentials.
4. Start typing your notes and click **Save to Brain**.
5. Click **Summarize with AI** on any note to generate instant insights!

---
