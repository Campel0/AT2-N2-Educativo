import FormTarefa from '../components/FormTarefa/FormTarefa'
import ListaTarefas from '../components/ListaTarefas/ListaTarefas'
import { useDados } from '../hooks/useDados'

function PaginaTarefas() {
  const { materias, tarefas, adicionarTarefa, editarTarefa, alternarTarefa, removerTarefa } =
    useDados()

  return (
    <>
      <h2 className="pagina__titulo">Tarefas</h2>
      <FormTarefa materias={materias} onAdicionar={adicionarTarefa} />
      <ListaTarefas
        tarefas={tarefas}
        materias={materias}
        onAlternar={alternarTarefa}
        onEditar={editarTarefa}
        onRemover={removerTarefa}
      />
    </>
  )
}

export default PaginaTarefas