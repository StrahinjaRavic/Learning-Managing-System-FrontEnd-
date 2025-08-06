import { PolaganjeDTO } from './polaganje-dto';
import { PohadjanjePredmetaDTO } from './pohadjanjepredmeta-dto';

export interface PrijavaPolaganjaDTO {
  id: number;
  datum: string;
  brojBodova: number;
  obrisano: boolean;
  polaganje: PolaganjeDTO;
  pohadjanjePredmeta: PohadjanjePredmetaDTO;
}
