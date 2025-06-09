import { Mesto } from "./mesto";
import { Osoba } from "./osoba";
import { Univerzitet } from "./univerzitet";

export interface Adresa {
    id: number,
    ulica: string,
    broj: string,
    mesto: Mesto,
    univerziteti: Univerzitet[],
    osobe: Osoba[],
    obrisano: boolean,
}