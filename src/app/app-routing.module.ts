import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryDetailsComponent } from './components/country-details/country-details.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

const routes: Routes = [
  {path: '', component: SidenavComponent},
  {path: 'detail/:name', component: CountryDetailsComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
