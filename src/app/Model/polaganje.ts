import { EvaluacijaZnanja } from "./evaluacijaznanja";
import { Rok } from "./rok";

export interface Polaganje {
  id: number;
  datum: string;
  evaluacijaZnanja: EvaluacijaZnanja;
  rok: Rok
}
