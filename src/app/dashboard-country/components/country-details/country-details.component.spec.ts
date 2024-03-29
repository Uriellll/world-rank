import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryDetailsComponent } from './country-details.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, of } from 'rxjs';
import { CountriesService } from '../../../services/countries.service';
import { CountryDetail } from '../../../models/country.interface';

describe('CountryDetailsComponent', () => {
  let component: CountryDetailsComponent;
  let fixture: ComponentFixture<CountryDetailsComponent>;
  let activatedRoute: any;
  let countryService: CountriesService;

  beforeEach(async () => {
    activatedRoute = {
      paramMap: new BehaviorSubject(convertToParamMap({ name: 'mexico' })),
    };
    await TestBed.configureTestingModule({
      declarations: [CountryDetailsComponent],
      imports: [HttpClientTestingModule, MatIconModule],
      providers: [{ provide: ActivatedRoute, useValue: activatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(CountryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    countryService = TestBed.inject(CountriesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getInfoCountry when name has more than 3 characters', () => {
    spyOn(component, 'getInfoCountry');
    component.ngOnInit();
    expect(component.getInfoCountry).toHaveBeenCalledWith('mexico');
  });
  it('should call  getInfoShort when name has 3 characters', () => {
    spyOn(component, 'getInfoShort');
    activatedRoute.paramMap.next(convertToParamMap({ name: 'mex' }));
    component.ngOnInit();
    expect(component.getInfoShort).toHaveBeenCalledWith('mex');
  });
  it('should return correct info of getInfoCountry', () => {
    const country: CountryDetail[] = [
      {
        name: 'Mexico',
        flag: 'https://flagcdn.com/w320/mx.png',
        population: 128932753,
        area: 1964375,
        capital: ['Mexico City'],
        languages: {
          spa: 'Spanish',
        },
        region: 'Americas',
        independent: 'independent',
        subregion: 'North America',
        currencies: {
          MXN: {
            name: 'Mexican peso',
            symbol: '$',
          },
        },
        borders: ['BLZ', 'GTM', 'USA'],
      },
    ];
    spyOn(countryService, 'getCountry').and.returnValue(of(country));
    component.getInfoCountry('mexico');
    expect(component.country).toEqual(country[0]);
  });
  it('should return correct info of getInfoShort', () => {
    const country: CountryDetail[] = [
      {
        name: 'Mexico',
        flag: 'https://flagcdn.com/w320/mx.png',
        population: 128932753,
        area: 1964375,
        capital: ['Mexico City'],
        languages: {
          spa: 'Spanish',
        },
        region: 'Americas',
        independent: 'independent',
        subregion: 'North America',
        currencies: {
          MXN: {
            name: 'Mexican peso',
            symbol: '$',
          },
        },
        borders: ['BLZ', 'GTM', 'USA'],
      },
    ];
    spyOn(countryService, 'getCountryShort').and.returnValue(of(country));
    component.getInfoShort('mex');
    expect(component.country).toEqual(country[0]);
  });
});
