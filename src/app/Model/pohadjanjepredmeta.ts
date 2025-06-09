import { EvaluacijaZnanja } from "./evaluacijaznanja";
import { RealizacijaPredmeta } from "./realizacijapredmeta";
import { StudentNaGodini } from "./studentnagodini";

export interface PohadjanjePredmeta {
    id: number,
    konacnaOcena: number,
    studentNaGodini: StudentNaGodini,
    realizacijaPredmeta: RealizacijaPredmeta,
    evaluacijeZnanja: EvaluacijaZnanja[],
    obrisano: boolean,
}