import { Zvanje } from "./zvanje";

export interface TipZvanja {
    id: number,
    naziv: string,
    zvanje: Zvanje[],
    obrisano: boolean,
}