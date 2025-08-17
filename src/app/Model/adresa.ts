import { Mesto } from "./mesto";
import { Osoba } from "./osoba";
import { Univerzitet } from "./univerzitet";

export interface Adresa {
    id: number,
    ulica: string,
    broj: string,
    mesto?: Mesto,
    mesto_id?: number,
    univerziteti?: Univerzitet[],
    osobe?: Osoba[],
    obrisano: boolean,
}