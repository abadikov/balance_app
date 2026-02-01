import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/app/App'
import '@/styles/index.css'

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void
        expand: () => void
        close: () => void
        themeParams?: { bg_color?: string }
        setHeaderColor?: (color: string) => void
      }
    }
  }
}

const root = document.getElementById('root')
if (root) {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready()
    window.Telegram.WebApp.expand()
  }
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
