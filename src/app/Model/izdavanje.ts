import { StudentNaGodini } from "./studentnagodini";
import { Udzbenik } from "./udzbenik";

export interface Izdavanje {
  id?: number;
  udzbenik: Udzbenik;
  student: StudentNaGodini;
  kolicina: number;
  datum: string; 
}
