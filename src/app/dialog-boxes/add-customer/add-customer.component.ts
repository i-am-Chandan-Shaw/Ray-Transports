import { Component, SimpleChanges, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  addCustomerForm! : FormGroup
  options: string[] = ['Shibpur', 'Esplanade', 'Sarkar Bazar', 'Salkia', 'central'];
  filteredOptions: Observable<string[]> | undefined;

  constructor(
    private services: SharedService,
    private snackBar: MatSnackBar,
    public fb : FormBuilder
  ) { }

  ngOnInit(): void {
    this.addCustomerForm = this.fb.group({
      name:['',[Validators.required,Validators.pattern(/^[a-zA-Z ]{2,30}$/)]],
      locality:['',Validators.required],
      phone:['',[Validators.required,Validators.min(1000000000), Validators.max(9999999999)]]
    })
    this.filteredOptions = this.addCustomerForm.get('locality')?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  get gf(){
    return this.addCustomerForm.controls
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  public addCustomer() {
    console.log(this.addCustomerForm)
    let payLoad = this.addCustomerForm.value
    payLoad.phone = payLoad.phone.toString()
    this.services.addCustomer(JSON.stringify(payLoad)).subscribe({
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
}
