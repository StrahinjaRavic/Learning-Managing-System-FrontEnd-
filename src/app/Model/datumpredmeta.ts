import { RealizacijaPredmeta } from "./realizacijapredmeta";
import { Rok } from "./rok";

export interface DatumPredmeta {
    id: number,
    rok: Rok,
    rok_id?: number,
    realizacijaPredmeta: RealizacijaPredmeta,
    realizacijaPredmeta_id?: number,
    datum: Date,
    obrisano: boolean,
}