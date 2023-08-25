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
  @Input('placeholder') placeholder: string = 'Select';
  selectedFilters: any[] = [];
  @Output() sendMultipleValue: EventEmitter<any> = new EventEmitter<any>();

  sendValue(e: any) {
    if (!this.selectMultipleValue) this.valueSelected.emit(e);
  }
  onClickSendMultipleValue() {
    let temp = [];
    for (let selectedFilter of this.selectedFilters) {
      temp.push(parseInt(selectedFilter) + 1);
    }

    let stringValueArray = temp.map((t) => t.toString());

    this.sendMultipleValue.emit(stringValueArray);
  }
}
