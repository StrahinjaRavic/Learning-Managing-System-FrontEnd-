import { Adresa } from "./adresa";
import { Nastavnik } from "./nastavnik";
import { Student } from "./student";

export interface Osoba {
    id: number,
    jmbg: string,
    ime: string,
    prezime: string,
    adresa: Adresa,
    nastavnikId: number,
    studentId: number,
    obrisano: boolean,
}