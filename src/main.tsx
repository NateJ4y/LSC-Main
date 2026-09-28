import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {inject, type BeforeSendEvent} from '@vercel/analytics';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';
import './header-overrides.css';

inject({
  beforeSend: (event: BeforeSendEvent) => {
    if (event.url.includes('/admin') || window.location.hash.toLowerCase().includes('#admin')) {
      return null;
    }
    return event;
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
