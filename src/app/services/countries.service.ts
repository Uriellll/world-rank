import { Country, CountryDetail } from './../models/country.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private http: HttpClient) {}
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>('https://restcountries.com/v3.1/all').pipe(
      map((fullData: any) => {
        return fullData.map((data: any) => ({
          flag: data.flags.png,
          name: data.name.common,
          population: data.population,
          area: data.area,
          region: data.region,
          independent: data.independent ? 'independent' : 'memberOfUnited',
        })) as Country[];
      })
    );
  }
  getCountry(name: string): Observable<CountryDetail[]> {
    return this.http
      .get<CountryDetail[]>(`https://restcountries.com/v3.1/name/${name}`)
      .pipe(
        map((dataCountry: any) => {
          return dataCountry.map((data: any) => ({
            name: data.name.common,
            flag: data.flags.png,
            population: data.population,
            area: data.area,
            capital: data.capital,
            languages: data.languages,
            region: data.region,
            independent: data.independent ? 'independent' : 'memberOfUnited',
            subregion: data.subregion,
            currencies: data.currencies,
            borders: data.borders,
          }));
        })
      );
  }
  getCountryShort(name: string): Observable<CountryDetail[]> {
    return this.http
      .get<CountryDetail[]>(`https://restcountries.com/v3.1/alpha/${name}`)
      .pipe(
        map((dataCountry: any) => {
          return dataCountry.map((data: any) => ({
            name: data.name.common,
            flag: data.flags.png,
            population: data.population,
            area: data.area,
            capital: data.capital,
            languages: data.languages,
            region: data.region,
            independent: data.independent ? 'independent' : 'memberOfUnited',
            subregion: data.subregion,
            currencies: data.currencies,
            borders: data.borders,
          }));
        })
      );
  }
}
