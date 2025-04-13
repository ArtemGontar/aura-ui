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

## Architecture

### High-Level Diagram
```plaintext
User --> Telegram Mini App --> Frontend (React) --> Backend (Node.js)
                                      |
                        PostgreSQL <--|
                                      |
                          OpenAI API Integration
```

## Features
Fortune-Telling:
AI-generated insights in four categories:
Daily Horoscope
Psychological Insights
Tarot
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

## Future Enhancements

Real-Time Notifications:
Push updates for special features like new fortune types or promotions.
Premium Features:
Offer deeper insights or personalized reports for paid users.
Localization:
Multi-language support to cater to a global audience.