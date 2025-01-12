# Aura

Aura is a web application that provides various types of predictions and user interactions. It integrates with the Telegram API to fetch user data and displays personalized content.

## Features

- Fetches user data from the Telegram API.
- Displays a personalized welcome message.
- Shows a daily prediction streak.
- Provides various types of predictions including Horoscope, Psychological, Astrology, MagicBall, Tarot, and Runes.

## Project Structure

1. **Frontend**: Built with React.
   - Components are organized in the `src/components` directory.
   - Services for backend communication are in the `src/services` directory.
   - Types are defined in the `src/types` directory.
2. **Backend**: Handles requests from the frontend.
   - Interacts with OpenAI for generating fortunes.
   - Manages user sessions and data.
3. **Database**: Stores user questions, interactions, and analytics.

### API Endpoints
| Method | Endpoint               | Description                  |
|--------|------------------------|------------------------------|
| POST   | `/api/saveUserData`    | Save user data from Telegram.|
| GET    | `/api/getUserData/:id` | Fetch user data by ID.       |
| POST   | `/api/ask`             | Submit a question for GPT.   |
| GET    | `/api/history`         | Fetch user interaction logs. |
| POST   | `/api/feedback`        | Submit user feedback.        |

---

## Developer Information
### Setup

1. Install dependencies:
   ```bash
   npm install