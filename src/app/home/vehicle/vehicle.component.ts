import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddVehicleComponent } from 'src/app/dialog-boxes/add-vehicle/add-vehicle.component';
import { VehicleCardComponent } from 'src/app/dialog-boxes/vehicle-card/vehicle-card.component';
import { SharedService } from 'src/app/shared/sevices/shared.service';
import { statusList } from 'src/app/shared/utils/filter-utils';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent implements OnInit {
  public totalVehicles: any = [];
  searchedVehicle: any;
  showLoader: boolean = false;

  public statusList = statusList;
  fileName: any;
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
      panelClass: 'my-custom-dialog-class',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`dialog closed with result: ${result}`);
      if (result) {
        this.getAllVehicle();
      }
    });
  }

  private getAllVehicle() {
    this.showLoader = true;
    this.services.getAllVehicle().subscribe({
      next: (res) => {
        console.log(res);
        this.totalVehicles = res;
        this.searchedVehicle = this.totalVehicles;
        this.showLoader = false;
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
    this.showLoader = true;
    this.services.filterVehicle(filter.value).subscribe({
      next: (res) => {
        this.totalVehicles = res;
        this.searchedVehicle = this.totalVehicles;
        // console.log(res);
        this.showLoader = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSearchVehicle(searchValue: any) {
    this.searchedVehicle = [];
    console.log(searchValue);
    for (let vehicle of this.totalVehicles) {
      if (
        vehicle.vehicleModel.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        this.searchedVehicle.push(vehicle);
      }
    }
  }

  openEditTransactionDialog(item: any) {
    console.log('item+>>', item);
    const dialogRef = this.dialog.open(VehicleCardComponent, {
      height: '550px',
      width: '550px',
      data: item,
      panelClass: 'my-custom-dialog-class',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`dialog closed with result:`, result);
      if (result) {
        for (let item of this.totalVehicles) {
          if (item.id == result.id) {
            if (
              item.vehicleNumber !== result.vehicleNumber ||
              item.vehicleModel !== result.vehicleModel ||
              item.vehicleOwner !== result.vehicleOwner
            ) {
              let payload = {
                id:item.id,
                vehiclenumber: result.vehicleNumber,
                vehiclemodel: result.vehicleModel,
                vehicleowner: result.vehicleOwner,
              };

              this.services.updateVehicle(payload ).subscribe((res) => {
                if (res) {
                  this.getAllVehicle();
                }
              });
            } else {
              item = { ...result };
            }
          }
        }
        this.searchedVehicle = this.totalVehicles;
      }
    });
  }

  handleDeleteVehicle(item: any) {
    this.services.onDeleteVehicle('1').subscribe((res) => {
      console.log(res);
      if (res) {
        this.getAllVehicle();
      }
    });
  }

  exportTable() {
    const element = document.getElementById('vehicle-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // Add a row with the customer name
    // XLSX.utils.sheet_add_aoa(ws, [[`Customer Name:- ${this.customerDetails.name}`]], { origin: 'A1' });

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    this.fileName = `Vehicles-Report.xlsx`;

    XLSX.writeFile(wb, this.fileName);
  }
}
