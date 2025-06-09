import { GodinaStudija } from "./godinastudija";
import { Katedra } from "./katedra";

export interface StudijskiProgram {
    id: number,
    naziv: string,
    katedra: Katedra,
    godineStudija: GodinaStudija[],
    obrisano: boolean,
}