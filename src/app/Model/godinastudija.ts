export interface GodinaStudija {
  id: number;
  godina: string;
  studijskiProgramId: number;
  studentNaGodiniIds: number[];
  realizacijePredmetaIds: number[];
  obrisano: boolean;
}
