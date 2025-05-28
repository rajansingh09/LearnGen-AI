# LearnGen AI: AI-Powered Educational Tutor 🎓🤖

LearnGen-AI is a full-stack EdTech web application that leverages the power of AI to deliver a personalized and interactive learning experience. It helps students learn smarter with adaptive content, AI guidance, and performance tracking.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3+-06B6D4.svg)](https://tailwindcss.com/)


## 🌟 Features

- 🔐 **User Authentication** – Secure login/signup using Firebase Auth
- 🧠 **AI-Powered Learning Assistant** – Personalized AI-based learning support (via OpenAI API)
- 📚 **Smart Course Recommendations** – Based on user behavior and learning goals
- 📝 **Quizzes and Interactive Q&A** – AI-curated questions and instant answers

## 🧱 Tech Stack

### Frontend
- HTML5, Tailwind CSS, JavaScript
- Axios for API calls
- Responsive and mobile-first design

### Backend & Services
- **Firebase** (Firestore for Database, Firebase Auth, Hosting if needed)
- **OpenAI API** for AI functionalities
- Firebase Functions (optional for advanced backend logic)

1. Clone the Repository

git clone https://github.com/rajansingh09/LearnGen-AI.git

cd LearnGen-AI

2. Setup Firebase
Create a project on Firebase Console

Enable Authentication (Email/Password)

Setup Firestore Database

Get your Firebase config and add it to your frontend

3. Add Firebase Config to Frontend
In your frontend code (usually firebase.js or main.js):

javascript
Copy
Edit
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
4. Install & Run Frontend

cd frontend

npm install

npm run dev

🔐 Environment Variables

VITE_FIREBASE_API_KEY=your_api_key

VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain

VITE_FIREBASE_PROJECT_ID=your_project_id

VITE_OPENAI_API_KEY=your_openai_key

Demo visuals and walkthroughs will be added shortly.

🧑‍💻 Author

**Rajan Kumar**  
- 🌐 [LinkedIn](https://www.linkedin.com/in/rajansingh09)


⭐️ Support

If you find this useful:

🌟 Star this repo

🍴 Fork it

🐛 Report issues

🤝 Contribute
