import { RealizacijaPredmeta } from "./realizacijapredmeta";

export interface PohadjanjePredmeta {
  id: number;
  konacnaOcena: number;
  studentNaGodiniId: number;
  realizacijaPredmeta: RealizacijaPredmeta;
  evaluacijeZnanjaIds: number[];
  obrisano: boolean;
}
