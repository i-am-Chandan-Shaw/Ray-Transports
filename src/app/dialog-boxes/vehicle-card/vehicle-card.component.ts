import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss'],
})
export class VehicleCardComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log("data From vehicle Card Component",data);
    
  };
}
