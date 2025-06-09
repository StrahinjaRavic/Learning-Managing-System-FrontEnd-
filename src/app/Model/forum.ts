import { ForumHasKorisnik } from "./forumhaskorisnik";
import { Obavestenje } from "./obavestenje";

export interface Forum {
    id: number,
    naziv: string,
    forum: Forum,
    forumi: Forum[],
    obavjestenja: Obavestenje[],
    forumHasKorinsik: ForumHasKorisnik[],
    obrisano: boolean,
}