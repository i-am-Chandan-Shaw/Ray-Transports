import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { In_options } from 'src/app/shared/interface/In_options';
import { locality, vehicleStatus } from 'src/app/shared/utils/filter-utils';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss'],
})
export class VehicleCardComponent implements OnInit {
  checkAutoCompleteValueForLocality!: boolean;
  checkAutoCompleteValueForStatus!: boolean;

  public localityOptions: In_options[] = locality;
  public vehicleStatusOptions: In_options[] = vehicleStatus;
  public selectedOption?: In_options;
  editVehicleForm: FormGroup;
  providedLocalityOption: any;
  providedStatusOption: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<VehicleCardComponent>,
    private fb: FormBuilder
  ) {
    console.log('data', data);
    this.editVehicleForm = this.fb.group({
      name: [{ value: data.name, disabled: true }, Validators.required],
      locality: [data.locality],
      vehicleModel: [data.vehicleModel, Validators.required],
      vehicleNumber: [data.vehicleNumber, Validators.required],
      vehicleOwner: [data.vehicleOwner, Validators.required],
      status: [data.isActive ? 'Running' : 'Stopped', Validators.required],
    });
  }

  ngOnInit(): void {
    this.providedLocalityOption = this.data?.locality
      ? this.localityOptions.filter(
          (item) =>
            item?.displayName.toLocaleLowerCase() ==
            this.data.locality.toLocaleLowerCase()
        )
      : '';
    this.providedStatusOption = this.data.isActive
      ? this.vehicleStatusOptions[0]
      : this.vehicleStatusOptions[1];
    if (this.editVehicleForm.value && this.editVehicleForm.value.locality) {
      this.checkAutoCompleteValueForLocality = true;
    }
    if (this.editVehicleForm.value && this.editVehicleForm.value.status) {
      this.checkAutoCompleteValueForStatus = true;
    }
  }

  onSelectedOption(option: In_options, field: string) {
    if (field == 'locality') {
      this.editVehicleForm.patchValue({ locality: option.displayName });
      console.log('editVehicleForm', this.editVehicleForm.value.locality);
      this.checkAutoCompleteValueForLocality = true;
    }

    if (field == 'status') {
      this.editVehicleForm.patchValue({ status: option.displayName });
      console.log('editVehicleForm', this.editVehicleForm.value.status);
      this.checkAutoCompleteValueForStatus = true;
    }
  }

  autoCompleteOutputValue(e: any, field: string) {
    // this.checkAutoCompleteValueForLocality = e
    if (field == 'locality') {
      if (
        this.editVehicleForm.value &&
        this.editVehicleForm.value.locality !== ''
      ) {
        this.checkAutoCompleteValueForLocality = false;
      }
      for (let option of this.localityOptions) {
        let temp = option.value?.toLowerCase();
        let tempInput = e.value?.toLowerCase();
        if (temp == tempInput) {
          this.checkAutoCompleteValueForLocality = true;
          break;
        } else {
          this.checkAutoCompleteValueForLocality = false;
        }
      }
    } else if (field == 'status') {
      if (
        this.editVehicleForm.value &&
        this.editVehicleForm.value.status !== ''
      ) {
        this.checkAutoCompleteValueForStatus = false;
      }
      for (let option of this.vehicleStatusOptions) {
        let temp = option.value?.toLowerCase();
        let tempInput = e.value?.toLowerCase();
        if (temp == tempInput) {
          this.checkAutoCompleteValueForStatus = true;
          break;
        } else {
          this.checkAutoCompleteValueForStatus = false;
        }
      }
    }
  }

  get gf() {
    return this.editVehicleForm.controls;
  }
  closeDialog() {
    this.dialogRef.close(false);
  }

  editVehicleDetails() {
    let newRecord = {
      id: this.data.id,
      name: this.editVehicleForm.value.name,
      isActive: this.editVehicleForm.value.status == 'Running' ? true : false,
      locality: this.editVehicleForm.value.locality,
      vehicleNumber: this.editVehicleForm.value.vehicleNumber,
      vehicleModel: this.editVehicleForm.value.vehicleModel,
      vehicleOwner: this.editVehicleForm.value.vehicleOwner,
      transactionId: this.data.transactionId,
      createdDate: this.data.createdDate,
      createdTime: this.data.createdTime,
      rate: this.data.rate,
    };
    this.dialogRef.close(newRecord);
  }
}
