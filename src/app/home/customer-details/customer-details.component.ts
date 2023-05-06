import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { AddTransactionComponent } from 'src/app/dialog-boxes/add-transaction/add-transaction.component';
import { CustomerVehiclesComponent } from 'src/app/dialog-boxes/customer-vehicles/customer-vehicles.component';
import { SharedService } from 'src/app/shared/sevices/shared.service';
import { In_options } from 'src/app/shared/interface/In_options';
import { vehicleNumber } from 'src/app/shared/utils/filter-utils'


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent {
  @Input('customerDetailsSize') customerDetailsSize!: number;
  @Input('customerDetails') customerDetails!: any;

  @Output('closeDeatilsSection') closeDeatilsSection =
    new EventEmitter<boolean>();
  @Output('customerDetailsUpdated') customerDetailsUpdated =
    new EventEmitter<boolean>();

  @ViewChild('sidenav') sidenav!: MatSidenav;

  public selectedOption?: In_options;
  public opened: boolean = false;
  public myMath = Math;
  public customerTransactions: any = [];
  public customerVehicles: any = [];
  prop: any;
  public vehicleNumberOptions: In_options[] = vehicleNumber;
  public vehicleRate:any

  constructor(
    private _bottomSheet: MatBottomSheet,
    private services: SharedService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // console.log('this.customerDetails==', this.customerDetails);
    setTimeout(() => {
      this.prop = this.customerDetailsSize;
    }, 300);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['customerDetails'].currentValue) {
      this.getIndividualTransaction(this.customerDetails);
    }
  }

  form = new FormGroup({
    rate: new FormControl('', [Validators.required]),
    vehicleNumber: new FormControl('', [Validators.required]),
  });

  get rate(): any {
    return this.form.get('rate');
  }
  get vehicleNumber(): any {
    return this.form.get('vehicleNumber');
  }

  public detailsUpdated(data: any) {
    this.customerDetails = data;
    this.customerDetailsUpdated.emit(true);
  }

  private getIndividualTransaction(customer: any) {
    this.services.getIndividualTransaction(customer.id).subscribe({
      next: (res) => {
        this.customerTransactions = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public openVehicleDialog() {
    const dialogRef = this.dialog.open(CustomerVehiclesComponent, {
      autoFocus: false,
      height: '550px',
      width: '650px',
      data: this.customerDetails,
    });
  }
  onSelectedOption(option: In_options) {
    this.selectedOption = option;
  }

  closeSideNav() {
    this.sidenav.close();
  }

  public closeSection() {
    this.closeDeatilsSection.emit(true);
  }

  initiateTransaction(transactionType: string) {
    if (transactionType == 'gave') {
      let bottomSheetRef = this._bottomSheet.open(AddTransactionComponent, {
        data: 'onYouGaveClicked',
      });
      bottomSheetRef.afterDismissed().subscribe((addNewEntry) => {
        if (addNewEntry) {
          addNewEntry.amount = parseInt('-' + addNewEntry.amount);
        }
        console.log(addNewEntry);
      });
      panelClass: 'custom-class';
    } else {
      let bottomSheetRef = this._bottomSheet.open(AddTransactionComponent, {
        data: 'onYouGotClicked',
      });
      bottomSheetRef.afterDismissed().subscribe((addNewEntry) => {
        if (addNewEntry) {
          addNewEntry.amount = parseInt('+' + addNewEntry.amount);
        }
        // console.log(addNewEntry);
      });
      panelClass: 'custom-class';
    }
  }
  onAddVehicleToCustomer() {
    let temp = {
      customerId: parseInt(this.customerDetails.id),
      vehicleId: this.selectedOption?.id,
      amount: parseInt(this.vehicleRate),
    };
    console.log(temp)
    this.services.addVehicleToCustomer(temp).subscribe({
      next: (res) => {
        // console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
