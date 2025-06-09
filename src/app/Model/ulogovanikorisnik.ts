import { DodeljenoPravoPristupa } from "./dodeljenopravopristupa";
import { ForumHasKorisnik } from "./forumhaskorisnik";
import { Obavestenje } from "./obavestenje";
import { Osoba } from "./osoba";

export interface UlogovaniKorisnik {
    id: number,
    username: string,
    password: string,
    email: string,
    osoba: Osoba,
    obavestenja: Obavestenje[],
    forumHasKorisnik: ForumHasKorisnik[],
    dodeljenaPravaPristupa: DodeljenoPravoPristupa[],
    obrisano: boolean,
}