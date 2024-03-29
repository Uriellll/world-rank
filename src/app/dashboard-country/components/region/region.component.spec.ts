import { FilterService } from './../../../services/filter.service';
import { CountriesService } from './../../../services/countries.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionComponent } from './region.component';
import { HttpClientModule } from '@angular/common/http';
import { Country } from '../../../models/country.interface';
import { BehaviorSubject, of } from 'rxjs';
let dataCountries: Country[] = [
  {
    area: 9251,
    flag: 'https://flagcdn.com/w320/cy.png',
    independent: true,
    name: 'Cyprus',
    population: 1207361,
    region: 'Europe',
  },
  {
    area: 117600,
    flag: 'https://flagcdn.com/w320/er.png',
    independent: true,
    name: 'Eritrea',
    population: 5352000,
    region: 'Africa',
  },
];
describe('RegionComponent', () => {
  let component: RegionComponent;
  let fixture: ComponentFixture<RegionComponent>;
  let countriesService: CountriesService;
  let filterService: FilterService;
  let flagSearcherOfSubject: BehaviorSubject<boolean>;
  let flagStatusSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    flagSearcherOfSubject = new BehaviorSubject<boolean>(false);
    flagStatusSubject = new BehaviorSubject<boolean>(false);
    await TestBed.configureTestingModule({
      declarations: [RegionComponent],
      imports: [HttpClientModule],
      providers: [
        {
          provide: FilterService,
          useValue: {
            getFlagSearcherOf: () => flagSearcherOfSubject.asObservable(),
            getFlagStatus: () => flagStatusSubject.asObservable(),
            setFlagRegion: () => {},
            setFilterData: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    countriesService = TestBed.inject(CountriesService);
    filterService = TestBed.inject(FilterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check getRegions function', () => {
    const resRegions = ['Europe', 'Africa'];
    spyOn(countriesService, 'getCountries').and.returnValue(of(dataCountries));
    component.getRegions();
    expect(component.regions).toEqual(resRegions);
    expect(component.regionsFiltered).toEqual([...resRegions, 'All']);
  });
  it('should check filterRegions function', () => {
    const resRegions = ['Europe', 'Africa'];
    const regionsFunction = component.filterRegions(dataCountries);
    expect(regionsFunction).toEqual(resRegions);
  });
  it('should check selectRegion function', () => {
    const resRegions = ['Europe', 'Africa'];
    const regionsFunction = component.filterRegions(dataCountries);
    expect(regionsFunction).toEqual(resRegions);
  });
  it('should set flag and filter data when region is selected', () => {
    const region = 'Europe';
    const spySetFlagRegion = spyOn(filterService, 'setFlagRegion');
    const spySetFilterData = spyOn(filterService, 'setFilterData');
    component.selectRegion(region);
    expect(spySetFlagRegion).toHaveBeenCalledWith(true);
    expect(component.selectedRegion).toEqual(region);
    expect(spySetFilterData).toHaveBeenCalledWith(region);
  });
  it('should set flag and filter data when region is All', () => {
    const region = 'All';
    const spySetFlagRegion = spyOn(filterService, 'setFlagRegion');
    const spySetFilterData = spyOn(filterService, 'setFilterData');
    component.selectRegion(region);
    expect(spySetFlagRegion).toHaveBeenCalledWith(true);
    expect(component.selectedRegion).toEqual(region);
    expect(spySetFilterData).toHaveBeenCalledWith('');
  });
  it('should check checkFlag function', () => {
    const initialSelectedRegion = '';
    component.selectedRegion = initialSelectedRegion;
    // Espiar el método setFlagSearcherOf
    spyOn(filterService, 'getFlagSearcherOf');
    spyOn(filterService, 'getFlagStatus');
    // Caso 1: flagSearcherOf cambia
    flagSearcherOfSubject.next(true);
    expect(component.selectedRegion).toEqual('');
    // Reiniciar el valor de selectedRegion
    component.selectedRegion = initialSelectedRegion;
    // Caso 2: flagStatus cambia
    flagStatusSubject.next(true);
    expect(component.selectedRegion).toEqual('');
  });
});
