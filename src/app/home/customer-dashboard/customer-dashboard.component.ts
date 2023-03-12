import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared/sevices/shared.service';
import { AddCustomerComponent } from 'src/app/dialog-boxes/add-customer/add-customer.component';
import { filterList,sortOption } from 'src/app/shared/utils/filter-utils';
import{filter} from 'src/app/shared/interface/filter-interface'

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss'],
})
export class CustomerDashboardComponent {
  @ViewChild('customerDetails') customerDetails!: ElementRef;
  public filterList:filter[] = filterList
  public sortOption:filter[] = sortOption
  public customerData:any=null
  customerDetailsSize: any;
  selectMultipleValue:boolean=false;
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

  public getCustomerDetails(customer:any){
    this.services.getCustomerDetails(customer.id).subscribe({
      next: (res) => {
        this.customerData = res;
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  public filterCustomer(filter:any){
    
    this.services.filterCustomers(filter.value).subscribe({
      next: (res) => {
        this.allCustomerData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public sortCustomer(filter:any){
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

  public closeDetailsSection(e:boolean){
    if(e)
      this.customerData=null
  }
}
