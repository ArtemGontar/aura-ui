import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import './index.css'
import App from './App.tsx'
import './i18n';
import { AppRoot } from '@telegram-apps/telegram-ui'
import '@telegram-apps/telegram-ui/dist/styles.css';
import "./styles/theme.css";
import telegramAnalytics from '@telegram-apps/analytics';

telegramAnalytics.init({
    token: 'eyJhcHBfbmFtZSI6ImF1cmFfYW5hbHl0aWNzIiwiYXBwX3VybCI6Imh0dHBzOi8vdC5tZS9hdXJhX2ZvcnR1bmVfYm90IiwiYXBwX2RvbWFpbiI6Imh0dHBzOi8vYXVyYS11aS52ZXJjZWwuYXBwLyJ9!BS9oUr1Qmzi2bW5wbcxUp1Ls30MdBZxjFXKUU705Vxk=', // SDK Auth token received via @DataChief_bot
    appName: 'aura_analytics', // The analytics identifier you entered in @DataChief_bot
});

createRoot(document.getElementById('root')!).render(
  <AppRoot id="telegram-root">
    <Provider store={store}>
      <App />
    </Provider>
  </AppRoot>

)
