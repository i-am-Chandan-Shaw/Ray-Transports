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

        this.handlePageEvent({
          previousPageIndex: 0,
          pageIndex: 0,
          pageSize: 10,
          length: this.transactionDetailsList.length
        });
        
        for(let item of this.transactionDetails){
          this.userList.push({
            id:item.customerId,
            displayName:item.customerName,
            value:item.customerName
          })
        }
        
        //this is how we filter out dublicate array of object
        this.userList=this.userList.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i)
      },error: (err) => {
        console.log(err);
        
      }
    })
    }


    autoCompleteInputValue(e:any){
      this.transactionDetails = []
      for(let item of this.transactionDetailsList){
        const targetDisplayName = typeof e === 'string' ? e.toLowerCase() : e?.displayName.toLowerCase();
        if(item.customerName.toLowerCase().includes(targetDisplayName)){
          this.transactionDetails.push(item)
        }
      }
    }

    handlePageEvent(e: any) {
      this.transactionDetails = []
      console.log(e);
    
      const startIndex = e.pageIndex * e.pageSize;
      const endIndex = startIndex + e.pageSize;
    
      this.transactionDetails = this.transactionDetailsList.slice(startIndex, endIndex);
    }
  }





