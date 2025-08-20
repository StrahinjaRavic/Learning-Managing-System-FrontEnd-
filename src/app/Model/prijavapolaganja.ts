import { PohadjanjePredmeta } from "./pohadjanjepredmeta";
import { Polaganje } from './polaganje';

export interface PrijavaPolaganja {
  id: number;
  brojBodova?: number;
  pohadjanjePredmeta: PohadjanjePredmeta;
  pohadjanjePredmeta_id?: number
  polaganje_id?: number
  polaganje: Polaganje;
}
