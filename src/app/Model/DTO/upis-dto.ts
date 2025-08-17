export interface UpisDTO {
  studentId?: number;         // koristi se kad upisuješ postojeće
  osobaId?: number;           // koristi se kad upisuješ novog
  brojIndeksa?: number;       // unosi se za novog
  godinaStudijaId: number;
  datumUpisa: string;         // format: YYYY-MM-DD
}
