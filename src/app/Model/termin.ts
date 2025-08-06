export interface Termin {
  id?: number;
  datum: string;                 // ISO string (yyyy-MM-dd)
  vremePocetka: string;          // HH:mm:ss
  vremeKraja: string;            // HH:mm:ss
  ishod: string;
  realizacijaPredmeta_id: number;
  obrisano: boolean;
}
