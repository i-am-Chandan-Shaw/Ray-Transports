import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  constructor(private router: Router) {}
  public opened: boolean = false;
  public currentRoute = '/';
  public sideNavItem: any[] = [
    {
      id: 0,
      displayName: 'Customers',
      iconName: 'group',
      isSelected: true,
      routePath: 'home/customer-dashboard',
    },
    {
      id: 1,
      displayName: 'Transactions',
      iconName: 'receipt_long',
      isSelected: false,
      routePath: 'home/transactions',
    },
    {
      id: 2,
      displayName: 'Vehicle',
      iconName: 'local_shipping',
      isSelected: false,
      routePath: 'home/vehicle',
    },
    // {
    //   id: 3,
    //   displayName: 'Reports',
    //   iconName: 'summarize',
    //   isSelected: false,
    //   routePath: 'home/reports',
    // },
    {
      id: 4,
      displayName: 'Settings',
      iconName: 'settings',
      isSelected: false,
      routePath: 'home/settings',
    },
  ];
  public selectedTab = this.sideNavItem[0];
  ngOnInit(): void {
    if (this.selectedTab.routePath !== this.router.url.slice(1)) {
      let temp = this.sideNavItem.filter(
        (item) => item.routePath == this.router.url.slice(1)
      );
      for (let item of this.sideNavItem) {
        if (item.id == temp[0].id) {
          item.isSelected = true;
          temp[0].isSelected = true;
        } else {
          item.isSelected = false;
        }
      }
      this.selectedTab = temp[0];
    }
  }

  public toggleSidenav() {
    this.opened = !this.opened;
  }

  onSeleted(selectedItem: any) {
    for (let navItem of this.sideNavItem) {
      if (selectedItem.id == navItem.id) {
        navItem.isSelected = true;
        this.router.navigate([navItem.routePath]);
        this.selectedTab = navItem;
      } else {
        navItem.isSelected = false;
      }
    }
  }
}
