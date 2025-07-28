import { PohadjanjePredmeta } from "./pohadjanjepredmeta";
import { Polaganje } from './polaganje';

export interface PrijavaPolaganja {
  id: number;
  brojBodova?: number;
  pohadjanjePredmeta: PohadjanjePredmeta;
  polaganje: Polaganje;
}
