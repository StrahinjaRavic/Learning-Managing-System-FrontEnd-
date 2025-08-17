import { Adresa } from "./adresa";
import { Nastavnik } from "./nastavnik";
import { Student } from "./student";

export interface Osoba {
    id: number,
    jmbg: string,
    ime: string,
    prezime: string,
    adresa: Adresa,
    adresa_id?: number,
    nastavnik: Nastavnik,
    nastavnik_id?: number,
    student: Student,
    student_id?: number,
    obrisano: boolean,
}