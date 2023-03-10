import { Component, EventEmitter, Inject, Input, Output, SimpleChanges } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { DatepickerDropdownPositionX, MatDatepickerInputEvent } from '@angular/material/datepicker';
@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
})
export class AddTransactionComponent {
  color = '';
  amount = '';
  description = '';
  selectedDate: any;
  addNewEntry:any
  today:Date=new Date()

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<AddTransactionComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data == 'onYouGaveClicked') {
      this.color = '#f44336';
    }
    if (this.data == 'onYouGotClicked') {
      this.color = '#379237';
    }
  }
  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes.this.value) {
  //     this.message = `Hello, ${this.name}!`;
  //   }
  // }
  onCloseClick(e: MouseEvent) {
    this._bottomSheetRef.dismiss();
    // e.preventDefault();
  }
  addEntry() {
    this.addNewEntry = {
      amount: this.amount,
      date: this.selectedDate,
      description: this.description,
    };
    this._bottomSheetRef.dismiss(this.addNewEntry);
  
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = event.value;
  }
}
