import { AuthService } from './../../authService/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  user: any = localStorage.getItem('user')
  picture:string = "https://images.pexels.com/photos/1069798/pexels-photo-1069798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.user = JSON.parse(this.user)
  }
  LogoutUser() {
    this.authService.logout();
  }
}
