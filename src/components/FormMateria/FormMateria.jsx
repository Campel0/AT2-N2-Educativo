import { useState } from 'react'
import './FormMateria.css'

// Agora recebe "materias" também, para impedir nomes repetidos.
function FormMateria({ materias, onAdicionar }) {
  const [nome, setNome] = useState('')
  const [metaHoras, setMetaHoras] = useState('')
  const [cor, setCor] = useState('#4f46e5')
  const [erro, setErro] = useState('') // mensagem de erro atual ('' = sem erro)

  function handleSubmit(evento) {
    evento.preventDefault()
    const nomeLimpo = nome.trim()

    // Cada validação mostra uma mensagem clara e interrompe o envio.
    if (nomeLimpo === '') {
      setErro('Informe o nome da matéria.')
      return
    }
    if (!(Number(metaHoras) > 0)) {
      setErro('Informe uma meta de horas maior que zero.')
      return
    }
    // some = "existe pelo menos um que...?"
    const duplicada = materias.some((m) => m.nome.toLowerCase() === nomeLimpo.toLowerCase())
    if (duplicada) {
      setErro('Você já tem uma matéria com esse nome.')
      return
    }

    setErro('')
    onAdicionar({ nome: nomeLimpo, cor, metaHoras: Number(metaHoras) })
    setNome('')
    setMetaHoras('')
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="form__campo"
        type="text"
        placeholder="Nome da matéria"
        value={nome}
        onChange={(e) => {
          setNome(e.target.value)
          setErro('') // ao digitar, o erro some
        }}
      />
      <input
        className="form__campo form__campo--curto"
        type="number"
        min="1"
        placeholder="Meta (h/semana)"
        value={metaHoras}
        onChange={(e) => {
          setMetaHoras(e.target.value)
          setErro('')
        }}
      />
      <input
        className="form__cor"
        type="color"
        value={cor}
        onChange={(e) => setCor(e.target.value)}
        aria-label="Cor da matéria"
      />
      <button className="form__botao" type="submit">
        Adicionar
      </button>
      {/* role="alert" faz leitores de tela anunciarem o erro */}
      {erro && (
        <p className="form__erro" role="alert">
          {erro}
        </p>
      )}
    </form>
  )
}

export default FormMateria