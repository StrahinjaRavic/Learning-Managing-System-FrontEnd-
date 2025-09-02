import { Forum } from "./forum";

export interface Folder {
    id: number,
    naziv: string,
    forum: Forum,
    parentFolder: Folder,
    subfolders: Folder[],
    files: any[],

    obrisano: boolean,
}