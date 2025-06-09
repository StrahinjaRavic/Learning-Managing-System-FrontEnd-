import { Zvanje } from "./zvanje";

export interface NaucnaOblast {
    id: number,
    naziv: string,
    zvanje: Zvanje[],
    obrisano: boolean,
}