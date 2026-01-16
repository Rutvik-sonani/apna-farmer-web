import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { store } from './redux/store'
import { initializeAuth } from './utils/authInit'
import { LanguageProvider } from './contexts/LanguageContext'

// Initialize auth state from localStorage
initializeAuth();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
