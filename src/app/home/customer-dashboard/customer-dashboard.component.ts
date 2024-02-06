import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared/sevices/shared.service';
import { AddCustomerComponent } from 'src/app/dialog-boxes/add-customer/add-customer.component';
import { filterList, sortOption } from 'src/app/shared/utils/filter-utils';
import { filter } from 'src/app/shared/interface/filter-interface';
import { CustomerVehiclesComponent } from 'src/app/dialog-boxes/customer-vehicles/customer-vehicles.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss'],
})
export class CustomerDashboardComponent implements OnInit, OnDestroy {
  @ViewChild('customerDetails') customerDetails!: ElementRef;
  public filterList: filter[] = filterList;
  public sortOption: filter[] = sortOption;
  public customerData: any = null;
  customerDetailsSize: any;
  selectMultipleValue: boolean = false;
  public myMath = Math;
  searchedCustomerData: any = null;
  received: any;
  due: any;
  vehicleNumberOptions: any = [];
  showLoader: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(public dialog: MatDialog, private services: SharedService) {}

  public allCustomerData: any = [];

  ngOnInit(): void {
    this.initialApiCalls();

    setTimeout(() => {
      if (this.customerDetails) {
        this.customerDetailsSize =
          this.customerDetails.nativeElement.getBoundingClientRect();
      }
    }, 0);
    this.subscriptions.push(
      this.services.callVehicleApi.subscribe((res: boolean) => {
        if (res) {
          this.initialApiCalls();
          this.services.callVehicleApi.next(false);
        }
      })
    );
  }

  initialApiCalls() {
    this.getVehicle();
    this.getAllCustomer();
  }

  public updatedTable() {
    this.ngOnInit();
  }

  private getAllCustomer() {
    this.showLoader = true;
    this.services.getAllCustomer().subscribe({
      next: (res) => {
        if (res) {
          this.allCustomerData = res;
          this.searchedCustomerData = this.allCustomerData;
          console.log(this.searchedCustomerData);
          let count = 0;

          // due
          for (let item of this.searchedCustomerData) {
            if (item.amount != null && item.amount.includes('-')) {
              // console.log('item=', item);
              count = count + parseInt(item.amount);
            }
            // console.log('count',count)
          }
          this.due = count;

          count = 0;
          for (let item of this.searchedCustomerData) {
            if (item.amount != null && !item.amount.includes('-')) {
              //  console.log('item=', item);
              count = count + parseInt(item.amount);
            }
            //  console.log('count', count);
          }
          this.received = count;
          this.showLoader = false;
        }
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
    this.showLoader = true;

    this.services.filterCustomers(filter).subscribe({
      next: (res) => {
        if (res) {
          this.allCustomerData = res;
          this.searchedCustomerData = this.allCustomerData;
          this.showLoader = false;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public sortCustomer(filter: any) {
    this.showLoader = true;
    this.services.sortCustomer(filter.value).subscribe({
      next: (res) => {
        if (res) {
          this.allCustomerData = res;
          this.searchedCustomerData = this.allCustomerData;
          this.showLoader = false;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public addCustomer() {
    const dialogRef = this.dialog.open(AddCustomerComponent, {
      data: this.vehicleNumberOptions,
      autoFocus: false,
      // height: '450px',
      width: '350px',
      disableClose: true,
      panelClass: 'my-custom-dialog-class',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.services.createdCustomer.subscribe((resOfPostCustomer) => {
          if (resOfPostCustomer) {
            console.log(resOfPostCustomer);

            this.services.addVehicleToCustomer(resOfPostCustomer).subscribe({
              next: (res) => {
                console.log(res);
                if (res) {
                  this.initialApiCalls();
                }
              },
              error: (err) => {
                console.log(err);
              },
            });
          }
        });
      }
    });
  }

  public onValueSelected(value: any) {}

  public closeDetailsSection(e: boolean) {
    if (e) this.customerData = null;
  }

  onSearchNameLocality(searchItem: any) {
    // console.log(this.allCustomerData);
    this.searchedCustomerData = [];
    for (let customer of this.allCustomerData) {
      if (
        customer.name.toLowerCase().includes(searchItem.toLowerCase()) ||
        customer.address.toLowerCase().includes(searchItem.toLowerCase())
      ) {
        this.searchedCustomerData.push(customer);
      }
    }
  }

  getVehicle() {
    this.services.filterVehicle('2').subscribe((res) => {
      if (res) {
        for (let item of res) {
          this.vehicleNumberOptions.push({
            id: item?.id,
            displayName: item?.vehicleNumber,
            value: item?.id,
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
