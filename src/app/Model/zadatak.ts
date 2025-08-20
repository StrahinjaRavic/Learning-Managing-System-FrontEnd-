import { Odgovor } from "./odgovor";

export interface Zadatak {
  id: number;
  pitanje: string;
  odgovori: Odgovor[];
  visestrukiOdgovori?: boolean; 
}