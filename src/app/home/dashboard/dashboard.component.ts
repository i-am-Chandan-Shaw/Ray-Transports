import { Component, Input, OnInit, SimpleChanges,  } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @Input() selectedTab: string = '';
  constructor(private router:Router) {
  }

  ngOnInit(): void {
   
  }
}
