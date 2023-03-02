import { Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddTransactionComponent } from 'src/app/dialog-boxes/add-transaction/add-transaction.component';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent {
  @Input('customerDetailsSize')customerDetailsSize!:number
  constructor(private _bottomSheet: MatBottomSheet){}
  prop:any
  ngOnInit(){
    setTimeout(() => {
      console.log("customerDetailsSize",this.customerDetailsSize);
      this.prop=this.customerDetailsSize
      console.log('prop===>',this.prop.width);
    }, 0);
    
  }
  opened: boolean=false;
  public myMath = Math;
  customerDetails={
    "id":1,
    "name":"Rajib Koley",
    "phone":"98493849389",
    "locality":"New Market",
    "netAmount":3324,
    "vehicle":[
        {
            "id":"232",
            "vehicleNo":"WB203033",
            "vehicleType":"van"
        },
        {
            "id":"212",
            "vehicleNo":"WB2035343",
            "vehicleType":"van"
        }
    ],
    "transaction":[
        {
            "id":"23",
            "date":"2023-02-14",
            "time":"04:50 PM",
            "comment":"This is a demo comment for transcation",
            "amount": -2500
        },
        {
            "id":"3",
            "date":"2023-01-07",
            "time":"10:14 AM",
            "comment":"This is a demo comment for transcation",
            "amount": 1800
        },
        {
          "id":"23",
          "date":"2023-02-14",
          "time":"04:50 PM",
          "comment":"This is a demo comment for transcation",
          "amount": -2500
      },
      {
          "id":"3",
          "date":"2023-01-07",
          "time":"10:14 AM",
          "comment":"This is a demo comment for transcation",
          "amount": 1800
      },
      {
        "id":"23",
        "date":"2023-02-14",
        "time":"04:50 PM",
        "comment":"This is a demo comment for transcation",
        "amount": -2500
    },
    {
        "id":"3",
        "date":"2023-01-07",
        "time":"10:14 AM",
        "comment":"This is a demo comment for transcation",
        "amount": 1800
    },
    {
      "id":"23",
      "date":"2023-02-14",
      "time":"04:50 PM",
      "comment":"This is a demo comment for transcation",
      "amount": -2500
  },
  {
      "id":"3",
      "date":"2023-01-07",
      "time":"10:14 AM",
      "comment":"This is a demo comment for transcation",
      "amount": 1800
  },

    ]
  }
  openBottomSheet(): void {
    this._bottomSheet.open(AddTransactionComponent);
    panelClass: 'custom-class'
  }
}
