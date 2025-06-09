import { PravoPristupa } from "./pravopristupa";
import { UlogovaniKorisnik } from "./ulogovanikorisnik";

export interface DodeljenoPravoPristupa {
    id: number,
    ulogovaniKorisnik: UlogovaniKorisnik,
    pravoPristupa: PravoPristupa,
    obrisano: boolean,
}