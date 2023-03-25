import { Component, Inject, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/sevices/shared.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-customer-vehicles',
  templateUrl: './customer-vehicles.component.html',
  styleUrls: ['./customer-vehicles.component.scss'],
})
export class CustomerVehiclesComponent implements OnInit {
  public customerVehicles: any = [];

  constructor(
    private services: SharedService,
    @Inject(MAT_DIALOG_DATA) public customer: any
  ) {}
  ngOnInit(): void {
    this.getUserVehicles(this.customer)
  }
  private getUserVehicles(customer: any) {
    this.services.getUserVehicle(customer.id).subscribe({
      next: (res) => {
        this.customerVehicles = res;
        console.log(this.customerVehicles);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
