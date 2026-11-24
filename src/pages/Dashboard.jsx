import { Link } from 'react-router-dom'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { useDados } from '../hooks/useDados'
import { dataISO, diasAtras, formatarData, formatarMinutos } from '../utils/datas'
import './Dashboard.css'

// Quadradinho de resumo (usado só aqui)
function CartaoResumo({ icone, titulo, valor, alerta }) {
  return (
    <div className={alerta ? 'resumo__item resumo__item--alerta' : 'resumo__item'}>
      <span className="resumo__icone" aria-hidden="true">{icone}</span>
      <div>
        <span className="resumo__valor">{valor}</span>
        <span className="resumo__titulo">{titulo}</span>
      </div>
    </div>
  )
}

function maiuscula(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

// Soma os minutos de uma lista de sessões.
function somar(sessoes) {
  return sessoes.reduce((total, s) => total + s.minutos, 0)
}

function Dashboard() {
  const { materias, tarefas, sessoes } = useDados()

  // ---------- Saudação ----------
  const agora = new Date()
  const hora = agora.getHours()
  const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite'
  const dataExtenso = maiuscula(
    agora.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
  )

  // ---------- Tarefas ----------
  const hoje = dataISO()
  const pendentes = tarefas.filter((t) => !t.concluida)
  const concluidas = tarefas.length - pendentes.length
  const atrasadas = pendentes.filter((t) => t.prazo < hoje).length

  const proximos = [...pendentes].sort((a, b) => a.prazo.localeCompare(b.prazo)).slice(0, 3)

  // ---------- Estudo ----------
  const inicioSemana = diasAtras(6)
  const sessoesSemana = sessoes.filter((s) => s.data >= inicioSemana)
  const minutosSemana = somar(sessoesSemana)
  const minutosHoje = somar(sessoes.filter((s) => s.data === hoje))

  // Progresso de cada matéria em relação à meta semanal
  const progresso = materias.map((m) => {
    const minutos = somar(sessoesSemana.filter((s) => s.materiaId === m.id))
    const metaMin = m.metaHoras * 60
    return {
      ...m,
      minutos,
      percentual: Math.min(100, Math.round((minutos / metaMin) * 100)),
      faltam: Math.max(0, metaMin - minutos),
    }
  })

  // Sugestão: a matéria que mais está devendo para a meta
  const sugestao = [...progresso]
    .filter((p) => p.faltam > 0)
    .sort((a, b) => b.faltam - a.faltam)[0]

  // Sequência: quantos dias seguidos com estudo.
  // Se hoje ainda não estudou, começa a contar de ontem (não "perde" a sequência no mesmo dia).
  const diasComEstudo = new Set(sessoes.map((s) => s.data))
  let sequencia = 0
  let i = diasComEstudo.has(hoje) ? 0 : 1
  while (diasComEstudo.has(diasAtras(i))) {
    sequencia++
    i++
  }

  // Dados do gráfico: minutos estudados em cada um dos últimos 7 dias
  const porDia = Array.from({ length: 7 }, (_, k) => {
    const data = diasAtras(6 - k)
    // T12:00 evita o bug de fuso horário ao criar a data
    const dia = new Date(`${data}T12:00:00`)
      .toLocaleDateString('pt-BR', { weekday: 'short' })
      .replace('.', '')
    return { dia, minutos: somar(sessoes.filter((s) => s.data === data)) }
  })

  // Textos do banner
  const parteTarefas =
    pendentes.length === 0
      ? 'Nenhuma tarefa pendente'
      : `${pendentes.length} ${pendentes.length === 1 ? 'tarefa pendente' : 'tarefas pendentes'}`
  const parteEstudo =
    minutosHoje > 0 ? `${formatarMinutos(minutosHoje)} de estudo hoje` : 'ainda sem estudo hoje'

  return (
    <>
      {/* ===== Banner ===== */}
      <section className="hero">
        <div className="hero__texto">
          <p className="hero__data">{dataExtenso}</p>
          <h2 className="hero__titulo">{saudacao}! 👋</h2>
          <p className="hero__resumo">
            {parteTarefas} · {parteEstudo}
          </p>
        </div>

        <div className="hero__sugestao">
          {materias.length === 0 ? (
            <>
              <p>Comece cadastrando sua primeira matéria.</p>
              <Link className="hero__botao" to="/materias">Cadastrar matéria →</Link>
            </>
          ) : sugestao ? (
            <>
              <p>
                💡 <strong>Sugestão de hoje:</strong> estude <strong>{sugestao.nome}</strong>.
                Faltam {formatarMinutos(sugestao.faltam)} para a meta da semana.
              </p>
              <Link className="hero__botao" to="/foco">Iniciar foco →</Link>
            </>
          ) : (
            <p>🏆 Você bateu todas as metas desta semana. Excelente!</p>
          )}
        </div>
      </section>

      {/* ===== Resumo ===== */}
      <section className="resumo">
        <CartaoResumo icone="📝" titulo="Tarefas pendentes" valor={pendentes.length} />
        <CartaoResumo icone="✅" titulo="Concluídas" valor={concluidas} />
        <CartaoResumo icone="⚠️" titulo="Atrasadas" valor={atrasadas} alerta={atrasadas > 0} />
        <CartaoResumo icone="⏱️" titulo="Estudo (7 dias)" valor={formatarMinutos(minutosSemana)} />
        <CartaoResumo
          icone="🔥"
          titulo="Sequência de estudo"
          valor={`${sequencia} ${sequencia === 1 ? 'dia' : 'dias'}`}
        />
      </section>

      {/* ===== Metas + gráfico ===== */}
      <div className="duas-colunas">
        <section className="painel">
          <h3 className="painel__titulo">Metas da semana</h3>
          {progresso.length === 0 ? (
            <div className="vazio">
              <span className="vazio__icone">🎯</span>
              <strong>Sem metas ainda</strong>
              <p>Cadastre matérias para acompanhar o progresso.</p>
            </div>
          ) : (
            <ul className="metas">
              {progresso.map((p) => (
                <li key={p.id}>
                  <div className="metas__topo">
                    <span className="metas__nome">
                      <span className="metas__cor" style={{ backgroundColor: p.cor }} />
                      {p.nome}
                    </span>
                    <span className="metas__valor">
                      {formatarMinutos(p.minutos)} / {p.metaHoras}h {p.percentual >= 100 && '✅'}
                    </span>
                  </div>
                  <div
                    className="metas__barra"
                    role="progressbar"
                    aria-label={`Meta semanal de ${p.nome}`}
                    aria-valuenow={p.percentual}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="metas__preenchida"
                      style={{ width: `${p.percentual}%`, backgroundColor: p.cor }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="painel">
          <h3 className="painel__titulo">Estudo por dia (minutos)</h3>
          <div className="painel__grafico">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={porDia}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="dia" axisLine={false} tickLine={false} />
                <YAxis width={36} allowDecimals={false} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: 'rgba(99, 102, 241, 0.08)' }}
                  contentStyle={{
                    background: 'var(--cor-superficie)',
                    border: '1px solid var(--cor-borda)',
                    borderRadius: 10,
                    color: 'var(--cor-texto)',
                  }}
                  labelStyle={{ color: 'var(--cor-texto)' }}
                  formatter={(valor) => [`${valor} min`, 'Estudo']}
                />
                <Bar dataKey="minutos" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* ===== Próximos prazos ===== */}
      <section className="painel">
        <div className="painel__topo">
          <h3 className="painel__titulo">Próximos prazos</h3>
          <Link className="painel__link" to="/tarefas">Ver todas</Link>
        </div>

        {proximos.length === 0 ? (
          <div className="vazio">
            <span className="vazio__icone">🎉</span>
            <strong>Tudo em dia!</strong>
            <p>Nenhuma tarefa pendente no momento.</p>
          </div>
        ) : (
          <ul className="prazos">
            {proximos.map((tarefa) => {
              const materia = materias.find((m) => m.id === tarefa.materiaId)
              const atrasada = tarefa.prazo < hoje
              return (
                <li key={tarefa.id} className="prazos__item">
                  <span className="prazos__cor" style={{ backgroundColor: materia?.cor }} />
                  <div className="prazos__texto">
                    <strong>{tarefa.titulo}</strong>
                    <span>{materia?.nome}</span>
                  </div>
                  <span
                    className={atrasada ? 'prazos__data prazos__data--atrasada' : 'prazos__data'}
                  >
                    {atrasada ? 'Atrasada · ' : ''}
                    {formatarData(tarefa.prazo)}
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </>
  )
}

export default Dashboard