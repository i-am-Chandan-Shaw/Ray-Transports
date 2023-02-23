import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  public opened: boolean = false;
  public sideNavItem: any[] = []

  ngOnInit(): void {
    this.setNavItem()
  }

  public toggleSidenav() {
    this.opened = !this.opened
  }

  private setNavItem() {

    this.sideNavItem = [
      {
        id: 0,
        displayName: 'Customers',
        iconName: 'group',
        isSelected: 'false'
      },
      {
        id: 1,
        displayName: 'Reports',
        iconName: 'summarize',
        isSelected: 'false'
      },
      {
        id: 2,
        displayName: 'Settings',
        iconName: 'settings',
        isSelected: 'false'
      }
    ]

  }

}
