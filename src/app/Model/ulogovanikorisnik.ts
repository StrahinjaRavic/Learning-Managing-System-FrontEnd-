import { DodeljenoPravoPristupa } from "./dodeljenopravopristupa";
import { ForumHasKorisnik } from "./forumhaskorisnik";
import { Obavestenje } from "./obavestenje";
import { Osoba } from "./osoba";

export interface UlogovaniKorisnik {
    id: number,
    korisnickoIme: string,
    lozinka: string,
    email: string,
    osoba: Osoba,
    osoba_id?: number,
    obavestenja: Obavestenje[],
    forumHasKorisnik: ForumHasKorisnik[],
    dodeljenaPravaPristupa: DodeljenoPravoPristupa[],
    obrisano: boolean,
}