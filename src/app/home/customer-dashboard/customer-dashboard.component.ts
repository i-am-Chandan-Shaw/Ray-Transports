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
  searchedCustomerData: any = null;
  youWillGet: any;
  youWillGive: any;
  vehicleNumberOptions:any= []
  showLoader:boolean = false

  constructor(public dialog: MatDialog, private services: SharedService) {}

  public allCustomerData: any = [];

  ngOnInit(): void {
    this.getVehicle()
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
    this.showLoader = true
    this.services.getAllCustomer().subscribe({
      next: (res) => {
        this.allCustomerData = res;
        this.searchedCustomerData = this.allCustomerData;
        console.log(this.searchedCustomerData);
        let count = 0;

        // YouWillGive
        for (let item of this.searchedCustomerData) {
          if (item.amount != null && item.amount.includes('-')) {
            // console.log('item=', item);
            count = count + parseInt(item.amount);
          }
          // console.log('count',count)
        }
        this.youWillGive = count;

        count = 0;
        for (let item of this.searchedCustomerData) {
          if (item.amount != null && !item.amount.includes('-')) {
            //  console.log('item=', item);
            count = count + parseInt(item.amount);
          }
          //  console.log('count', count);
        }
        this.youWillGet = count;
        this.showLoader = false
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
    this.showLoader = true

    this.services.filterCustomers(filter).subscribe({
      next: (res) => {
        this.allCustomerData = res;
        this.searchedCustomerData = this.allCustomerData;
        this.showLoader = false
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public sortCustomer(filter: any) {
    this.showLoader = true
    this.services.sortCustomer(filter.value).subscribe({
      next: (res) => {
        this.allCustomerData = res;
        this.searchedCustomerData = this.allCustomerData;
        this.showLoader = false
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public addCustomer() {
    const dialogRef = this.dialog.open(AddCustomerComponent, {
      autoFocus: false,
      // height: '450px',
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
  }

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

  getVehicle(){
    this.services.filterVehicle('2').subscribe(res=>{
      for(let item of res){
        this.vehicleNumberOptions.push({id:item?.id,displayName:item?.vehicleNumber,value:item?.id})
      }
    })
  }
}
