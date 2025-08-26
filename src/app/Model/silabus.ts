import { Predmet } from "./predmet";

export interface Silabus {
  id: number | null;
  opis: string;
  predmet?: Predmet;
  predmetId: number;
  obrisano: boolean;
}
