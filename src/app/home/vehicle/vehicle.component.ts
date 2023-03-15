import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/sevices/shared.service';
import { statusList } from 'src/app/shared/utils/filter-utils';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  public cardsDetails:any=[]

  public statusList= statusList

  constructor(private services: SharedService) { }
  ngOnInit(): void {
    this.getAllVehicle()
  }

  public addVehicle() { }

  private getAllVehicle() {
    this.services.getAllVehicle().subscribe({
      next: (res) => {
        console.log(res);
        this.cardsDetails=res
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

}
