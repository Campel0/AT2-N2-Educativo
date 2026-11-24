import { useState } from 'react'
import './CartaoMateria.css'

function CartaoMateria({ id, nome, cor, metaHoras, onRemover, onEditar }) {
  // editando = false: mostra o cartão normal. true: mostra o formulário de edição.
  const [editando, setEditando] = useState(false)
  const [nomeEdit, setNomeEdit] = useState(nome)
  const [metaEdit, setMetaEdit] = useState(metaHoras)
  const [corEdit, setCorEdit] = useState(cor)

  // Ao abrir, copia os valores ATUAIS para os campos
  function abrirEdicao() {
    setNomeEdit(nome)
    setMetaEdit(metaHoras)
    setCorEdit(cor)
    setEditando(true)
  }

  function salvar(evento) {
    evento.preventDefault()
    if (nomeEdit.trim() === '' || !(Number(metaEdit) > 0)) return

    onEditar(id, { nome: nomeEdit.trim(), metaHoras: Number(metaEdit), cor: corEdit })
    setEditando(false)
  }

  // Modo edição (return antecipado)
  if (editando) {
    return (
      <form
        className="cartao cartao--editando"
        style={{ borderLeftColor: corEdit }}
        onSubmit={salvar}
      >
        <div className="cartao__campos">
          <input
            className="cartao__input"
            value={nomeEdit}
            onChange={(e) => setNomeEdit(e.target.value)}
            aria-label="Nome da matéria"
          />
          <div className="cartao__linha">
            <input
              className="cartao__input cartao__input--curto"
              type="number"
              min="1"
              value={metaEdit}
              onChange={(e) => setMetaEdit(e.target.value)}
              aria-label="Meta de horas por semana"
            />
            <input
              className="cartao__cor"
              type="color"
              value={corEdit}
              onChange={(e) => setCorEdit(e.target.value)}
              aria-label="Cor da matéria"
            />
          </div>
        </div>
        <div className="cartao__acoes">
          <button type="submit" className="cartao__salvar">Salvar</button>
          <button type="button" className="cartao__cancelar" onClick={() => setEditando(false)}>
            Cancelar
          </button>
        </div>
      </form>
    )
  }

  // Modo normal
  return (
    <article className="cartao" style={{ borderLeftColor: cor }}>
      <div>
        <h3 className="cartao__nome">{nome}</h3>
        <p className="cartao__meta">Meta: {metaHoras}h por semana</p>
      </div>
      <div className="cartao__icones">
        <button className="cartao__editar" onClick={abrirEdicao} aria-label={`Editar ${nome}`}>
          ✎
        </button>
        <button
          className="cartao__remover"
          onClick={() => onRemover(id)}
          aria-label={`Remover ${nome}`}
        >
          ✕
        </button>
      </div>
    </article>
  )
}

export default CartaoMateria