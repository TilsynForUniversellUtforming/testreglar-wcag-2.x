import { Handling } from "./Handling"

export interface Regel  {
    type: string
    handling: Handling
    regler: Array<Regel>
  }