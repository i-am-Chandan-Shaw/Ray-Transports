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
  selectedFilters: any[] = [];
  
  
  sendValue(e: any) {
    // for (let i = 0; i < this.optionList.length; i++) {
    //   this.optionList[i].isSelected = false;
    // }
    // for (let selectedFilter of this.selectedFilters) {
    //   const index = parseInt(selectedFilter);
    //   this.optionList[index].isSelected = true;
    // }
    // console.log(this.optionList, 'this.optionList');
    this.valueSelected.emit(e);
  }
}
