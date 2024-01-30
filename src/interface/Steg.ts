import { RutingTriggere } from "./RutingTriggere"

export interface Steg  {
  /** Stegnr */
  stegnr: string,
  /** Spørsmål på steget*/
  spm: string,
  /** Hjelpetekst */
  ht: string,
  /** Type steg */
  type: StegType,
  /** Ruting  */
  ruting: RutingTriggere
  /** Label (For felt som trenger label) */
  label?: string,
  /** Svar array for radioknapper / steg med egendefinerte valg */
  svararray?:Array<string>,
  /** url til bilde (For bilde som hjelp) */
  image?:string,
  /** Multilinje (For steg av typen tekst som krever lengre innput) */
  multilinje?:boolean,
  /** Filter for tekstinput */
  filter?:string,
  /** For å koble tekstfelt til en dataliste */
  datalist?:DataListeTyper
}

export type StegType = "jaNei" | "radio" | "tekst" | "instruksjon"
export type DataListeTyper = "Sideutvalg" ;
export type FilterTyper = "tal" ;