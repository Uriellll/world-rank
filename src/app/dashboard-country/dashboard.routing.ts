import { AuthGuard, canMatch } from './../services/guard.guard';
import { Routes, RouterModule } from '@angular/router';
import { DashboardCountryComponent } from './dashboard-country.component';
import { NgModule } from '@angular/core';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardCountryComponent,
    canActivate: [AuthGuard],
    canMatch: [canMatch],
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
