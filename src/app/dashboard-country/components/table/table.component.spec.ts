import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { CountriesService } from '../../../services/countries.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Country } from '../../../models/country.interface';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FilterService } from '../../../services/filter.service';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let countriesService: CountriesService;
  let filterService: FilterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [
        HttpClientTestingModule,
        MatPaginatorModule,
        MatTableModule,
        BrowserAnimationsModule,
        MatSortModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    countriesService = TestBed.inject(CountriesService);
    filterService = TestBed.inject(FilterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check getCountries have been called on ngOnInit', () => {
    spyOn(component, 'getCountries').and.callThrough();
    spyOn(component, 'applyFilter').and.callThrough();
    spyOn(component, 'checkSort').and.callThrough();
    component.ngOnInit();
    expect(component.getCountries).toHaveBeenCalledTimes(1);
    expect(component.applyFilter).toHaveBeenCalledTimes(1);
    expect(component.checkSort).toHaveBeenCalledTimes(1);
  });

  it('should get countries and set MatTableDataSource, paginator and sort', () => {
    const dataCountries: Country[] = [
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
    spyOn(countriesService, 'getCountries').and.returnValue(of(dataCountries));
    component.getCountries();
    expect(component.dataSource.paginator).toBeInstanceOf(MatPaginator);
    expect(component.dataSource.sort).toBeInstanceOf(MatSort);
    expect(component.dataSource.data).toEqual(dataCountries);
  });
  it('Should check function checkSort works correctly ', () => {
    const sortValue: string = 'name';
    spyOn(filterService, 'getSort').and.returnValue(of(sortValue));
    spyOn(component, 'sortTable');
    component.checkSort();
    expect(component.sortTable).toHaveBeenCalledWith(sortValue);
  });
  it('Should check function applyFilter works correctly ', () => {
    const regionValue: string = 'Asia';
    spyOn(filterService, 'getFilterData').and.returnValue(of(regionValue));
    component.applyFilter();
    expect(component.regionSelected).toEqual(regionValue);
    expect(component.dataSource.filter).toEqual(
      regionValue.trim().toLowerCase()
    );
  });
});
