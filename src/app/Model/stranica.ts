import { Udzbenik } from "./udzbenik";

export interface Stranica {
  id?: number;
  brojStranice: number;
  sadrzaj: string;
  udzbenik: Udzbenik;
}