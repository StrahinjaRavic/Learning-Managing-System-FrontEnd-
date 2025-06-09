import { Fakultet } from "./fakultet";
import { Nastavnik } from "./nastavnik";
import { StudijskiProgram } from "./studijskiprogram";

export interface Katedra {
    id: number,
    naziv: string,
    fakultet: Fakultet,
    sefKatedre: Nastavnik,
    studijskiProgrami: StudijskiProgram[],
    obrisano: boolean,
}