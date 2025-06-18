import { Predmet } from "./predmet";

export interface RealizacijaPredmeta {
  id: number;
  godinaStudijaId: number;
  predmet: Predmet;
  pohadjanjaPredmetaIds: number[];
  obrisano: boolean;
}
