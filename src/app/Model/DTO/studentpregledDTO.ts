
export interface IspitDTO {
  predmet: string;
  brojBodova: number;
  rok: string;
  datumPolaganja: Date;
}

export interface UpisDTO {
  godinaStudija: string;
  skolskaGodina: string;
  datumUpisa: Date;
}

export interface StudentPregledDTO {
  ime: string;
  prezime: string;
  jmbg: string;
  brojIndeksa: number;
  studijskiProgram: string;
  prosecnaOcena: number;
  ukupnoOsvojenihEspb: number;
  upisi: UpisDTO[];
  polozeniIspiti: IspitDTO[];
  neuspesnaPolaganja: IspitDTO[];
}
