import { Component, SimpleChanges,OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/sevices/shared.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit{
  constructor(
    private services: SharedService,
    private snackBar: MatSnackBar,
  ) { }
  ngOnInit(): void {
  }

  form = new FormGroup({
    name : new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]{2,30}$/)]),
    phone: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.min(10)]),
    address : new FormControl()
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

  public addCustomer(){
    console.log(this.form);
    let payLoad = this.form.value
    this.services.addCustomer(this.form.value).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    })
    this.openSnackBar()
    
  }

  openSnackBar() {
    this.snackBar.open('Customer Added Successfuly', 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration:2000,
      panelClass: ['success-snackbar']
    });
  }
  

  public getErrorMessage(value:string) {
    switch (value) {
      case 'name':
        if (this.name.hasError('required')) {
          return 'You must enter a value';
        }
        return this.name.hasError('pattern') ? 'Not a valid name' : '';
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
