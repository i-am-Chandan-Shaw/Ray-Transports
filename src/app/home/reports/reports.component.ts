import { Component } from '@angular/core';
import { periodList } from 'src/app/shared/utils/filter-utils';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  periodList=periodList

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
