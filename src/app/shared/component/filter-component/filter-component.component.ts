import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.scss']
})
export class FilterComponentComponent {
  @Input('filterList')filterList:any

  @Output() valueSelected = new EventEmitter<string>()


  onSelectionChange(e:MatSelectChange){
    this.valueSelected.emit(e.value)
  }
}
