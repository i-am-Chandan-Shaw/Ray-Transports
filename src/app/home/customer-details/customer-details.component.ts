import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSidenav } from '@angular/material/sidenav';
import { AddTransactionComponent } from 'src/app/dialog-boxes/add-transaction/add-transaction.component';
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

  @ViewChild('sidenav') sidenav!: MatSidenav;



  options: string[] = ['Shibpur', 'Esplanade', 'Sarkar Bazar','Salkia','Central']
  selectedOption:string=''
  // filteredOptions: Observable<string[]> | undefined;
  // options: string[] = ['Shibpur', 'Esplanade', 'Sarkar Bazar','Salkia','Central'];
  // myControl = new FormControl('');
  party_name = '';
  party_ph_no = '';
  party_locality = '';
  constructor(private _bottomSheet: MatBottomSheet) {}
  prop: any;
  ngOnInit() {
    setTimeout(() => {
      this.prop = this.customerDetailsSize;
    }, 0);

    

    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || '')),
    // );
  }

  onSelectedOption(option:string){
    this.selectedOption=option;
    console.log('this.selectedOption==>>',this.selectedOption);
    console.log('this.selectedOption==>>',typeof(option));
    
    
  }
  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }
  // form = new FormGroup({
  //   name : new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]{2,30}$/)]),
  //   phone: new FormControl(),
  //   address : new FormControl('',[Validators.required])
  // })
  // get locality(): any {
  //   return this.form.get('locality');
  // }

  
  opened: boolean = false;
  public myMath = Math;
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
