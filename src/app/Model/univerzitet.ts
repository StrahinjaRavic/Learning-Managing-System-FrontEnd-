import { Adresa } from "./adresa";
import { Fakultet } from "./fakultet";

export interface Univerzitet {
    id: number,
    naziv: string,
    datumOsnivanja: string,
    adresa: Adresa,
    fakulteti: Fakultet[],
    obrisano: boolean,
}