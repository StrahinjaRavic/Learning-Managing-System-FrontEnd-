import { Fakultet } from "./fakultet";
import { Katedra } from "./katedra";
import { NastavnikHasZvanje } from "./nastavnikhaszvanje";
import { Osoba } from "./osoba";

export interface Nastavnik {
    id: number,
    biografija: string,
    osoba: Osoba,
    osoba_id?: Number,
    katedre: Katedra[],
    nastavnikHasZvanje: NastavnikHasZvanje[],
    obrisano: boolean,
}