import { useState } from 'react'
import './FormTarefa.css'

function FormTarefa({ materias, onAdicionar }) {
  const [titulo, setTitulo] = useState('')
  const [materiaId, setMateriaId] = useState('')
  const [prazo, setPrazo] = useState('')
  const [erro, setErro] = useState('')

  const semMaterias = materias.length === 0

  function handleSubmit(evento) {
    evento.preventDefault()

    if (titulo.trim() === '') {
      setErro('Descreva a tarefa.')
      return
    }
    if (materiaId === '') {
      setErro('Escolha a matéria da tarefa.')
      return
    }
    if (prazo === '') {
      setErro('Escolha o prazo.')
      return
    }

    setErro('')
    onAdicionar({ titulo: titulo.trim(), materiaId: Number(materiaId), prazo })
    setTitulo('')
    setPrazo('')
  }

  return (
    <form className="form-tarefa" onSubmit={handleSubmit}>
      <input
        className="form-tarefa__campo"
        type="text"
        placeholder="O que você precisa estudar?"
        value={titulo}
        onChange={(e) => {
          setTitulo(e.target.value)
          setErro('')
        }}
        disabled={semMaterias}
      />
      <select
        className="form-tarefa__campo form-tarefa__campo--curto"
        value={materiaId}
        onChange={(e) => {
          setMateriaId(e.target.value)
          setErro('')
        }}
        disabled={semMaterias}
      >
        <option value="">Matéria...</option>
        {materias.map((materia) => (
          <option key={materia.id} value={materia.id}>
            {materia.nome}
          </option>
        ))}
      </select>
      <input
        className="form-tarefa__campo form-tarefa__campo--curto"
        type="date"
        value={prazo}
        onChange={(e) => {
          setPrazo(e.target.value)
          setErro('')
        }}
        disabled={semMaterias}
      />
      <button className="form-tarefa__botao" type="submit" disabled={semMaterias}>
        Adicionar
      </button>
      {semMaterias && (
        <p className="form-tarefa__aviso">Cadastre uma matéria antes de criar tarefas.</p>
      )}
      {erro && (
        <p className="form-tarefa__erro" role="alert">
          {erro}
        </p>
      )}
    </form>
  )
}

export default FormTarefa