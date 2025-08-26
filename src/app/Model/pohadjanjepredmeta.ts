import { EvaluacijaZnanja } from "./evaluacijaznanja";
import { RealizacijaPredmeta } from "./realizacijapredmeta";
import { StudentNaGodini } from "./studentnagodini";

export interface PohadjanjePredmeta {
  id?: number;
  konacnaOcena?: number | null;
  studentNaGodini?: StudentNaGodini;
  realizacijaPredmeta?: RealizacijaPredmeta;
  realizacijaPredmeta_id?: number;
  studentNaGodini_id?: number;
  evaluacijeZnanja?: EvaluacijaZnanja;
  obrisano: boolean;
}
