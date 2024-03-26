import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SearcherComponent } from './components/searcher/searcher.component';
import { TableComponent } from './components/table/table.component';
import { SortComponent } from './components/sort/sort.component';
import { RegionComponent } from './components/region/region.component';
import { StatusComponent } from './components/status/status.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardCountryComponent } from './dashboard-country.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { CountryDetailsComponent } from './components/country-details/country-details.component';

@NgModule({
  declarations: [
    SidenavComponent,
    SearcherComponent,
    TableComponent,
    SortComponent,
    RegionComponent,
    StatusComponent,
    CountryDetailsComponent,
    HeaderComponent,
    DashboardCountryComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSortModule, 
  ]
})
export class DashboardModule { }
