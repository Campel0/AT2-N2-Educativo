import { useState } from 'react'
import { dataISO, formatarData } from '../../utils/datas'
import './ItemTarefa.css'

function ItemTarefa({ tarefa, nomeMateria, cor, onAlternar, onRemover, onEditar }) {
  const { id, titulo, prazo, concluida } = tarefa

  const [editando, setEditando] = useState(false)
  const [tituloEdit, setTituloEdit] = useState(titulo)
  const [prazoEdit, setPrazoEdit] = useState(prazo)

  function abrirEdicao() {
    setTituloEdit(titulo)
    setPrazoEdit(prazo)
    setEditando(true)
  }

  function salvar(evento) {
    evento.preventDefault()
    if (tituloEdit.trim() === '' || prazoEdit === '') return

    onEditar(id, { titulo: tituloEdit.trim(), prazo: prazoEdit })
    setEditando(false)
  }

  // Modo edição
  if (editando) {
    return (
      <li className="item item--editando" style={{ borderLeftColor: cor }}>
        <form className="item__form" onSubmit={salvar}>
          <input
            className="item__input"
            value={tituloEdit}
            onChange={(e) => setTituloEdit(e.target.value)}
            aria-label="Título da tarefa"
          />
          <input
            className="item__input item__input--data"
            type="date"
            value={prazoEdit}
            onChange={(e) => setPrazoEdit(e.target.value)}
            aria-label="Prazo da tarefa"
          />
          <button type="submit" className="item__salvar">Salvar</button>
          <button type="button" className="item__cancelar" onClick={() => setEditando(false)}>
            Cancelar
          </button>
        </form>
      </li>
    )
  }

  // Modo normal
  const atrasada = !concluida && prazo < dataISO()

  const classes = ['item']
  if (concluida) classes.push('item--concluida')
  if (atrasada) classes.push('item--atrasada')

  return (
    <li className={classes.join(' ')} style={{ borderLeftColor: cor }}>
      <input
        className="item__check"
        type="checkbox"
        checked={concluida}
        onChange={() => onAlternar(id)}
        aria-label={`Marcar "${titulo}" como concluída`}
      />
      <div className="item__texto">
        <span className="item__titulo">{titulo}</span>
        <span className="item__info">
          {nomeMateria} · Prazo: {formatarData(prazo)}
          {atrasada && <strong className="item__alerta"> · Atrasada</strong>}
        </span>
      </div>
      <div className="item__acoes">
        <button className="item__editar" onClick={abrirEdicao} aria-label={`Editar ${titulo}`}>
          ✎
        </button>
        <button
          className="item__remover"
          onClick={() => onRemover(id)}
          aria-label={`Remover tarefa ${titulo}`}
        >
          ✕
        </button>
      </div>
    </li>
  )
}

export default ItemTarefa