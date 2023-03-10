import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.scss'],
})
export class FilterComponentComponent {
  @Input('optionList') optionList: any;
  @Input('selectMultipleValue') selectMultipleValue!: boolean;
  @Output('valueSelected') valueSelected = new EventEmitter();

  sendValue(e: any) {
    this.valueSelected.emit(e);
    // console.log(e);
  }
}
