import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss'
})
export class CountryDetailsComponent implements OnInit, OnDestroy{
  country:any = {};
  private subscriptions: Subscription[] = [];
  constructor(private route: ActivatedRoute, private countryService:CountriesService){}
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  ngOnInit(): void {
    this.subscriptions.push(this.route.paramMap.subscribe(params => {
      const name = params.get('name') || '';
      if(name.length == 3) this.getInfoShort(name)
      else this.getInfoCountry(name)
    }));
  }
  getInfoCountry(name: string){
    this.subscriptions.push(this.countryService.getCountry(name).subscribe(res =>{
      this.country = res[0];
    }));
  }
  getInfoShort(name: string){
    this.subscriptions.push(this.countryService.getCountryShort(name).subscribe(res =>{
      this.country = res[0];
    }))
  }

}
