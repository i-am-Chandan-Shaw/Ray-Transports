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
  customerDetailsSize: any;
  selectMultipleValue:boolean=false

  constructor(public dialog: MatDialog, private services: SharedService) {}

  public allCustomerData: any = [];

  ngOnInit(): void {
    this.getAllCustomer();
    setTimeout(() => {
      if (this.customerDetails.nativeElement) {
        // console.log(this.customerDetails.nativeElement.getBoundingClientRect())
        this.customerDetailsSize =
          this.customerDetails.nativeElement.getBoundingClientRect();
        console.log(this.customerDetailsSize);
      }
    }, 0);
  }
  ngAfterViewInit() {}



  private getAllCustomer() {
    this.services.getAllCustomer().subscribe({
      next: (res) => {
        this.allCustomerData = res;
        console.log(this.allCustomerData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public myMath = Math;


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

  onValueSelected(value: any) {
    console.log(value);
  }
}
