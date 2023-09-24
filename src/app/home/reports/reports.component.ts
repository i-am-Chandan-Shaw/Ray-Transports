import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/sevices/shared.service';
import { periodList } from 'src/app/shared/utils/filter-utils';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  enableCalender: boolean = false;
  periodList = periodList;
  fileName: any = 'Transactions-Report.xlsx';
  pageSize = 10;
  pageIndex = 0;
  totalLength!: number;
  netBalance: any;
  totalGaveAmount: any;
  totalGotAmount: any;

  public myMath = Math;
  reportForm!: FormGroup;

  searchedTransactionDetails: any[] = [];

  transactionDetails: any = [];
  screenHeight: any;

  constructor(private fb: FormBuilder, private services: SharedService) {}
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenHeight = window.innerHeight;
    this.pageSize = Math.floor((this.screenHeight - 450) / 32);
  }

  ngOnInit(): void {
    this.getTransactionsReport();
    this.reportForm = this.fb.group({
      customerName: [''],
      period: [''],
      startDate: [{ value: '', disabled: true }],
      endDate: [{ value: '', disabled: true }],
    });
  }

  get gf() {
    return this.reportForm.controls;
  }

  getTransactionsReport() {
    this.onResize();
    this.services
      .getTransactionReportsPagination(this.pageIndex, this.pageSize)
      .subscribe(
        (res: any) => {
          this.transactionDetails = res.data;

          this.searchedTransactionDetails = JSON.parse(
            JSON.stringify(this.transactionDetails)
          );
          this.netBalance = res.netBalance;
          this.totalGaveAmount = res.totalGaveAmount;
          this.totalGotAmount = res.totalGotAmount;
          this.totalLength = res.totalCount;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  onSearchVehicle(e: any) {
    this.searchedTransactionDetails = [];
    this.reportForm.patchValue({ customerName: e });
    for (let transaction of this.transactionDetails) {
      let temp = transaction.customerName.toLowerCase();
      if (temp.includes(e.toLowerCase())) {
        this.searchedTransactionDetails.push(transaction);
      }
    }
  }

  filterList(e: any) {
    console.log(e);
    this.reportForm.patchValue({ period: e });
    console.log(this.reportForm.value);


    // let date = new Date();

    // if (e.name == 'Yesterday') {
    //   date.setDate(date.getDate() - 1);
    // }

    // const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits for the day
    // const month = date.toLocaleString('en-US', { month: 'short' });
    // const year = date.getFullYear();

    // const formattedDate = `${day} ${month} ${year}`;

    // for (let transaction of this.transactionDetails) {
    //   let temp = transaction.date;
    //   if (temp.includes(formattedDate)) {
    //     this.searchedTransactionDetails.push(transaction);
    //   }
    // }
 
    if (e.name == 'Custom') {
      this.enableCalender = true;
      this.gf['startDate'].enable();
      this.gf['endDate'].enable();
   
    } else {
      this.searchedTransactionDetails = [];
      this.enableCalender = false;
      this.gf['startDate'].disable();
      this.gf['endDate'].disable();
      this.reportForm.patchValue({ startDate: null, endDate: null });

      this.services
      .getTransactionReportsFilterPagination(this.pageIndex, this.pageSize,e.id)
      .subscribe((res: any) => {
        this.transactionDetails = res.data;
        this.searchedTransactionDetails = JSON.parse(
          JSON.stringify(this.transactionDetails)
        );
      });
    }
    console.log(this.reportForm.value)
  }

  exportTable() {
    let element = document.getElementById('transaction-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }

  handlePageEvent(e: any) {
    console.log(e);
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.services
      .getTransactionReportsPagination(this.pageIndex, this.pageSize)
      .subscribe((res: any) => {
        this.transactionDetails = res.data;
        this.searchedTransactionDetails = JSON.parse(
          JSON.stringify(this.transactionDetails)
        );
      });
  }
}
