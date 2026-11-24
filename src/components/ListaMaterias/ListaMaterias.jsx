import CartaoMateria from '../CartaoMateria/CartaoMateria'
import './ListaMaterias.css'

function ListaMaterias({ materias, onEditar, onRemover }) {
    if (materias.length === 0) {
    return (
      <div className="vazio">
        <span className="vazio__icone">📚</span>
        <strong>Nenhuma matéria ainda</strong>
        <p>Use o formulário acima para cadastrar a primeira.</p>
      </div>
    )
  }

  return (
    <section className="lista">
      {materias.map((materia) => (
        <CartaoMateria
          key={materia.id}
          id={materia.id}
          nome={materia.nome}
          cor={materia.cor}
          metaHoras={materia.metaHoras}
          onEditar={onEditar}
          onRemover={onRemover}
        />
      ))}
    </section>
  )
}

export default ListaMaterias