import { Nastavnik } from "./nastavnik";
import { Zvanje } from "./zvanje";

export interface NastavnikHasZvanje {
    id: number,
    nastavnik: Nastavnik,
    zvanje: Zvanje,
    obrisano: boolean,
}