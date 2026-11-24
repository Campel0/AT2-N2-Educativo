import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useTimer } from '../../hooks/useTimer'
import { useTema } from '../../hooks/useTema'
import { formatarTempo } from '../../utils/datas'
import './Layout.css'

const LINKS = [
  { to: '/', rotulo: 'Dashboard', icone: '📊', end: true },
  { to: '/materias', rotulo: 'Matérias', icone: '📚' },
  { to: '/tarefas', rotulo: 'Tarefas', icone: '✅' },
  { to: '/foco', rotulo: 'Foco', icone: '⏱️' },
]

function Layout() {
  const { rodando, iniciou, restante } = useTimer()
  const { tema, alternarTema } = useTema()
  const { pathname } = useLocation() // endereço atual (ex.: '/tarefas')

  return (
    <div className="layout">
      <aside className="menu">
        <div className="menu__marca">
          <span className="menu__icone" aria-hidden="true">🎯</span>
          <div>
            <h1 className="menu__logo">Chronos</h1>
            <p className="menu__frase">Organize seus estudos</p>
          </div>
        </div>

        <nav className="menu__nav">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                isActive ? 'menu__link menu__link--ativo' : 'menu__link'
              }
            >
              <span aria-hidden="true">{link.icone}</span>
              {link.rotulo}
            </NavLink>
          ))}
        </nav>

        <div className="menu__rodape">
          {/* Só aparece com foco em andamento ou pausado */}
          {iniciou && (
            <NavLink to="/foco" className="menu__timer">
              <span>{rodando ? '🔴 Em foco' : '⏸️ Pausado'}</span>
              <strong>{formatarTempo(restante)}</strong>
            </NavLink>
          )}

          <button className="menu__tema" onClick={alternarTema}>
            {tema === 'escuro' ? '☀️ Tema claro' : '🌙 Tema escuro'}
          </button>
        </div>
      </aside>

      <main className="conteudo">
        {/* key={pathname}: a cada troca de tela o React recria esta div,
            e a animação de entrada (fade) toca de novo */}
        <div key={pathname} className="pagina">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout