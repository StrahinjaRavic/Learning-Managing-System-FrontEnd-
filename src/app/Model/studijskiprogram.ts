import { GodinaStudija } from "./godinastudija";
import { Katedra } from "./katedra";

export interface StudijskiProgram {
    id: number,
    naziv: string,
    katedra: Katedra,
    katedra_id?: number,
    godineStudija: GodinaStudija[],
    obrisano: boolean,
}