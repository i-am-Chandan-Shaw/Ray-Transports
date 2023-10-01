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
  searchedVehicle: any;
  showLoader:boolean = false

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
      // console.log(`dialog closed with result: ${result}`);
      this.getAllVehicle();
    });
  }

  private getAllVehicle() {
    this.showLoader = true
    this.services.getAllVehicle().subscribe({
      next: (res) => {
        // console.log(res);
        this.cardsDetails = res;
        this.searchedVehicle = this.cardsDetails;
        this.showLoader = false
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onVehicleClicked(item: any) {
    // console.log('item+>>', item);
    // const dialogRef = this.dialog.open(VehicleCardComponent, {
    //   height: '150px',
    //   width: '350px',
    //   data: item,
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`dialog closed with result: ${result}`);
    // });
  }
  filterVehicle(filter: any) {
    this.showLoader = true
    this.services.filterVehicle(filter.value).subscribe({
      next: (res) => {
        this.cardsDetails = res;
        this.searchedVehicle = this.cardsDetails;
        // console.log(res);
        this.showLoader = false
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSearchVehicle(searchValue: any) {
    this.searchedVehicle = [];
    // console.log(this.cardsDetails);
    for (let cardDetail of this.cardsDetails) {
      if (cardDetail.vehicleModel.toLowerCase().includes(searchValue.toLowerCase())) {
        this.searchedVehicle.push(cardDetail);
      }
    }
  }
}
