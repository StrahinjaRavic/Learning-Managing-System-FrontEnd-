import { RealizacijaPredmeta } from "./realizacijapredmeta";
import { Silabus } from "./silabus";

export interface Predmet {
    id: number,
    realizacijePredmeta: RealizacijaPredmeta[],
    espb: number,
    obavezan: boolean,
    brojPredavanja: number,
    brojVezbi: number,
    drugiObliciNastave: string,
    istrazivackiRad: string,
    ostaliCasovi: string,
    brojSemestara: string,
    silabus: Silabus[],
    obrisano: boolean,
}