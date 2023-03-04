import { Component, Input } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { DatepickerDropdownPositionX } from '@angular/material/datepicker';
@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent {
  // @Input()
  // xPosition: DatepickerDropdownPositionX = "start";

constructor(private _bottomSheetRef: MatBottomSheetRef){}
  onCloseClick(){
    this._bottomSheetRef.dismiss();
  }
}
