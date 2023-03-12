import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router:Router){}

  form = new FormGroup({
    userId : new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  get userId(): any {
    return this.form.get('userId');
  }
  get password(): any {
    return this.form.get('password');
  }

  public getErrorMessage(value:string) {
    switch (value) {
      case 'userId':
        if (this.userId.hasError('required')) {
          return 'You must enter a value';
        }
        else return ''
      case 'password':
        if (this.password.hasError('required')) {
          return 'You must enter a value';
        }
        else return '';
      default:
         return ''
    }
  }

  public login(){
    if(this.form.value.userId=='admin' && this.form.value.password=='1234'){
      this.router.navigate(['home/customer-dashboard'])
    }
    
    
  }
}
