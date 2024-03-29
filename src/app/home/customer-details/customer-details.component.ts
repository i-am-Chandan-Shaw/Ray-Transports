import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { AddTransactionComponent } from 'src/app/dialog-boxes/add-transaction/add-transaction.component';
import { CustomerVehiclesComponent } from 'src/app/dialog-boxes/customer-vehicles/customer-vehicles.component';
import { SharedService } from 'src/app/shared/sevices/shared.service';
import { In_options } from 'src/app/shared/interface/In_options';
import * as XLSX from 'xlsx';

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
  fileName: any;

  public menuHasBackdrop = false;
  public opened: boolean = false;
  public myMath = Math;
  public customerTransactions: any = [];
  public customerVehicles: any = [];
  @Input() vehicleNumberOptions: any;

  showLoader: boolean = false;
  vehicleForm!: FormGroup;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private services: SharedService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.vehicleForm = this.fb.group({
      customerId: [parseInt(this.customerDetails.id)],
      amount: ['', Validators.required],
      vehicleId: ['', Validators.required],
    });
  }
  get gf() {
    return this.vehicleForm.controls;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['customerDetails'] && changes['customerDetails'].currentValue) {
      this.getIndividualTransaction(this.customerDetails);
    }
  }

  public detailsUpdated(data: any) {
    this.customerDetails = data;
    this.customerDetailsUpdated.emit(true);
  }

  private getIndividualTransaction(customer: any) {
    this.showLoader = true;
    this.services.getIndividualTransaction(customer.id).subscribe({
      next: (res: any) => {
        if (res) {
          this.customerTransactions = res.data;
        } else {
          this.customerTransactions = [];
        }
        this.showLoader = false;
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
      panelClass: 'my-custom-dialog-class',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getIndividualTransaction(this.customerDetails);
      }
    });
  }
  onSelectedOption(option: In_options) {
    console.log(option);
    this.gf['vehicleId'].patchValue(option.id);
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
        data: {
          transactionType: 'onYouGaveClicked',
          customerDetails: this.customerDetails,
        },
      });
      bottomSheetRef.afterDismissed().subscribe((addNewEntry) => {
        if (addNewEntry) {
          addNewEntry.amount = parseInt('-' + addNewEntry.amount);
          this.getIndividualTransaction(this.customerDetails);
        }
      });
      panelClass: 'custom-class';
    } else {
      let bottomSheetRef = this._bottomSheet.open(AddTransactionComponent, {
        data: {
          transactionType: 'onYouGotClicked',
          customerDetails: this.customerDetails,
        },
      });
      bottomSheetRef.afterDismissed().subscribe((addNewEntry) => {
        if (addNewEntry) {
          addNewEntry.amount = parseInt('+' + addNewEntry.amount);
          this.getIndividualTransaction(this.customerDetails);
        }
        // console.log(addNewEntry);
      });
      panelClass: 'custom-class';
    }
  }
  onAddVehicleToCustomer() {
    let payload = this.vehicleForm.value;

    this.services.addVehicleToCustomer(payload).subscribe({
      next: (res) => {
        if (res) {
          this.getIndividualTransaction(this.customerDetails);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onChangeInput(e: any) {
    console.log(e);
    if(e == "") this.gf['vehicleId'].patchValue(e);
  }
  onDeleteCustomer(customerId: any) {
    this.services.onDeleteCustomer(customerId).subscribe((res) => {});
    this.customerDetailsUpdated.emit(true);
    this.closeSection();
  }

  exportTable() {
    const element = document.getElementById('customer-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // Add a row with the customer name
    XLSX.utils.sheet_add_aoa(
      ws,
      [[`Customer Name:- ${this.customerDetails.name}`]],
      { origin: 'A1' }
    );

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    this.fileName = `${this.customerDetails.name}-Report.xlsx`;

    XLSX.writeFile(wb, this.fileName);
  }
}
