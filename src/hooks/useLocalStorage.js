import { useState, useEffect } from 'react'

// Hook personalizado: funciona como o useState, mas salva no navegador
// (localStorage), então os dados continuam ao recarregar a página.
// Todo hook começa com "use".
export function useLocalStorage(chave, valorInicial) {
  // Passar uma FUNÇÃO ao useState faz ela rodar só na primeira renderização.
  const [valor, setValor] = useState(() => {
    try {
      const salvo = localStorage.getItem(chave)
      // localStorage só guarda texto: JSON.parse converte de volta para objeto/array.
      return salvo !== null ? JSON.parse(salvo) : valorInicial
    } catch {
      return valorInicial // se algo der errado, usa o valor inicial
    }
  })

  // useEffect: roda DEPOIS da tela atualizar, sempre que "valor" mudar.
  // Aqui ele grava o valor novo no navegador.
  useEffect(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(valor)) // objeto -> texto
    } catch {
      // armazenamento cheio ou bloqueado: ignoramos
    }
  }, [chave, valor]) // lista de dependências: o efeito roda quando algum muda

  return [valor, setValor]
}