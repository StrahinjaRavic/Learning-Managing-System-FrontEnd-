import { Mesto } from "./mesto";

export interface Drzava {
    id: number,
    naziv: string,
    mesta: Mesto[],
    obrisano: boolean,
}