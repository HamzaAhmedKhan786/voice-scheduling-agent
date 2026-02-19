# Vikara AI - Voice Scheduling Agent 🎤📅

An AI-powered voice agent that schedules meetings directly onto a Google Calendar using Vapi.ai and a Node.js backend.

## 🚀 Features
- **Voice Interface:** Real-time conversation via Vapi.ai.
- **Smart Extraction:** Automatically identifies name, date, and time from natural speech.
- **Google Calendar Integration:** Uses Google Calendar API (Service Account) to book events.
- **Secure Backend:** Node.js/Express server acting as a secure webhook.

## 🛠️ Tech Stack
- **AI/Voice:** [Vapi.ai](https://vapi.ai)
- **Backend:** Node.js, Express
- **APIs:** Google Calendar API v3
- **Tunneling:** Ngrok (for local development)

## 📦 Setup Instructions
1. **Clone the repo:** `git clone <your-repo-url>`
2. **Install Dependencies:** `npm install` inside the backend folder.
3. **Google API Setup:** - Place your `credentials.json` in the root.
   - Share your Google Calendar with the `client_email` found in the JSON.
4. **Environment Variables:** Create a `.env` file:
   ```text
   GOOGLE_CALENDAR_ID=your-email@gmail.com
   PORT=3000