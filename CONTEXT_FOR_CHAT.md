# CONTEXT_FOR_CHAT.md

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
- **CSS Modules:** Scoped styles for each component.
- **React Router:** For navigation between pages.

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

## Project Structure

---

## Architecture

### High-Level Diagram
```plaintext
User --> Telegram Mini App --> Frontend (React) --> Backend (Node.js)
                                      |
                        PostgreSQL <--|
                                      |
                          OpenAI API Integration


Here is the updated raw Markdown content with a fixed architecture section and detailed project structure:

markdown
Копировать код
# CONTEXT_FOR_CHAT.md

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
- **CSS Modules:** Scoped styles for each component.
- **React Router:** For navigation between pages.

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

## Project Structure

aura-mini-app/ ├── src/ │ ├── components/ │ │ ├── Navbar/ │ │ │ ├── Navbar.tsx │ │ │ ├── Navbar.module.css │ │ ├── Card/ │ │ │ ├── Card.tsx │ │ │ ├── Card.module.css │ │ ├── FortuneTypes/ │ │ │ ├── DailyHoroscope.tsx │ │ │ ├── Psychological.tsx │ │ │ ├── Astrology.tsx │ │ │ ├── MagicBall.tsx │ │ │ ├── FortuneTypes.module.css │ │ ├── UserInfo/ │ │ │ ├── HomeUserInfo.tsx │ │ │ ├── ProfileUserInfo.tsx │ │ │ ├── UserInfo.module.css │ ├── pages/ │ │ ├── Home.tsx │ │ ├── Profile.tsx │ │ ├── Some.tsx │ │ ├── Home.module.css │ │ ├── Profile.module.css │ │ ├── Some.module.css │ ├── App.tsx │ ├── App.module.css │ ├── index.tsx │ ├── index.css ├── tests/ │ ├── components/ │ ├── pages/ ├── package.json ├── tsconfig.json ├── .env

yaml
Копировать код

---

## Architecture

### High-Level Diagram
```plaintext
User --> Telegram Mini App --> Frontend (React) --> Backend (Node.js)
                                      |
                        PostgreSQL <--|
                                      |
                          OpenAI API Integration
```

## Components
Telegram Interface: The entry point for users via Telegram's mini app framework.
Frontend:
React-based single-page application optimized for Telegram's mobile-friendly browser.
Navigation at the bottom for user-friendly access to "Home," "Profile," and a disabled "Some" tab.
Backend:
Node.js and Express framework for API routes.
OpenAI API for GPT model integration to generate personalized fortunes.
Database connection to PostgreSQL for persistent storage.
Database:
Stores user interactions, questions, and analytics data.

## API Endpoints
Method	Endpoint	Description
POST	/api/ask	Submit a question for GPT.
GET	/api/history	Fetch user interaction logs.
POST	/api/feedback	Submit user feedback.

## Features
Fortune-Telling:
AI-generated insights in four categories:
Daily Horoscope
Psychological Insights
Astrology
Magic Ball predictions
Each type is implemented as a separate React component.
User Profiles:
Displays personalized user info on both the Home and Profile pages.
Session History:
Users can view their previous questions and answers.
Feedback Submission:
Integrated feedback system for user input.
Wireframes Description
The app design includes:

Home Page:
A welcome message with user information.
Four cards representing the types of fortune-telling (Daily Horoscope, Psychological, Astrology, MagicBall).
Bottom navigation bar with "Home," "Some" (disabled), and "Profile."
Profile Page:
Detailed user information and settings.
A distinct layout compared to the Home page.
Some Tab:
Currently disabled for future expansion.

## Future Enhancements

Real-Time Notifications:
Push updates for special features like new fortune types or promotions.
Premium Features:
Offer deeper insights or personalized reports for paid users.
Localization:
Multi-language support to cater to a global audience.