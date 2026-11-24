import { useContext } from 'react'
import { TimerContext } from '../context/TimerContext'

export function useTimer() {
  const contexto = useContext(TimerContext)
  if (!contexto) {
    throw new Error('useTimer precisa estar dentro de <TimerProvider>')
  }
  return contexto
}