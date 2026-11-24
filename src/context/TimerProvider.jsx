import { useState, useEffect } from 'react'
import { TimerContext } from './TimerContext'
import { useDados } from '../hooks/useDados'
import { formatarTempo } from '../utils/datas'

// O timer vive aqui (e não na tela Foco) para NÃO zerar quando você troca de página.
export function TimerProvider({ children }) {
  const { registrarSessao } = useDados()

  const [materiaId, setMateriaId] = useState('')
  const [duracao, setDuracao] = useState(25) // minutos escolhidos
  const [pausadoEm, setPausadoEm] = useState(25 * 60) // segundos restantes quando parado
  const [fimEm, setFimEm] = useState(null) // horário (ms) em que termina; null = parado
  const [agora, setAgora] = useState(() => Date.now()) // "relógio" que atualiza a tela

  const rodando = fimEm !== null

  // Dado derivado: se está rodando, calcula pela diferença entre o fim e agora.
  // Isso é mais preciso que "diminuir 1 por segundo" (não atrasa em aba inativa).
  const restante = rodando ? Math.max(0, Math.ceil((fimEm - agora) / 1000)) : pausadoEm
  const iniciou = rodando || restante < duracao * 60

  // Enquanto roda, atualiza "agora" 4x por segundo para a tela redesenhar.
  useEffect(() => {
    if (!rodando) return
    const intervalo = setInterval(() => setAgora(Date.now()), 250)
    return () => clearInterval(intervalo) // limpeza ao parar
  }, [rodando])

  // Quando chega a zero: registra a sessão completa e volta ao início.
  useEffect(() => {
    if (rodando && restante === 0) {
      registrarSessao({ materiaId: Number(materiaId), minutos: duracao })
      setFimEm(null)
      setPausadoEm(duracao * 60)
    }
  }, [rodando, restante, materiaId, duracao, registrarSessao])

  // Mostra o tempo na aba do navegador enquanto roda.
  useEffect(() => {
    document.title = rodando ? `${formatarTempo(restante)} · Chronos` : 'Chronos'
  }, [rodando, restante])

  function alternar() {
    if (rodando) {
      // Pausar: guarda quanto faltava e limpa o horário de fim
      setPausadoEm(restante)
      setFimEm(null)
    } else {
      // Iniciar/continuar: fim = agora + o que faltava
      const t = Date.now()
      setAgora(t)
      setFimEm(t + pausadoEm * 1000)
    }
  }

  function escolherDuracao(minutos) {
    setDuracao(minutos)
    setPausadoEm(minutos * 60)
  }

  function reiniciar() {
    setFimEm(null)
    setPausadoEm(duracao * 60)
  }

  // Encerra antes do fim e registra o tempo estudado (mínimo 1 minuto).
  function finalizar() {
    const decorrido = duracao * 60 - restante
    if (decorrido > 0) {
      registrarSessao({
        materiaId: Number(materiaId),
        minutos: Math.max(1, Math.round(decorrido / 60)),
      })
    }
    reiniciar()
  }

  const valor = {
    materiaId,
    setMateriaId,
    duracao,
    restante,
    rodando,
    iniciou,
    alternar,
    escolherDuracao,
    reiniciar,
    finalizar,
  }

  return <TimerContext.Provider value={valor}>{children}</TimerContext.Provider>
}
