import { Routes, Route, Link } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard'
import PaginaMaterias from './pages/PaginaMaterias'
import PaginaTarefas from './pages/PaginaTarefas'
import Foco from './pages/Foco'

function App() {
  return (
    // Routes escolhe qual Route combina com o endereço atual do navegador.
    <Routes>
      {/* Rota "pai" sem path: todas as filhas aparecem dentro do Layout */}
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} /> {/* index = endereço "/" */}
        <Route path="materias" element={<PaginaMaterias />} />
        <Route path="tarefas" element={<PaginaTarefas />} />
        <Route path="foco" element={<Foco />} />
        {/* "*" pega qualquer endereço que não existe */}
        <Route
          path="*"
          element={
            <div>
              <h2 className="pagina__titulo">Página não encontrada</h2>
              <Link to="/">Voltar ao Dashboard</Link>
            </div>
          }
        />
      </Route>
    </Routes>
  )
}

export default App