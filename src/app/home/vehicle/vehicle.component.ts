import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddVehicleComponent } from 'src/app/dialog-boxes/add-vehicle/add-vehicle.component';
import { VehicleCardComponent } from 'src/app/dialog-boxes/vehicle-card/vehicle-card.component';
import { SharedService } from 'src/app/shared/sevices/shared.service';
import { statusList } from 'src/app/shared/utils/filter-utils';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent implements OnInit {
  public cardsDetails: any = [];

  public statusList = statusList;

  constructor(private services: SharedService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.getAllVehicle();
  }

  public addVehicle() {
        const dialogRef = this.dialog.open(AddVehicleComponent, {
          autoFocus: false,
          height: '450px',
          width: '350px',
          disableClose: true,
        });

        dialogRef.afterClosed().subscribe((result) => {
          console.log(`dialog closed with result: ${result}`);
        });
  }

  private getAllVehicle() {
    this.services.getAllVehicle().subscribe({
      next: (res) => {
        console.log(res);
        this.cardsDetails = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onVehicleClicked(item: any) {
    console.log('item+>>', item);
    const dialogRef = this.dialog.open(VehicleCardComponent, {
      width: '500px',
      height:'400px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`dialog closed with result: ${result}`);
    });
  }
}
