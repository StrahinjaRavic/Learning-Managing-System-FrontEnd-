import { GodinaStudija } from "./godinastudija";
import { Nastavnik } from "./nastavnik";
import { Predmet } from "./predmet";
import { Silabus } from "./silabus";

export interface RealizacijaPredmeta {
  id: number;
  godinaStudija: GodinaStudija;
  godinaStudija_id: number;
  predmet: Predmet;
  predmet_id?: number
  pohadjanjaPredmetaIds: number[];
  nastavnik: Nastavnik;
  nastavnik_id?: number
  obrisano: boolean;
  silabus?: Silabus;
  selected? : Boolean
}
