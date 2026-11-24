import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ToastProvider } from './context/ToastProvider.jsx'
import { DadosProvider } from './context/DadosProvider.jsx'
import { TimerProvider } from './context/TimerProvider.jsx'

// A ORDEM importa: quem usa precisa estar DENTRO de quem fornece.
// DadosProvider usa o Toast; TimerProvider usa os Dados.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <DadosProvider>
          <TimerProvider>
            <App />
          </TimerProvider>
        </DadosProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)