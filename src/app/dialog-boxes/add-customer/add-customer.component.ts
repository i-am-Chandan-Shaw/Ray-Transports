import { vehicleNumber } from './../../shared/utils/filter-utils';
import { Component, SimpleChanges, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/sevices/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
})
export class AddCustomerComponent implements OnInit {
  addCustomerForm!: FormGroup;
  options: string[] = [
    'Shibpur',
    'Esplanade',
    'Sarkar Bazar',
    'Salkia',
    'central',
  ];
  filteredOptions: Observable<string[]> | undefined;
  vehicleRateOptions: Observable<any> | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private services: SharedService,
    private snackBar: MatSnackBar,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.addCustomerForm = this.fb.group({
      picture: [''],
      name: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z ]{2,30}$/)],
      ],
      locality: ['', Validators.required],
      phone: [
        '',
        [
          Validators.min(1000000000),
          Validators.max(9999999999),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      aadharNumber: [''],
      vehicleNumber: ['', Validators.required],
      vehicleRate: ['', Validators.required],
    });
    this.filteredOptions = this.addCustomerForm
      .get('locality')
      ?.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterLocality(value || ''))
      );

    this.vehicleRateOptions = this.addCustomerForm
      .get('vehicleRate')
      ?.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterVehicleRate(value || ''))
      );
  }

  private _filterLocality(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterVehicleRate(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.data.filter((data: any) =>
      data.displayName.toLowerCase().includes(filterValue)
    );
  }

  get gf() {
    return this.addCustomerForm.controls;
  }

  profilePic(e: any) {
    this.gf['picture'].patchValue(e);
  }

  public addCustomer() {
    console.log(this.addCustomerForm);
    let payLoad = this.addCustomerForm.value;
    payLoad.phone = payLoad.phone.toString();

    this.services.addCustomer(JSON.stringify(payLoad)).subscribe({
      next: (res: any) => {
        if (res) {
          console.log(res);
          this.services.createdCustomer.next({
            customerId: res.customerId,
            vehicleId: res.vehicleId,
            amount: res.vehicleRate,
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.openSnackBar();
  }

  openSnackBar() {
    this.snackBar.open('Customer Added Successfuly', 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 2000,
      panelClass: ['success-snackbar'],
    });
  }
}
