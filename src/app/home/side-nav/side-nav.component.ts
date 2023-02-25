import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  public opened: boolean = false;
  public sideNavItem: any[] = [];

  ngOnInit(): void {
    this.setNavItem();
  }

  public toggleSidenav() {
    this.opened = !this.opened;
    console.log(this.opened);
  }

  private setNavItem() {
    this.sideNavItem = [
      {
        id: 0,
        displayName: 'Customers',
        iconName: 'group',
        isSelected: true,
      },
      {
        id: 1,
        displayName: 'Reports',
        iconName: 'summarize',
        isSelected: false,
      },
      {
        id: 2,
        displayName: 'Settings',
        iconName: 'settings',
        isSelected: false,
      },
    ];
  }

  onSeleted(selectedItem: any) {
    for (let navItem of this.sideNavItem) {
      if (selectedItem.id == navItem.id) {
        navItem.isSelected = true;
      } else {
        navItem.isSelected = false;
        
      }
    }
  }
}
