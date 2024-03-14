export interface Country {
    flag: string;
    name: string;
    population:number;
    area:number;
    region: string;
    independent: boolean;
}
export interface CountryDetail{
    name: string;
    flag: string;
    population: number;
    area: number;
    capital: Array<string>;
    languages: any;
    region: string;
    independent: string;
    subregion: string;
    currencies: any;
    borders: Array<string>;
}