import { NastavnikHasZvanje } from "./nastavnikhaszvanje";
import { NaucnaOblast } from "./naucnaoblast";
import { TipZvanja } from "./tipzvanja";

export interface Zvanje {
    id: number,
    nastavnikHasZvanje: NastavnikHasZvanje[],
    datumIzbora: string,
    datumPrestanka: string,
    tipZvanja: TipZvanja,
    naucnaOblast: NaucnaOblast,
    obrisano: boolean,
}