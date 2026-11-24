import { useState } from 'react'
import { ToastContext } from './ToastContext'
import './Toast.css'

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  // tipo: 'sucesso' | 'info' | 'erro'
  function notificar(mensagem, tipo = 'sucesso') {
    const id = Date.now() + Math.random() // id único para a key
    setToasts((anterior) => [...anterior, { id, mensagem, tipo }])

    // Depois de 3 segundos, remove este aviso da lista
    setTimeout(() => {
      setToasts((anterior) => anterior.filter((t) => t.id !== id))
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ notificar }}>
      {children}
      {/* role="status" faz leitores de tela anunciarem o aviso */}
      <div className="toasts" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast--${t.tipo}`}>
            {t.mensagem}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}