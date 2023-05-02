import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared/sevices/shared.service';
import { AddCustomerComponent } from 'src/app/dialog-boxes/add-customer/add-customer.component';
import { filterList, sortOption } from 'src/app/shared/utils/filter-utils';
import { filter } from 'src/app/shared/interface/filter-interface';
import { CustomerVehiclesComponent } from 'src/app/dialog-boxes/customer-vehicles/customer-vehicles.component';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss'],
})
export class CustomerDashboardComponent {
  @ViewChild('customerDetails') customerDetails!: ElementRef;
  public filterList: filter[] = filterList;
  public sortOption: filter[] = sortOption;
  public customerData: any = null;
  customerDetailsSize: any;
  selectMultipleValue: boolean = false;
  public myMath = Math;

  constructor(public dialog: MatDialog, private services: SharedService) {}

  public allCustomerData: any = [];

  ngOnInit(): void {
    this.getAllCustomer();
    setTimeout(() => {
      if (this.customerDetails) {
        this.customerDetailsSize =
          this.customerDetails.nativeElement.getBoundingClientRect();
      }
    }, 0);
  }
  ngAfterViewInit() {}

  public updatedTable() {
    this.ngOnInit();
  }

  private getAllCustomer() {
    this.services.getAllCustomer().subscribe({
      next: (res) => {
        this.allCustomerData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public setCustomerDetails(customer: any) {
    this.customerData = customer;
  }

  public filterCustomer(filter: any) {
    this.services.filterCustomers(filter).subscribe({
      next: (res) => {
        this.allCustomerData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public sortCustomer(filter: any) {
    this.services.sortCustomer(filter.value).subscribe({
      next: (res) => {
        this.allCustomerData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public addCustomer() {
    const dialogRef = this.dialog.open(AddCustomerComponent, {
      autoFocus: false,
      height: '450px',
      width: '350px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllCustomer();
      }
    });
  }

  public onValueSelected(value: any) {
    console.log(value);
  }

  public closeDetailsSection(e: boolean) {
    if (e) this.customerData = null;
  }
}
