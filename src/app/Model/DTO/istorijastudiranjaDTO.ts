import { IstorijaPredmetaDTO } from "./istorijapredmetaDTO";

export interface IstorijaStudiranjaDTO {
  studentId: number;
  ime: string;
  prezime: string;
  predmeti: IstorijaPredmetaDTO[];
}
