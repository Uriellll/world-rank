import { TestBed } from '@angular/core/testing';

import { CountriesService } from './countries.service';
import { Country } from '../models/country.interface';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('CountriesService', () => {
  let httpMock: HttpTestingController;
  let service: CountriesService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CountriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return correct info - getCountries', () => {
    const mockResponse = [
      {
        flags: { png: 'flag_url' },
        name: { common: 'Country Name' },
        population: 1000,
        area: 500,
        region: 'Region',
        independent: true,
      },
      {
        flags: { png: 'flag_url_2' },
        name: { common: 'Country Name 2' },
        population: 2000,
        area: 600,
        region: 'Region 2',
        independent: false,
      },
    ];

    const mappedResponse: any[] = [
      {
        flag: 'flag_url',
        name: 'Country Name',
        population: 1000,
        area: 500,
        region: 'Region',
        independent: 'independent',
      },
      {
        flag: 'flag_url_2',
        name: 'Country Name 2',
        population: 2000,
        area: 600,
        region: 'Region 2',
        independent: 'memberOfUnited',
      },
    ];
    service.getCountries().subscribe((response) => {
      expect(response).toEqual(mappedResponse);
    });
    const req = httpMock.expectOne('https://restcountries.com/v3.1/all');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
    httpMock.verify();
  });
});
