import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input('placeholder') placeholder!: string;
  @Output() emitSearchValue = new EventEmitter();

  onSearchValue(searchValue: any) {
    this.emitSearchValue.emit(searchValue);
  }
}
