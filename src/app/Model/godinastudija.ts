import { RealizacijaPredmeta } from "./realizacijapredmeta";
import { StudentNaGodini } from "./studentnagodini";
import { StudijskiProgram } from "./studijskiprogram";

export interface GodinaStudija {
  id: number;
  godina: string;
  studijskiProgram: StudijskiProgram;
  studijskiProgram_id?: number;
  studentNaGodini: StudentNaGodini[];
  realizacijePredmeta: RealizacijaPredmeta[];
  obrisano: boolean;
}
