import { PohadjanjePredmeta } from "./pohadjanjepredmeta";
import { Rok } from "./rok";

export interface EvaluacijaZnanja {
    id: number,
    naziv: string,
    brojBodova: number,
    datum: string,
    pohadjanjepredmetaId: number,
    rok: string,
    obrisano: boolean,
}