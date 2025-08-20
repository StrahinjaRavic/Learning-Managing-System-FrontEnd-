export interface KancelarijskiMaterijal {
  id?: string;             // UUID koji generiše backend
  naziv: string;
  kolicina: number;
  opis: string;
  datumNarudzbine?: string;
  radnik?: string;
  status?: string;         // npr. "uToku", "odobreno", "isporučeno"
}