import { Forum } from "./forum";
import { UlogovaniKorisnik } from "./ulogovanikorisnik";

export interface Obavestenje {
    id: number,
    naslov: string,
    tekstObavjestenja: string,
    vremePostavljanja: string,
    korisnik: UlogovaniKorisnik,
    forum: Forum,
    obrisano: boolean,
}