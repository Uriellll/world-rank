import { Country } from './../../models/country.interface';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CountriesService } from '../../services/countries.service';
import { FilterService } from '../../services/filter.service';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, OnDestroy, AfterViewInit {
  regionSelected: string = '';
  displayedColumns: string[] = [
    'flag',
    'name',
    'population',
    'area',
    'region',
    'detail',
  ];
  dataSource: MatTableDataSource<Country> = new MatTableDataSource<Country>([]);
  private subscriptions: Subscription[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private countriesService: CountriesService,
    private filterService: FilterService
  ) {}
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  ngOnInit(): void {
    this.getCountries();
    this.applyFilter();
    this.checkSort();
  }
  getCountries() {
    this.subscriptions.push(
      this.countriesService.getCountries().subscribe((res: Country[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.sortTable('population');
      })
    );
  }
  applyFilter() {
    this.subscriptions.push(
      this.filterService.getFilterData().subscribe((region) => {
        this.regionSelected = region;
        this.dataSource.filter = this.regionSelected.trim().toLowerCase();
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      })
    );
  }
  sortTable(name: string) {
    if (this.dataSource.sort) {
      this.dataSource.sort.sort({
        id: name,
        start: 'asc',
        disableClear: true,
      });
    }
  }
  checkSort() {
    let sort = '';
    this.subscriptions.push(
      this.filterService.getSort().subscribe((res) => {
        if (!res) sort = 'population';
        else sort = res;
        this.sortTable(sort);
      })
    );
  }
}
