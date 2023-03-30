import { Component, Inject, OnInit } from '@angular/core';
import { filterList, sortOption } from 'src/app/shared/utils/filter-utils';
import{filter} from 'src/app/shared/interface/filter-interface'
import { SharedService } from 'src/app/shared/sevices/shared.service';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  constructor(private services:SharedService){}

  public userList=[
    {
      id:0,
      name:'John',
      email:'john@gmail.com'
    },
    {
      id:2,
      name:'Mark',
      email:'mark@gmail.com'
    },
    {
      id:3,
      name:'Sam',
      email:'samb@gmail.com'
    },
    {
      id:4,
      name:'Lilly',
      email:'lilly@gmail.com'
    },
  ]
  public filterList:filter[] = filterList
  public sortList:filter[]=sortOption
  public myMath = Math;

  transactionDetails:any=[]

  ngOnInit(): void {
    this.services.getAllTransactionDetails().subscribe({
      next: (res) => {
        this.transactionDetails=res
      },error: (err) => {
        console.log(err);
        
      }
    })
    }
  }





