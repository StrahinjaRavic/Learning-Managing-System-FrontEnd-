import { Polaganje } from "./polaganje";
import { PohadjanjePredmeta } from "./pohadjanjepredmeta";

export interface PrijavaPolaganja {
  id: number;
  pohadjanjePredmeta: PohadjanjePredmeta;
  pohadjanjePredmeta_id?: number
  polaganje_id?: number
  polaganje: Polaganje;
  datum: Date;
  brojBodova?: number;
  obrisano?: boolean;
}
