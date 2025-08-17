export interface ObavestenjeSaveDTO {
  id?: number;
  naslov: string;
  tekstObavjestenja: string;
  vremePostavljanja: string;
  ulogovaniKorisnik_id: number;
  forum_id: number;
  obrisano: boolean;
}
