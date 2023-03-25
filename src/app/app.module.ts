import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material/material.module';
import { HomeComponent } from './home/home.component';
import { SideNavComponent } from './home/side-nav/side-nav.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { AddCustomerComponent } from './dialog-boxes/add-customer/add-customer.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'; 
 
import { TooltipModule } from 'ng2-tooltip-directive';
import { HttpClientModule } from '@angular/common/http';
import { DateToDaysPipe } from './shared/pipes/date-to-days.pipe';
import { CustomerDetailsComponent } from './home/customer-details/customer-details.component';
import { LoginComponent } from './login/login.component';
import { AddTransactionComponent } from './dialog-boxes/add-transaction/add-transaction.component';
import { CustomerDashboardComponent } from './home/customer-dashboard/customer-dashboard.component';
import { TransactionsComponent } from './home/transactions/transactions.component';
import { VehicleComponent } from './home/vehicle/vehicle.component';
import { ReportsComponent } from './home/reports/reports.component';
import { SettingsComponent } from './home/settings/settings.component';
import { DropdownComponent } from './shared/component/dropdown/dropdown-component';
import { InputComponent } from './shared/component/input/input.component';
import { AutoCompleteComponent } from './shared/component/auto-complete/auto-complete.component';
import { EditCustomerComponent } from './home/edit-customer/edit-customer.component';
import { CustomerVehiclesComponent } from './dialog-boxes/customer-vehicles/customer-vehicles.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideNavComponent,
    DashboardComponent,
    AddCustomerComponent,
    CustomerDetailsComponent,
    LoginComponent,
    DateToDaysPipe,
    AddTransactionComponent,
    CustomerDashboardComponent,
    TransactionsComponent,
    VehicleComponent,
    ReportsComponent,
    SettingsComponent,
    DropdownComponent,
    InputComponent,
    AutoCompleteComponent,
    EditCustomerComponent,
    CustomerVehiclesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
