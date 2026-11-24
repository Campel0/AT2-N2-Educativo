import { DadosContext } from './DadosContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useToast } from '../hooks/useToast'
import { diasAtras, dataISO } from '../utils/datas'

// Dados de exemplo (apague depois de gravar o vídeo, se quiser)
const materiasIniciais = [
  { id: 1, nome: 'Banco de Dados', cor: '#4f46e5', metaHoras: 6 },
  { id: 2, nome: 'Engenharia de Software', cor: '#059669', metaHoras: 4 },
]

const tarefasIniciais = [
  { id: 1, materiaId: 1, titulo: 'Revisar modelagem ER', prazo: '2026-11-30', concluida: false },
  { id: 2, materiaId: 2, titulo: 'Ler capítulo de requisitos', prazo: '2026-11-26', concluida: true },
]

const sessoesIniciais = [
  { id: 1, materiaId: 1, minutos: 90, data: diasAtras(1) },
  { id: 2, materiaId: 2, minutos: 60, data: diasAtras(2) },
  { id: 3, materiaId: 1, minutos: 45, data: diasAtras(3) },
]

export function DadosProvider({ children }) {
  const { notificar } = useToast() // para mostrar avisos ao usuário

  const [materias, setMaterias] = useLocalStorage('fixgo:materias', materiasIniciais)
  const [tarefas, setTarefas] = useLocalStorage('fixgo:tarefas', tarefasIniciais)
  const [sessoes, setSessoes] = useLocalStorage('fixgo:sessoes', sessoesIniciais)

  // ---------- MATÉRIAS ----------
  function adicionarMateria(nova) {
    setMaterias((anterior) => [...anterior, { ...nova, id: Date.now() }])
    notificar('Matéria adicionada!')
  }

  // dados = só os campos que mudaram. {...m, ...dados} copia e sobrescreve.
  function editarMateria(id, dados) {
    setMaterias((anterior) => anterior.map((m) => (m.id === id ? { ...m, ...dados } : m)))
    notificar('Matéria atualizada!')
  }

  function removerMateria(id) {
    const materia = materias.find((m) => m.id === id)
    const qtdTarefas = tarefas.filter((t) => t.materiaId === id).length

    // confirm = caixa nativa do navegador (OK / Cancelar)
    const aviso =
      qtdTarefas > 0
        ? `Remover "${materia?.nome}" também apagará ${qtdTarefas} tarefa(s) e as sessões de foco dela. Continuar?`
        : `Remover "${materia?.nome}"?`
    if (!window.confirm(aviso)) return

    setMaterias((anterior) => anterior.filter((m) => m.id !== id))
    setTarefas((anterior) => anterior.filter((t) => t.materiaId !== id))
    setSessoes((anterior) => anterior.filter((s) => s.materiaId !== id))
    notificar('Matéria removida', 'info')
  }

  // ---------- TAREFAS ----------
  function adicionarTarefa(nova) {
    setTarefas((anterior) => [...anterior, { ...nova, id: Date.now(), concluida: false }])
    notificar('Tarefa adicionada!')
  }

  function editarTarefa(id, dados) {
    setTarefas((anterior) => anterior.map((t) => (t.id === id ? { ...t, ...dados } : t)))
    notificar('Tarefa atualizada!')
  }

  function alternarTarefa(id) {
    const tarefa = tarefas.find((t) => t.id === id)
    // Só comemora quando está CONCLUINDO (e não ao desmarcar)
    if (tarefa && !tarefa.concluida) notificar('Tarefa concluída! 🎉')

    setTarefas((anterior) =>
      anterior.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t))
    )
  }

  function removerTarefa(id) {
    setTarefas((anterior) => anterior.filter((t) => t.id !== id))
    notificar('Tarefa removida', 'info')
  }

  // ---------- SESSÕES DE FOCO ----------
  function registrarSessao({ materiaId, minutos }) {
    setSessoes((anterior) => [
      ...anterior,
      { id: Date.now(), materiaId, minutos, data: dataISO() },
    ])
    notificar(`Sessão de ${minutos} min registrada! 💪`)
  }

  const valor = {
    materias,
    tarefas,
    sessoes,
    adicionarMateria,
    editarMateria,
    removerMateria,
    adicionarTarefa,
    editarTarefa,
    alternarTarefa,
    removerTarefa,
    registrarSessao,
  }

  return <DadosContext.Provider value={valor}>{children}</DadosContext.Provider>
}