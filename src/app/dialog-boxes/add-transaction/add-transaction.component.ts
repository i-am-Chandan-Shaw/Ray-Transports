import { Component, Inject, Input } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { DatepickerDropdownPositionX } from '@angular/material/datepicker';
@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent {
  // @Input()
  // xPosition: DatepickerDropdownPositionX = "start";
  color = ''

  constructor(private _bottomSheetRef: MatBottomSheetRef<AddTransactionComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}

  ngOnInit() {
    if (this.data == 'onYouGaveClicked') { this.color = '#f44336' }
    if (this.data == 'onYouGotClicked') { this.color = '#379237' }
  }
  onCloseClick(e:MouseEvent) {
    this._bottomSheetRef.dismiss();
    e.preventDefault();
  }
}
