import { DodeljenoPravoPristupa } from "./dodeljenopravopristupa";

export interface PravoPristupa {
    id: number,
    naziv: string,
    dodeljenaPravaPristupa: DodeljenoPravoPristupa[],
    obrisano: boolean,
}