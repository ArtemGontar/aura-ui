import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import './index.css'
import App from './App.tsx'
import './i18n';
import { AppRoot } from '@telegram-apps/telegram-ui'
import '@telegram-apps/telegram-ui/dist/styles.css';
import "./styles/theme.css";

createRoot(document.getElementById('root')!).render(
  <AppRoot id="telegram-root">
    <Provider store={store}>
      <App />
    </Provider>
  </AppRoot>

)
