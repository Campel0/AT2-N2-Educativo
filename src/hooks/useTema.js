import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

// Se o usuário nunca escolheu, usa o tema do sistema operacional.
function temaDoSistema() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro'
}

export function useTema() {
  const [tema, setTema] = useLocalStorage('fixgo:tema', temaDoSistema())

  // Escreve data-tema="escuro" na tag <html>. O CSS reage a esse atributo.
  useEffect(() => {
    document.documentElement.dataset.tema = tema
  }, [tema])

  function alternarTema() {
    setTema((atual) => (atual === 'escuro' ? 'claro' : 'escuro'))
  }

  return { tema, alternarTema }
}