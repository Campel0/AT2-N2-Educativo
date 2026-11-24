import FormMateria from '../components/FormMateria/FormMateria'
import ListaMaterias from '../components/ListaMaterias/ListaMaterias'
import { useDados } from '../hooks/useDados'

function PaginaMaterias() {
  const { materias, adicionarMateria, editarMateria, removerMateria } = useDados()

  return (
    <>
      <h2 className="pagina__titulo">Matérias</h2>
      <FormMateria materias={materias} onAdicionar={adicionarMateria} />
      <ListaMaterias materias={materias} onEditar={editarMateria} onRemover={removerMateria} />
    </>
  )
}

export default PaginaMaterias