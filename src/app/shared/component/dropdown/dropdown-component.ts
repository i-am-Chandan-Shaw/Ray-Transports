import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-dropdown-component',
  templateUrl: './dropdown-component.html',
  styleUrls: ['./dropdown-component.scss'],
})
export class DropdownComponent {
  @Input('optionList') optionList: any;
  @Input('selectMultipleValue') selectMultipleValue!: boolean;
  @Output('valueSelected') valueSelected = new EventEmitter();
  @Input('placeholder')placeholder:string='Select'
  

  sendValue(e: any) {
    this.valueSelected.emit(e);
    // console.log(e);
  }
}
