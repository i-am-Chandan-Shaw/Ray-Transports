import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './home/home.component';
import { SideNavComponent } from './home/side-nav/side-nav.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { AddCustomerComponent } from './dialog-boxes/add-customer/add-customer.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';  
import { TooltipModule } from 'ng2-tooltip-directive';
import { HttpClientModule } from '@angular/common/http';
import { DateToDaysPipe } from './shared/pipes/date-to-days.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideNavComponent,
    DashboardComponent,
    AddCustomerComponent,
    DateToDaysPipe
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
