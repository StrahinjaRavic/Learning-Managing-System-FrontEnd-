export interface UlogovaniKorisnikCreateDTO {
  korisnickoIme: string;
  lozinka: string;
  email: string | null,
  osoba_id: number;
}