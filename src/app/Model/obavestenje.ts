import { Forum } from "./forum";
import { UlogovaniKorisnik } from "./ulogovanikorisnik";

export interface Obavestenje {
    id: number,
    naslov: string,
    tekstObavjestenja: string,
    vremePostavljanja: string,
    korisnik: UlogovaniKorisnik,
    ulogovaniKorisnik_id?: number,
    forum: Forum,
    forum_id: number,
    obrisano: boolean,
}