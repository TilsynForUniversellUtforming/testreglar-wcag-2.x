import { Delutfall } from "./Delutfall";
import { Regel } from "./Regel"



export type Handling = HandlingGaaTil | HandlingikkjeForekomst | HandlingAvslutt | HandlingRegler;

  /**
   * Handling for å gå til steg
   */
  export interface HandlingGaaTil  {
    type: "gaaTil"
    /** Referanse til stegnr det skal rutes til */
    steg: string,
    /** Setting av delutfall dersom aktuelt */
    delutfall?:Delutfall
  }

  /**
   * Handling for å sette ikkje forekomst
   */
  export interface HandlingikkjeForekomst  {
    type: "ikkjeForekomst"
    utfall: string
  }

  /**
   * Handling for avslutte
   */
  export interface HandlingAvslutt  {
    type: "avslutt"
    fasit:FasitTyperHandling
    utfall: string
  }

  /**
   * Handling for å vurder input med regler
   */
  export interface HandlingRegler  {
    type: "regler"
    regler:{[regelnr:number]:Regel}
  }

  export type FasitTyperHandling = "Ja" | "Nei" | "Ikkje testbart";