import { Adresa } from "./adresa";
import { Drzava } from "./drzava";

export interface Mesto {
    id: number,
    naziv: string,
    drzava: Drzava,
    adrese: Adresa[],
    obrisano: boolean,
}