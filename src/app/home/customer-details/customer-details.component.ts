import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSidenav } from '@angular/material/sidenav';
import { AddTransactionComponent } from 'src/app/dialog-boxes/add-transaction/add-transaction.component';
import { SharedService } from 'src/app/shared/sevices/shared.service';
// import {Observable} from 'rxjs';
// import {map, startWith} from 'rxjs/operators';
// import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent {
  @Input('customerDetailsSize') customerDetailsSize!: number;
  @Input('customerDetails') customerDetails!:any;

  @Output('closeDeatilsSection') closeDeatilsSection=new EventEmitter<boolean>()
  @Output('customerDetailsUpdated') customerDetailsUpdated=new EventEmitter<boolean>()

  @ViewChild('sidenav') sidenav!: MatSidenav;


  public opened: boolean = false;
  public myMath = Math;
  public customerTransactions:any=[]


  constructor(private _bottomSheet: MatBottomSheet, private services:SharedService ) {}
  prop: any;
  ngOnInit() {

    setTimeout(() => {
      this.prop = this.customerDetailsSize;
    }, 300);

  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['customerDetails'].currentValue)
    this.getIndividualTransaction(this.customerDetail)
  }

  public detailsUpdated(data:any){
    this.customerDetails=data
    this.customerDetailsUpdated.emit(true)
  }

  private getIndividualTransaction(customer:any){
    this.services.getIndividualTransaction(customer.id).subscribe({
      next:(res)=>{
        this.customerTransactions=res;
        console.log(this.customerTransactions);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  

  public customerDetail:any={
    transaction: [
      {
        id: '23',
        date: '2023-02-14',
        time: '04:50 PM',
        comment: 'This transaction is added by vehcle no 123',
        amount: -50,
        balance: -50,
        vehicleNo: '123',
        addedBy: 'auto',
      },
      {
        id: '24',
        date: '2023-02-15',
        time: '04:50 PM',
        comment: 'This transaction is added by vehcle no 123',
        amount: -50,
        balance: -100,
        vehicleNo: '123',
        addedBy: 'auto',
      },
      {
        id: '24',
        date: '2023-02-16',
        time: '04:50 PM',
        comment: 'This transaction is added by vehcle no 123',
        amount: -50,
        balance: -150,
        vehicleNo: '123',
        addedBy: 'auto',
      },

      {
        id: '24',
        date: '2023-02-16',
        time: '04:50 PM',
        comment: 'Amount collected',
        amount: 100,
        balance: -50,
        vehicleNo: '',
        addedBy: 'chandan@gmail.com',
      },
    ],
  }
  

  closeSideNav() {
    this.sidenav.close()
  }

  public closeSection(){
    this.closeDeatilsSection.emit(true)
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
        console.log(addNewEntry);
      });
      panelClass: 'custom-class';
    }
  }
}
