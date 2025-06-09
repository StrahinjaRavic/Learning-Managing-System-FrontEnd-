import { Forum } from "./forum";
import { UlogovaniKorisnik } from "./ulogovanikorisnik";

export interface ForumHasKorisnik {
    id: number,
    ulogovaniKorisnik: UlogovaniKorisnik,
    forum: Forum,
    obrisano: boolean,
}