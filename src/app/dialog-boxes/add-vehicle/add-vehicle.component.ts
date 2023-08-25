import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/sevices/shared.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss'],
})
export class AddVehicleComponent {
  constructor(private fb: FormBuilder, private services: SharedService) { }
  
  addVehicleForm = this.fb.group({
    vehicleOwner: ['', Validators.required],
    vehicleModel: ['', Validators.required],
    vehicleNo: ['', Validators.required],
  });

  get vehicleOwner(): any {
    return this.addVehicleForm.get('vehicleOwner');
  }
  get vehicleModel(): any {
    return this.addVehicleForm.get('vehicleModel');
  }
  get vehicleNo(): any {
    return this.addVehicleForm.get('vehicleNo');
  }
  addVehicle() {
    // console.log('formValue', this.addVehicleForm.value);
    let temp = {
      vehicleNumber: this.addVehicleForm.value.vehicleNo,
      vehicleModel: this.addVehicleForm.value.vehicleModel,
      vehicleOwner: this.addVehicleForm.value.vehicleOwner,
    }

    this.services.addNewVehicle(temp).subscribe({
      next: (res) => {
        console.log(res);
        
      }
    })

  }

}
