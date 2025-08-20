import { Predmet } from "./predmet";
import { Silabus } from "./silabus";

export interface RealizacijaPredmeta {
  id: number;
  godinaStudijaId: number;
  predmet: Predmet;
  pohadjanjaPredmetaIds: number[];
  obrisano: boolean;
  silabus?: Silabus
}
