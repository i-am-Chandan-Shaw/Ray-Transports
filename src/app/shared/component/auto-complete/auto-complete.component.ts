import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {
  myControl = new FormControl('');
  filteredOptions: Observable<string[]> | undefined;
  @Input('options')options!: string[]
  @Output('selectedOptions')selectedOptions=new EventEmitter<string>()

  ngOnInit(){
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  onSelectedOptions(option:string){    
    this.selectedOptions.emit(option)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  form = new FormGroup({
    name : new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]{2,30}$/)]),
    phone: new FormControl(),
    address : new FormControl('',[Validators.required])
  })
  get locality(): any {
    return this.form.get('locality');
  }


  
}
