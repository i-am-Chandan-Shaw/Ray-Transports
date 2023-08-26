import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { In_options } from '../../interface/In_options';


@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
})
  
export class AutoCompleteComponent implements OnInit {
  @Input() placeholder: any;
  @Input() providedOption?: any;
  myControl = new FormControl('');
  filteredOptions: Observable<In_options[]> | undefined;
  @Input('options') options!: In_options[];
  @Output('selectedOptions') selectedOptions = new EventEmitter<any>();
  @Output('inputValue') inputValue = new EventEmitter<any>();

  public temp: any;

  ngOnInit() {
    this.myControl.patchValue(this.providedOption.displayName)
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.displayName;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
    this.temp = this.options[0];
    // console.log(this.temp);
  }
  onInput(e: any) {
    this.inputValue.emit(e.target?.value);
  }

  onSelectedOptions(option: In_options) {
    this.providedOption = option;
    this.myControl.patchValue(this.providedOption.displayName)
    this.inputValue.emit(option);
    this.selectedOptions.emit(option);
  }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.displayName.toLowerCase().includes(filterValue)
    );
  }
}
