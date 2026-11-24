import { useContext } from 'react'
import { DadosContext } from '../context/DadosContext'

// Atalho: nas telas basta escrever  const { materias } = useDados()
export function useDados() {
  const contexto = useContext(DadosContext)
  if (!contexto) {
    throw new Error('useDados precisa estar dentro de <DadosProvider>')
  }
  return contexto
}