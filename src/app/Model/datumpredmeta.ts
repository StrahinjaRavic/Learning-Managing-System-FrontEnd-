import { RealizacijaPredmeta } from "./realizacijapredmeta";
import { Rok } from "./rok";

export interface DatumPredmeta {
    id: number,
    rok: Rok,
    ulica: string,
    realizacijapredmeta: RealizacijaPredmeta,
    datum: Date,
    obrisano: boolean,
}