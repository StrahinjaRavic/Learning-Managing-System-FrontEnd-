import { EvaluacijaZnanja } from "./evaluacijaznanja";

export interface Rok {
    id: number,
    naziv: string,
    pocetak: string,
    kraj: string,
    evaluacijeZnanja: EvaluacijaZnanja[],
    obrisano: boolean,
}