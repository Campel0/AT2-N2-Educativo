import { createContext } from 'react'

// Context = "caixa" compartilhada entre componentes.
// Só cria a caixa; o Provider (próximo arquivo) coloca os dados dentro dela.
export const DadosContext = createContext(null)