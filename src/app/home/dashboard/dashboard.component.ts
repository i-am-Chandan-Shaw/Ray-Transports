import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared/sevices/shared.service';
import { AddCustomerComponent } from 'src/app/dialog-boxes/add-customer/add-customer.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  constructor(
    public dialog: MatDialog,
    private services:SharedService
    ) { }

  public allCustomerData:any=[]

  ngOnInit(): void {
    this.getAllCustomer()
  }

  data={
    "id": "1",
    "name": "rajib1",
    "phone": "9062112981",
    "address": "19/4 behari lal das pramnick lane",
    "amount": "0",
    "createdOn": "2023-02-14",
    "isActive": true
}

  private getAllCustomer(){
    this.services.getAllCustomer().subscribe({
      next:(res)=>{
       this.allCustomerData=res;
       console.log(this.allCustomerData);
       
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  public myMath = Math;
  filterOption=[
    {
      id:0,
      name:'Most Recent',
      filterValue:'1',
    },
    {
      id: 1,
      name: 'Highest Amount',
      filterValue: '2',
    },
    {
      id: 2,
      name: 'Least Amount',
      filterValue: '3',
    },
    {
      id: 3,
      name: 'By Name',
      filterValue: '4',
    },
    {
      id: 4,
      name: 'Oldest',
      filterValue: '5',
    }
  ]

  sortByOption = [
    {
      id: 0,
      name: 'Most Recent',
      filterValue: '1',
    },
    {
      id: 1,
      name: 'Highest Amount',
      filterValue: '2',
    },
    {
      id: 2,
      name: 'Least Amount',
      filterValue: '3',
    },
    {
      id: 3,
      name: 'By Name',
      filterValue: '4',
    },
    {
      id: 4,
      name: 'Oldest',
      filterValue: '5',
    }
  ]

  customerTableData=[
    {
      id:0,
      name:'Chandan Shaw',
      amount:-1500,
      createdDate:'6 days ago',
      isActive:true
    },
    {
      id: 0,
      name: 'Rajib Koley',
      amount: 200,
      createdDate: '10 days ago',
      isActive: false
    },
    {
      id: 0,
      name: 'Rahul Shaw',
      amount: -500,
      createdDate: '16 days ago',
      isActive: true
    },
    {
      id: 0,
      name: 'Priti Singh',
      amount: 2000,
      createdDate: '19 days ago',
      isActive: true
    },
    {
      id: 0,
      name: 'Chandan Shaw',
      amount: -1500,
      createdDate: '6 days ago',
      isActive: true
    },
    {
      id: 0,
      name: 'Rajib Koley',
      amount: 200,
      createdDate: '10 days ago',
      isActive: false
    },
    {
      id: 0,
      name: 'Rahul Shaw',
      amount: -500,
      createdDate: '16 days ago',
      isActive: true
    },
    {
      id: 0,
      name: 'Priti Singh',
      amount: 2000,
      createdDate: '19 days ago',
      isActive: true
    },
    {
      id: 0,
      name: 'Chandan Shaw',
      amount: -1500,
      createdDate: '6 days ago',
      isActive: true
    },
    {
      id: 0,
      name: 'Rajib Koley',
      amount: 200,
      createdDate: '10 days ago',
      isActive: false
    },
    {
      id: 0,
      name: 'Rahul Shaw',
      amount: -500,
      createdDate: '16 days ago',
      isActive: true
    },
    {
      id: 0,
      name: 'Priti Singh',
      amount: 2000,
      createdDate: '19 days ago',
      isActive: true
    },
    {
      id: 0,
      name: 'Chandan Shaw',
      amount: -1500,
      createdDate: '6 days ago',
      isActive: true
    },
    {
      id: 0,
      name: 'Rajib Koley',
      amount: 200,
      createdDate: '10 days ago',
      isActive: false
    },
    {
      id: 0,
      name: 'Rahul Shaw',
      amount: -500,
      createdDate: '16 days ago',
      isActive: true
    },
    {
      id: 0,
      name: 'Priti Singh',
      amount: 2000,
      createdDate: '19 days ago',
      isActive: true
    },
  ]

  
  public addCustomer(){
    const dialogRef = this.dialog.open(AddCustomerComponent,{
      height: 'auto',
      width: '400px',
      disableClose:true
    });
  }
}
