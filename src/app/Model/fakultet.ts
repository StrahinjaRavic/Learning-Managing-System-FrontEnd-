import { Katedra } from "./katedra";
import { Nastavnik } from "./nastavnik";
import { Univerzitet } from "./univerzitet";

export interface Fakultet {
    id: number,
    naziv: string,
    univerzitet: Univerzitet,
    dekan: Nastavnik,
    katedre: Katedra[],
    obrisano: boolean,
}