import { Regel } from "./Regel"

export interface Handling  {
    type: TestregelHandling
    gaaTil: string
    regler?: Array<Regel>
    steg?: string
  }

  export type TestregelHandling = "gaaTil" | "regler" | "avslutt" | "ikkjeForekomst" ;