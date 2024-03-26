import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardRoutingModule } from './dashboard-country/dashboard.routing';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'dashboard', loadChildren: () => import('./dashboard-country/dashboard.module').then(m => m.DashboardModule)},
  {path: 'login', component:LoginComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DashboardRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
