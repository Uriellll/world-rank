import { Country } from './../models/country.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  

  constructor(private http: HttpClient) {
  }
  getCountries():Observable<Country[]>{
    return this.http.get<any>('https://restcountries.com/v3.1/all').pipe(
      map( (fullData:any) =>{
        return fullData.map((data:any) =>({
          flag: data.flags.png,
          name: data.name.common,
          population: data.population,
          area: data.area,
          region: data.region,
          independent: data.independent ? 'independent' : 'memberOfUnited'
        })) as Country[];
      })
    )
  }
}
