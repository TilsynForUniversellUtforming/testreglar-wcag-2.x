import { Handling } from "./Handling"

export interface Steg  {
  stegnr: string,
  spm: string,
  ht: string,
  type: StegType,
  ruting: RutingTriggere
  label?: string,
  svararray?:Array<string>,
  image?:string,
  multilinje?:boolean,
  filter?:string,
  datalist?:string
}

export type StegType = "jaNei" | "radio" | "tekst" | "instruksjon"

export type RutingTriggere = {
  ja:Handling,
  nei:Handling,
  alle:Handling,
  alt0:Handling,
  alt1:Handling,
  alt2:Handling,
  alt3:Handling,
  alt4:Handling,
  alt5:Handling,
  alt6:Handling,
  alt7:Handling,
  alt8:Handling,
  alt9:Handling,
  alt10:Handling
}