import { AuthService } from './../../authService/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  user:any = localStorage.getItem('user')
  
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.user = JSON.parse(this.user)
  }
  LogoutUser() {
    this.authService.logout();
  }
}
