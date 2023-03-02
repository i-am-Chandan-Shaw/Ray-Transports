import { Component } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent {

constructor(private _bottomSheetRef: MatBottomSheetRef){}
  onCloseClick(){
    this._bottomSheetRef.dismiss();
  }
}
