import { Osoba } from "./osoba";
import { StudentNaGodini } from "./studentnagodini";

export interface Student {
    id: number,
    osoba: Osoba,
    studentNaGodini: StudentNaGodini[],
    obrisano: boolean,
}