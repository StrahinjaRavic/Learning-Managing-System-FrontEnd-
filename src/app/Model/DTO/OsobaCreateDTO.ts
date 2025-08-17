export interface OsobaCreateDTO {
  jmbg: string;
  ime: string;
  prezime: string;
  adresa_id: number;
  nastavnik_id: number | null;
  student_id: number | null;
}