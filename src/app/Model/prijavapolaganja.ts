import { Polaganje } from "./polaganje";
import { PohadjanjePredmeta } from "./pohadjanjepredmeta";

export interface PrijavaPolaganja {
  id: number;
  pohadjanjePredmeta: PohadjanjePredmeta;
  polaganje: Polaganje;
  datum: Date;
  brojBodova?: number;
  obrisano?: boolean;
}
