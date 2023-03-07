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
    "netAmount":50,
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
            "comment":"This transaction is added by vehcle no 123",
            "amount": -50,
            "balance":-50,
            "vehicleNo":"123",
            "addedBy":"auto"
        },
        {
          "id":"24",
          "date":"2023-02-15",
          "time":"04:50 PM",
          "comment":"This transaction is added by vehcle no 123",
          "amount": -50,
          "balance":-100,
          "vehicleNo":"123",
          "addedBy":"auto"
          
      },
      {
        "id":"24",
        "date":"2023-02-16",
        "time":"04:50 PM",
        "comment":"This transaction is added by vehcle no 123",
        "amount": -50,
        "balance":-150,
        "vehicleNo":"123",
        "addedBy":"auto"
    },

    {
      "id":"24",
      "date":"2023-02-16",
      "time":"04:50 PM",
      "comment":"Amount collected",
      "amount": 100,
      "balance":-50,
      "vehicleNo":"",
      "addedBy":"chandan@gmail.com"
  },
        
    ]
  }
  onYouGaveClicked(): void {
    this._bottomSheet.open(AddTransactionComponent, { data: 'onYouGaveClicked'}
 );
    panelClass: 'custom-class'
  }
  onYouGotClicked(): void {
    this._bottomSheet.open(AddTransactionComponent,{ data: 'onYouGotClicked'});
    panelClass: 'custom-class'
  }
}
