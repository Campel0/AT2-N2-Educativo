// Funções de data usadas em várias telas.
// Formato padrão do sistema: 'AAAA-MM-DD' (o mesmo do <input type="date">).

// Devolve a data (hoje, por padrão) como 'AAAA-MM-DD' no fuso local.
// O locale 'en-CA' (Canadá) usa esse formato.
export function dataISO(data = new Date()) {
  return data.toLocaleDateString('en-CA')
}

// Devolve a data de N dias atrás. Ex.: diasAtras(1) = ontem.
export function diasAtras(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return dataISO(d)
}

// Converte '2026-11-30' em '30/11/2026'.
// Usamos split em vez de new Date() para evitar o bug de fuso (dia a menos).
export function formatarData(iso) {
  const [ano, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${ano}`
}

// 1500 segundos -> '25:00'. padStart completa com zero à esquerda.
export function formatarTempo(segundos) {
  const m = String(Math.floor(segundos / 60)).padStart(2, '0')
  const s = String(segundos % 60).padStart(2, '0')
  return `${m}:${s}`
}

// 150 -> '2h30'; 45 -> '45min'; 120 -> '2h'
export function formatarMinutos(minutos) {
  const h = Math.floor(minutos / 60)
  const m = minutos % 60
  if (h === 0) return `${m}min`
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, '0')}`
}