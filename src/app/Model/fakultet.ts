import { Katedra } from "./katedra";
import { Nastavnik } from "./nastavnik";
import { Univerzitet } from "./univerzitet";
import { Adresa } from "./adresa";

export interface Fakultet {
    id: number,
    naziv: string,
    univerzitet: Univerzitet,
    dekan: Nastavnik,
    katedre: Katedra[],
    obrisano: boolean,
    opis?: string;
    kontakt?: string;
    adresa: Adresa
}