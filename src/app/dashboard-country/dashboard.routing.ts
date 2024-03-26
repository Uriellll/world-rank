import { Routes, RouterModule } from '@angular/router';
import { DashboardCountryComponent } from './dashboard-country.component';
import { NgModule } from '@angular/core';
import { CountryDetailsComponent } from './components/country-details/country-details.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardCountryComponent,
    children: [
      { path: '', component: SidenavComponent },
      { path: 'detail/:name', component: CountryDetailsComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
