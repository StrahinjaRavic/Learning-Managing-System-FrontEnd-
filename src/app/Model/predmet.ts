export interface Predmet {
  id: number;
  naziv: string;
  realizacijePredmetaIds: number[];
  espb: number;
  obavezan: boolean;
  brojPredavanja: number;
  brojVezbi: number;
  drugiObliciNastave: string;
  istrazivackiRad: string;
  ostaliCasovi: string;
  brojSemestara: string;
  silabusIds: number[];
  obrisano: boolean;
}
