import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './home/customer-dashboard/customer-dashboard.component';
import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './home/reports/reports.component';
import { SettingsComponent } from './home/settings/settings.component';
import { TransactionsComponent } from './home/transactions/transactions.component';
import { VehicleComponent } from './home/vehicle/vehicle.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth/auth.guard';
import {HashLocationStrategy, LocationStrategy} from '@angular/common'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'customer-dashboard', component: CustomerDashboardComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'vehicle', component: VehicleComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule { }
