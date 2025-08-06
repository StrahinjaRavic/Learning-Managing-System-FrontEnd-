import { PohadjanjePredmeta } from "./pohadjanjepredmeta";
import { RealizacijaPredmeta } from "./realizacijapredmeta";
import { Rok } from "./rok";

export interface EvaluacijaZnanja {
    id: number,
    naziv: string,
    brojBodova: number,
    datum: string,
    realizacijaPredmeta: RealizacijaPredmeta,
    rok: Rok,
    obrisano: boolean,
}