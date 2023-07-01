import { Component, SimpleChanges, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/sevices/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  myControl = new FormControl('');
  options: string[] = ['Shibpur', 'Esplanade', 'Sarkar Bazar', 'Salkia', 'central'];
  filteredOptions: Observable<string[]> | undefined;
  constructor(
    private services: SharedService,
    private snackBar: MatSnackBar,
  ) { }
  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]{2,30}$/)]),
    phone: new FormControl(),
    address: new FormControl('', [
      Validators.required,
    ])
  })


  get name(): any {
    return this.form.get('name');
  }
  get phone(): any {
    return this.form.get('phone');
  }
  get address(): any {
    return this.form.get('address');
  }

  public addCustomer() {
    let payLoad = this.form.value
    this.services.addCustomer(this.form.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.openSnackBar()

  }

  openSnackBar() {
    this.snackBar.open('Customer Added Successfuly', 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 2000,
      panelClass: ['success-snackbar']
    });
  }


  public getErrorMessage(value: string) {
    switch (value) {
      case 'name':
        if (this.name.hasError('required')) {
          return 'You must enter a value';
        }
        return this.name.hasError('pattern') ? 'Not a valid name' : '';
      case 'address':
        if (this.address.hasError('required')) {
          return 'You must enter a value';
        }
        return this.address.hasError('') ? 'Not a valid Locality name' : '';
      case 'phone':
        if (this.phone.hasError('required')) {
          return 'You must enter a value';
        } else if (this.phone.hasError('min')) {
          return 'Enter only 10 digits';
        }
        return this.phone.hasError('pattern') ? 'Not a valid number' : '';
      default:
        return
    }
  }
}
