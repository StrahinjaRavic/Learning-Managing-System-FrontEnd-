export interface ErrorLog {
    id : number
    exceptionType : string
    poruka: string
    stackTrace: string
    vreme : Date
    obrisano: Boolean
}