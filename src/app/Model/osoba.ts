import { Adresa } from "./adresa";
import { Nastavnik } from "./nastavnik";
import { Student } from "./student";

export interface Osoba {
    id: number,
    jmbg: string,
    ime: string,
    prezime: string,
    adresa: Adresa,
    nastavnik: Nastavnik,
    student: Student,
    obrisano: boolean,
}