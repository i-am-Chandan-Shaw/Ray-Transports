import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { periodList } from 'src/app/shared/utils/filter-utils';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  enableCalender:boolean = false
  periodList = periodList;
  fileName:any = 'Transactions-Report.xlsx'

  public myMath = Math;
  reportForm!: FormGroup;

  searchedTransactionDetails: any[] = [];

  transactionDetails = [
    {
      id: 12,
      createdDate: '05/28/2023',
      customerName: 'Rajib Koley',
      description: 'Amount collected',
      addedBy: 'Rahul',
      amount: 500,
    },
    {
      id: 13,
      createdDate: '05/27/2023',
      customerName: 'Rajib Koley',
      description: 'Amount collected',
      addedBy: 'Chandan',
      amount: 1500,
    },
    {
      id: 10,
      createdDate: '08/19/2023',
      customerName: 'Rajib Koley',
      description: 'This amount was generated automatically by system',
      addedBy: 'System',
      amount: -200,
    },
    {
      id: 14,
      createdDate: '09/12/2023',
      customerName: 'Rajib Koley',
      description: 'Amount collected',
      addedBy: 'Amit',
      amount: -800,
    },
    {
      id: 19,
      createdDate: '12/12/2023',
      customerName: 'Sarim Khan',
      description: 'This amount was generated automatically by system',
      addedBy: 'System',
      amount: -200,
    },
    {
      id: 21,
      createdDate: '02/29/2023',
      customerName: 'Rajib Koley',
      description: 'This amount was generated automatically by system',
      addedBy: 'System',
      amount: -200,
    },
    {
      id: 15,
      createdDate: '02/09/2023',
      customerName: 'Priti Singh',
      description: 'Amount collected',
      addedBy: 'Rahul',
      amount: 400,
    },
    {
      id: 12,
      createdDate: '02/22/2023',
      customerName: 'Rajib Koley',
      description: 'Amount collected',
      addedBy: 'Rahul',
      amount: 500,
    },
    {
      id: 13,
      createdDate: '05/22/2023',
      customerName: 'Rajib Koley',
      description: 'Amount collected',
      addedBy: 'Chandan',
      amount: 1500,
    },
    {
      id: 10,
      createdDate: '08/19/2023',
      customerName: 'Rajib Koley',
      description: 'This amount was generated automatically by system',
      addedBy: 'System',
      amount: -200,
    },
    {
      id: 14,
      createdDate: '09/12/2023',
      customerName: 'Rajib Koley',
      description: 'Amount collected',
      addedBy: 'Amit',
      amount: -800,
    },
    {
      id: 19,
      createdDate: '12/12/2023',
      customerName: 'Sarim Khan',
      description: 'This amount was generated automatically by system',
      addedBy: 'System',
      amount: -200,
    },
    {
      id: 21,
      createdDate: '02/29/2023',
      customerName: 'Rajib Koley',
      description: 'This amount was generated automatically by system',
      addedBy: 'System',
      amount: -200,
    },
    {
      id: 15,
      createdDate: '02/09/2023',
      customerName: 'Priti Singh',
      description: 'Amount collected',
      addedBy: 'Rahul',
      amount: 400,
    },
    {
      id: 12,
      createdDate: '02/22/2023',
      customerName: 'Rajib Koley',
      description: 'Amount collected',
      addedBy: 'Rahul',
      amount: 500,
    },
    {
      id: 13,
      createdDate: '05/22/2023',
      customerName: 'Rajib Koley',
      description: 'Amount collected',
      addedBy: 'Chandan',
      amount: 1500,
    },
    {
      id: 10,
      createdDate: '08/19/2023',
      customerName: 'Rajib Koley',
      description: 'This amount was generated automatically by system',
      addedBy: 'System',
      amount: -200,
    },
    {
      id: 14,
      createdDate: '09/12/2023',
      customerName: 'Rajib Koley',
      description: 'Amount collected',
      addedBy: 'Amit',
      amount: -800,
    },
    {
      id: 19,
      createdDate: '12/12/2023',
      customerName: 'Sarim Khan',
      description: 'This amount was generated automatically by system',
      addedBy: 'System',
      amount: -200,
    },
    {
      id: 21,
      createdDate: '02/29/2023',
      customerName: 'Rajib Koley',
      description: 'This amount was generated automatically by system',
      addedBy: 'System',
      amount: -200,
    },
    {
      id: 15,
      createdDate: '02/09/2023',
      customerName: 'Priti Singh',
      description: 'Amount collected',
      addedBy: 'Rahul',
      amount: 400,
    },
  ];

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.searchedTransactionDetails = this.transactionDetails;
    this.reportForm = this.fb.group({
      customerName: [''],
      period: [''],
      startDate: [{ value: '', disabled: true }],
      endDate:[{ value: '', disabled: true }],
    });
  }

  get gf(){
    return this.reportForm.controls
  }
  onSearchVehicle(e: any) {
    this.searchedTransactionDetails = [];
    this.reportForm.patchValue({customerName:e}) 
    for (let transaction of this.transactionDetails) {
      let temp = transaction.customerName.toLowerCase();
      if (temp.includes(e.toLowerCase())) {
        this.searchedTransactionDetails.push(transaction);
      }
    }
  }

  filterList(e: any) {
    console.log(e)
    this.reportForm.patchValue({period:e})
    console.log(this.reportForm.value)
    this.searchedTransactionDetails = [];
    let date = new Date();
    if (e.name == 'Today') {
    }
    if (e.name == 'Yesterday') {
      date.setDate(date.getDate() - 1);
    }

    const formattedDate = date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    for (let transaction of this.transactionDetails) {
      let temp = transaction.createdDate;
      if (temp.includes(formattedDate)) {
        this.searchedTransactionDetails.push(transaction);
      }
    }

    if(e.name == 'Custom'){
      this.enableCalender = true
      this.gf['startDate'].enable();
      this.gf['endDate'].enable();
      
    }else {
      this.enableCalender = false
      this.gf['startDate'].disable();
      this.gf['endDate'].disable();
      this.reportForm.patchValue({startDate:null,endDate:null})
    }
  }

  exportTable() {
    let element = document.getElementById('transaction-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb,this.fileName)
  }
}
