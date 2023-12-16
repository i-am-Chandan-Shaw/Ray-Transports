import { SharedService } from 'src/app/shared/sevices/shared.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private sharedService: SharedService) {}

  getToken() {
    let user = JSON.parse(JSON.stringify(localStorage.getItem('user')));
    return user.token;
  }

  isLoggedIn() {
    return this.getToken()
  }

  removeToken() {
    localStorage.removeItem('user');
  }

  login(user:any) {
    this.sharedService.login(user).subscribe(
      (res:any) => {
        if (res.token) {
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigate(['/home/customer-dashboard']);
        } else {
          alert(res)
        }
      },
      (err) => {
        alert(err);
      }
    );
  }

  logout() {
    this.removeToken()
    this.router.navigate(['/login']);
  }
}
