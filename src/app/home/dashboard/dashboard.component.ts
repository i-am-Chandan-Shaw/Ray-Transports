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

  public filterList=[
    {
      id:0,
      filterName:'All',
      filterValue:'all'
    },
    {
      id:1,
      filterName:'Active',
      filterValue:'active'
    },
    {
      id:2,
      filterName:'Stopped',
      filterValue:'stopped'
    },
    {
      id:3,
      filterName:'You\'ll Give',
      filterValue:'give'
    },
    {
      id:4,
      filterName:'You\'ll Get',
      filterValue:'get'
    },
    {
      id:5,
      filterName:'Setteled',
      filterValue:'settled'
    },
  ]

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
  sortOption=[
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


  
  public addCustomer(){
    const dialogRef = this.dialog.open(AddCustomerComponent,{
      height: 'auto',
      width: '400px',
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getAllCustomer()
      }
      
    });
  }
}