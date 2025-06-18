import { GodinaStudija } from "./godinastudija";
import { PohadjanjePredmeta } from "./pohadjanjepredmeta";

export interface StudentNaGodini {
  id: number;
  datumUpisa: string;
  brojIndeksa: number;
  studentId: number;
  godinaStudija: GodinaStudija;
  pohadjanjaPredmeta: PohadjanjePredmeta;
  obrisano: boolean;
}
