import { Component } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {

  public filterList = [
    {
      id: 0,
      filterName: 'All',
      filterValue: 'all',
    },
    {
      id: 1,
      filterName: 'Active',
      filterValue: 'active',
    },
    {
      id: 2,
      filterName: 'Stopped',
      filterValue: 'stopped',
    },
    {
      id: 3,
      filterName: "You'll Give",
      filterValue: 'give',
    },
    {
      id: 4,
      filterName: "You'll Get",
      filterValue: 'get',
    },
    {
      id: 5,
      filterName: 'Setteled',
      filterValue: 'settled',
    },
  ];

  public myMath = Math;

  transactionDetails=[
    {
      id:12,
      createdDate:'02/22/2023',
      customerName:"Rajib Koley",
      description:'Amount collected',
      addedBy:'Rahul',
      amount:500
    },
    {
      id:13,
      createdDate:'05/22/2023',
      customerName:"Rajib Koley",
      description:'Amount collected',
      addedBy:'Chandan',
      amount:1500
    },
    {
      id:10,
      createdDate:'08/19/2023',
      customerName:"Rajib Koley",
      description:'This amount was generated automatically by system',
      addedBy:'System',
      amount:-200
    },
    {
      id:14,
      createdDate:'09/12/2023',
      customerName:"Rajib Koley",
      description:'Amount collected',
      addedBy:'Amit',
      amount:-800
    },
    {
      id:19,
      createdDate:'12/12/2023',
      customerName:"Sarim Khan",
      description:'This amount was generated automatically by system',
      addedBy:'System',
      amount:-200
    },
    {
      id:21,
      createdDate:'02/29/2023',
      customerName:"Rajib Koley",
      description:'This amount was generated automatically by system',
      addedBy:'System',
      amount:-200
    },
    {
      id:15,
      createdDate:'02/09/2023',
      customerName:"Priti Singh",
      description:'Amount collected',
      addedBy:'Rahul',
      amount:400
    },
    {
      id:12,
      createdDate:'02/22/2023',
      customerName:"Rajib Koley",
      description:'Amount collected',
      addedBy:'Rahul',
      amount:500
    },
    {
      id:13,
      createdDate:'05/22/2023',
      customerName:"Rajib Koley",
      description:'Amount collected',
      addedBy:'Chandan',
      amount:1500
    },
    {
      id:10,
      createdDate:'08/19/2023',
      customerName:"Rajib Koley",
      description:'This amount was generated automatically by system',
      addedBy:'System',
      amount:-200
    },
    {
      id:14,
      createdDate:'09/12/2023',
      customerName:"Rajib Koley",
      description:'Amount collected',
      addedBy:'Amit',
      amount:-800
    },
    {
      id:19,
      createdDate:'12/12/2023',
      customerName:"Sarim Khan",
      description:'This amount was generated automatically by system',
      addedBy:'System',
      amount:-200
    },
    {
      id:21,
      createdDate:'02/29/2023',
      customerName:"Rajib Koley",
      description:'This amount was generated automatically by system',
      addedBy:'System',
      amount:-200
    },
    {
      id:15,
      createdDate:'02/09/2023',
      customerName:"Priti Singh",
      description:'Amount collected',
      addedBy:'Rahul',
      amount:400
    }, {
      id:12,
      createdDate:'02/22/2023',
      customerName:"Rajib Koley",
      description:'Amount collected',
      addedBy:'Rahul',
      amount:500
    },
    {
      id:13,
      createdDate:'05/22/2023',
      customerName:"Rajib Koley",
      description:'Amount collected',
      addedBy:'Chandan',
      amount:1500
    },
    {
      id:10,
      createdDate:'08/19/2023',
      customerName:"Rajib Koley",
      description:'This amount was generated automatically by system',
      addedBy:'System',
      amount:-200
    },
    {
      id:14,
      createdDate:'09/12/2023',
      customerName:"Rajib Koley",
      description:'Amount collected',
      addedBy:'Amit',
      amount:-800
    },
    {
      id:19,
      createdDate:'12/12/2023',
      customerName:"Sarim Khan",
      description:'This amount was generated automatically by system',
      addedBy:'System',
      amount:-200
    },
    {
      id:21,
      createdDate:'02/29/2023',
      customerName:"Rajib Koley",
      description:'This amount was generated automatically by system',
      addedBy:'System',
      amount:-200
    },
    {
      id:15,
      createdDate:'02/09/2023',
      customerName:"Priti Singh",
      description:'Amount collected',
      addedBy:'Rahul',
      amount:400
    },
  ]


}
