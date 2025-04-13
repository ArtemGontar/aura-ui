# Aura

Aura is a web application that provides various types of predictions and user interactions. It integrates with the Telegram API to fetch user data and displays personalized content.

## Features

- Fetches user data from the Telegram API.
- Displays a personalized welcome message.
- Shows a daily prediction streak.
- Provides various types of predictions including Horoscope, Compatibility, DreemBook, Psychology of Success, MagicBall, Tarot.

## Project Structure

1. **Frontend**: Built with React.
   - Components are organized in the `src/components` directory.
   - Services for backend communication are in the `src/services` directory.
     - `userService`: Manages user data operations such as fetching, updating, and deleting user data.
     - `userStatsService`: Handles user statistics like streaks and crystal balances.
     - `predictionService`: Provides prediction-related functionalities like horoscopes, compatibility, and affirmations.
     - `meditationService`: Fetches meditation-related data.
   - Types are defined in the `src/types` directory.
2. **Backend**: Handles requests from the frontend.
   - Interacts with OpenAI for generating fortunes.
   - Manages user sessions and data.
3. **Database**: Stores user questions, interactions, and analytics.

---

## Developer Information
### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build the project for production:
   ```bash
   npm run build
   ```

4. Preview the production build:
   ```bash
   npm run preview
   ```

5. Run tests:
   ```bash
   npm test
   ```

6. Lint and format the code:
   ```bash
   npm run lint
   npm run format
   ```
