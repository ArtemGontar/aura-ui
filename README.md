# Aura Mini App Documentation

## Overview
Aura is a mystical and interactive fortune-telling mini app designed for Telegram. It combines an intuitive user interface with backend AI capabilities to deliver personalized insights and experiences.

---

## Branding
**App Name:** Aura

**Tagline:** "Discover the unseen."

**Logo:** A glowing circle or gradient ring symbolizing an energy field.

**Color Palette:**
- **Primary:** Purple (#6A0DAD)
- **Accent:** Gold (#FFD700)
- **Background:** Midnight blue to black gradient

**Typography:**
- Headings: Modern serif font
- Body text: Clean sans-serif font

---

## Technologies
### Frontend
- **React (TypeScript):** Framework for building the mini app's UI.
- **Tailwind CSS:** For styling and responsive design.

### Backend
- **Node.js (TypeScript):** Backend runtime for handling business logic.
- **Express:** Lightweight web framework for API routes.
- **OpenAI API:** GPT model integration for fortune generation.

### Database
- **PostgreSQL:** For storing user interactions and analytics.

### Deployment
- **Docker:** Containerized deployment for portability.
- **Vercel:** Hosting for the frontend.
- **AWS Lambda:** Serverless functions for the backend.

### Testing
- **Jest:** Unit and integration testing for frontend and backend.
- **React Testing Library:** For component testing.

---

## Architecture
### High-Level Diagram
```plaintext
User --> Telegram --> Aura Mini App UI (React) --> Backend API (Node.js) --> OpenAI GPT API
                                      |                                        |
                                      --> PostgreSQL <------------------------
```

### Components
1. **Telegram Interface**: Entry point for users via Telegram mini apps.
2. **Frontend**: React-based application loaded in Telegram.
3. **Backend API**:
   - Handles requests from the frontend.
   - Interacts with OpenAI for generating fortunes.
   - Manages user sessions and data.
4. **Database**: Stores user questions, interactions, and analytics.

### API Endpoints
| Method | Endpoint               | Description                  |
|--------|------------------------|------------------------------|
| POST   | `/api/ask`             | Submit a question for GPT.  |
| GET    | `/api/history`         | Fetch user interaction logs.|
| POST   | `/api/feedback`        | Submit user feedback.       |

---

## Developer Information
### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   Create a `.env` file:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   DATABASE_URL=your_database_url
   ```

### Testing
Run all tests:
```bash
npm run test
```

### Deployment
1. Build Docker images:
   ```bash
   docker-compose build
   ```
2. Deploy containers:
   ```bash
   docker-compose up -d
   ```

---

## Features
1. **Fortune-Telling:** Interactive AI-generated fortunes based on user input.
2. **Session History:** Users can view their previous questions and answers.
3. **Feedback Submission:** Users can share their experience.

---

## Future Enhancements
1. **Real-Time Notifications:** Push updates for special features.
2. **Premium Features:** Offer deeper insights for paid users.
3. **Localization:** Multi-language support for a global audience.
