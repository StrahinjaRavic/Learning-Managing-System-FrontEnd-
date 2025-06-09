import { GodinaStudija } from "./godinastudija";
import { PohadjanjePredmeta } from "./pohadjanjepredmeta";
import { Predmet } from "./predmet";

export interface RealizacijaPredmeta {
    id: number,
    godinaStudija: GodinaStudija,
    predmet: Predmet,
    pohadjanjaPredmeta: PohadjanjePredmeta[],
    obrisano: boolean,
}