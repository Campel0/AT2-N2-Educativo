import { Link } from 'react-router-dom'
import { useDados } from '../hooks/useDados'
import { useTimer } from '../hooks/useTimer'
import { dataISO, formatarData, formatarTempo } from '../utils/datas'
import './Foco.css'

const DURACOES = [
  { minutos: 1, rotulo: '1 min (demo)' },
  { minutos: 15, rotulo: '15 min' },
  { minutos: 25, rotulo: '25 min' },
  { minutos: 45, rotulo: '45 min' },
]

// Medidas do anel (SVG): r = raio; circunferência = 2·π·r
const RAIO = 100
const CIRCUNFERENCIA = 2 * Math.PI * RAIO

function Foco() {
  const { materias, sessoes } = useDados()
  const {
    materiaId, setMateriaId, duracao, restante, rodando, iniciou,
    alternar, escolherDuracao, reiniciar, finalizar,
  } = useTimer()

  // Progresso (0 a 100) e quanto do anel fica "vazio"
  const total = duracao * 60
  const progresso = ((total - restante) / total) * 100
  const deslocamento = CIRCUNFERENCIA * (1 - progresso / 100)

  // O anel usa a cor da matéria escolhida
  const materiaAtual = materias.find((m) => m.id === Number(materiaId))

  const hoje = dataISO()
  const minutosHoje = sessoes
    .filter((s) => s.data === hoje)
    .reduce((soma, s) => soma + s.minutos, 0)
  const recentes = [...sessoes].sort((a, b) => b.id - a.id).slice(0, 5)

  // Sem matérias não há o que focar: mostra estado vazio com link
  if (materias.length === 0) {
    return (
      <>
        <h2 className="pagina__titulo">Foco</h2>
        <div className="vazio">
          <span className="vazio__icone">📚</span>
          <strong>Cadastre uma matéria primeiro</strong>
          <p>
            O foco registra o tempo de estudo em uma matéria.{' '}
            <Link to="/materias">Ir para Matérias</Link>
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      <h2 className="pagina__titulo">Foco</h2>

      <section className="foco">
        <div className="foco__opcoes">
          <select
            className="foco__campo"
            value={materiaId}
            onChange={(e) => setMateriaId(e.target.value)}
            disabled={iniciou}
            aria-label="Matéria da sessão"
          >
            <option value="">Escolha a matéria...</option>
            {materias.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nome}
              </option>
            ))}
          </select>

          <div className="foco__duracoes">
            {DURACOES.map((d) => (
              <button
                key={d.minutos}
                className={
                  duracao === d.minutos ? 'foco__duracao foco__duracao--ativa' : 'foco__duracao'
                }
                onClick={() => escolherDuracao(d.minutos)}
                disabled={iniciou}
              >
                {d.rotulo}
              </button>
            ))}
          </div>
        </div>

        {/* Anel de progresso: dois círculos sobrepostos.
            strokeDasharray = tamanho total da linha; strokeDashoffset = quanto está "escondido" */}
        <div className={rodando ? 'anel anel--ativo' : 'anel'}>
          <svg className="anel__svg" viewBox="0 0 250 250" aria-hidden="true">
            <circle className="anel__fundo" cx="125" cy="125" r={RAIO} />
            <circle
              className="anel__progresso"
              cx="125"
              cy="125"
              r={RAIO}
              strokeDasharray={CIRCUNFERENCIA}
              strokeDashoffset={deslocamento}
              style={materiaAtual ? { stroke: materiaAtual.cor } : undefined}
            />
          </svg>
          <div className="anel__texto">
            <span className="anel__tempo">{formatarTempo(restante)}</span>
            <span className="anel__estado">
              {rodando ? 'Em foco' : iniciou ? 'Pausado' : 'Pronto'}
            </span>
          </div>
        </div>

        <div className="foco__botoes">
          <button className="botao" onClick={alternar} disabled={materiaId === ''}>
            {rodando ? 'Pausar' : iniciou ? 'Continuar' : 'Iniciar'}
          </button>
          <button className="botao botao--secundario" onClick={finalizar} disabled={!iniciou}>
            Finalizar e registrar
          </button>
          <button className="botao botao--secundario" onClick={reiniciar} disabled={!iniciou}>
            Descartar
          </button>
        </div>

        {materiaId === '' && <p className="foco__aviso">Escolha uma matéria para começar.</p>}
      </section>

      <h3 className="pagina__subtitulo">Hoje: {minutosHoje} min de estudo</h3>

      {recentes.length === 0 ? (
        <div className="vazio">
          <span className="vazio__icone">⏱️</span>
          <strong>Nenhuma sessão ainda</strong>
          <p>Complete uma sessão de foco para ver o histórico aqui.</p>
        </div>
      ) : (
        <ul className="historico">
          {recentes.map((s) => {
            const materia = materias.find((m) => m.id === s.materiaId)
            return (
              <li key={s.id} className="historico__item">
                <span className="historico__cor" style={{ backgroundColor: materia?.cor }} />
                <span className="historico__nome">{materia?.nome}</span>
                <span>{s.minutos} min</span>
                <span className="historico__data">{formatarData(s.data)}</span>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}

export default Foco