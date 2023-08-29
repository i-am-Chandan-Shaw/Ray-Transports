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

  public userList:any[]=[]
  public filterList:filter[] = filterList
  public sortList:filter[]=sortOption
  public myMath = Math;

  transactionDetails:any=[]
  transactionDetailsList:any[]=[]

  ngOnInit(): void {
    this.services.getAllTransactionDetails().subscribe({
      next: (res) => {
        this.transactionDetails = res
        this.transactionDetailsList = JSON.parse(JSON.stringify(this.transactionDetails))
        for(let item of this.transactionDetails){
          this.userList.push({
            id:item.customerId,
            name:item.customerName,
          })
        }
        
        //this is how we filter out array of object
        this.userList=this.userList.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i)
      },error: (err) => {
        console.log(err);
        
      }
    })
    }

    onValueSelected(e:any){
      this.transactionDetails = []
      for(let item of this.transactionDetailsList){
        if(e.name == item.customerName){
          this.transactionDetails.push(item)
        }
      }
    }
  }





