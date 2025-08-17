import { Predmet } from "./predmet";

export interface Silabus {
  id: number;
  opis: string;
  predmet?: Predmet;
  predmetId: number;
  obrisano: boolean;
}
