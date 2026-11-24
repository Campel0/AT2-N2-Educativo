import { useState } from 'react'
import ItemTarefa from '../ItemTarefa/ItemTarefa'
import './ListaTarefas.css'

// Botões de filtro. Para criar um filtro novo, basta acrescentar uma linha.
const FILTROS = [
  { valor: 'todas', rotulo: 'Todas' },
  { valor: 'pendentes', rotulo: 'Pendentes' },
  { valor: 'concluidas', rotulo: 'Concluídas' },
]

function ListaTarefas({ tarefas, materias, onAlternar, onEditar, onRemover }) {
  // Estado LOCAL: só esta lista se importa com o filtro escolhido
  const [filtro, setFiltro] = useState('todas')

  // Dados derivados (calculados a cada renderização, sem useState)
  const pendentes = tarefas.filter((tarefa) => !tarefa.concluida).length

  const tarefasVisiveis = tarefas
    .filter((tarefa) => {
      if (filtro === 'pendentes') return !tarefa.concluida
      if (filtro === 'concluidas') return tarefa.concluida
      return true // 'todas'
    })
    // ordena pelo prazo mais próximo (filter já criou um array novo, então é seguro)
    .sort((a, b) => a.prazo.localeCompare(b.prazo))

  return (
    <section>
      <div className="tarefas__topo">
        <p className="tarefas__contador">
          {pendentes} {pendentes === 1 ? 'pendente' : 'pendentes'} de {tarefas.length}
        </p>
        <div className="tarefas__filtros">
          {FILTROS.map((f) => (
            <button
              key={f.valor}
              className={
                filtro === f.valor
                  ? 'tarefas__filtro tarefas__filtro--ativo'
                  : 'tarefas__filtro'
              }
              onClick={() => setFiltro(f.valor)}
            >
              {f.rotulo}
            </button>
          ))}
        </div>
      </div>

      {tarefasVisiveis.length === 0 ? (
                <div className="vazio">
                  <span className="vazio__icone">🎉</span>
                  <strong>Nada por aqui</strong>
                  <p>Nenhuma tarefa neste filtro.</p>
                </div>
      ) : (
        <ul className="tarefas__lista">
          {tarefasVisiveis.map((tarefa) => {
            // find: procura a matéria dona da tarefa (como um JOIN no SQL)
            const materia = materias.find((m) => m.id === tarefa.materiaId)
            return (
              <ItemTarefa
                key={tarefa.id}
                tarefa={tarefa}
                nomeMateria={materia?.nome}
                cor={materia?.cor}
                onAlternar={onAlternar}
                onEditar={onEditar}
                onRemover={onRemover}
              />
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default ListaTarefas