import { GodinaStudija } from "./godinastudija";
import { PohadjanjePredmeta } from "./pohadjanjepredmeta";
import { Student } from "./student";

export interface StudentNaGodini {
    id: number,
    datumUpisa: string,
    brojIndeksa: number,
    student: Student,
    godinaStudija: GodinaStudija,
    pohadjanjaPredmeta: PohadjanjePredmeta[],
    obrisano: boolean,
}