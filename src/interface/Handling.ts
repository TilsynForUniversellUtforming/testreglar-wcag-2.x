import { Delutfall } from "./Delutfall";
import { LangElement } from "./LangElement";
import { Regel } from "./Regel"

export type Handling = HandlingGaaTil | HandlingikkjeForekomst | HandlingAvslutt | HandlingRegler;

/**
 * Handling for å gå til steg
 */
export interface HandlingGaaTil {
    /** Type handling */
    type: "gaaTil";
    /** Referanse til stegnr det skal rutes til */
    steg: string;
    /** Setting av delutfall dersom aktuelt */
    delutfall?: Delutfall;
}

/**
 * Handling for å sette ikkje forekomst
 */
export interface HandlingikkjeForekomst {
    /** Type handling */
    type: "ikkjeForekomst";
    /** Tekstleg utfall */
    utfall: string | LangElement;
}

/**
 * Handling for å avslutte / oppsummere ein test
 */
export interface HandlingAvslutt {
    /** Type handling */
    type: "avslutt";
    /** Fasit */
    fasit: HandlingFasitTyper;
    /** Utfall */
    utfall: HandlingUtfallTyper;
}

/**
 * Handling for å vurdere input med regler
 */
export interface HandlingRegler {
    /** Type handling */
    type: "regler";
    /** Regler */
    regler: { [regelId: string]: Regel };
}

/**
 * For HandlingAvslutt som skal ha eget utfall etter ja og nei på delutfall.
 */
export interface HandlingUtfallTJaNeiTyper {
    /** Utfall når fasit er ja*/
    ja: string | LangElement;
    /** Utfall når fasit er nei */
    nei: string | LangElement;
}

export type HandlingFasitTyper = "Ja" | "Nei" | "Ikkje testbart" | "sjekkDelutfall";
export type HandlingUtfallTyper = string | HandlingUtfallTJaNeiTyper | LangElement ;