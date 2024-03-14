import { Country } from './../../models/country.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CountriesService } from '../../services/countries.service';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  regionSelected: string = '';
  displayedColumns: string[] = ['flag', 'name', 'population', 'area', 'region'];
  dataSource: MatTableDataSource<Country> = new MatTableDataSource<Country>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private countriesService: CountriesService,
    private filterService: FilterService
  ) {}
  ngOnInit(): void {
    this.getCountries();
    this.applyFilter();
  }
  getCountries() {
    this.countriesService.getCountries().subscribe((res: Country[]) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter() {
    this.filterService.getFilterData().subscribe((region) => {
      this.regionSelected = region;
      this.dataSource.filter = this.regionSelected.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });
  }
}
