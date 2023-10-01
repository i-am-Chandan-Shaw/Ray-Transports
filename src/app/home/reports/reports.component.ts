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
  // startDatevarialbe: any;
  // endDate: any;
  public myMath = Math;
  reportForm!: FormGroup;
  showLoader:boolean = false

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
    this.showLoader = true
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
          if (res && res.data) {
            this.transactionDetails = res.data;

            this.searchedTransactionDetails = JSON.parse(
              JSON.stringify(this.transactionDetails)
            );
            this.netBalance = res.netBalance;
            this.totalGaveAmount = res.totalGaveAmount;
            this.totalGotAmount = res.totalGotAmount;
            this.totalLength = res.totalCount;
            this.showLoader = false
          }
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

  selectedStartDate(e: any) {
    let temp = this.getFormatterDate(e.value)
    this.reportForm.patchValue({ startDate: temp});
  }
  selectedEndDate(e: any) {
    let temp = this.getFormatterDate(e.value)
    this.reportForm.patchValue({ endDate: temp });
    this.filterList();
  }

  selectedPeriod(e: any) {
    this.reportForm.patchValue({ period: e });
    if (e.name == 'Custom') {
      this.enableCalender = true;
      this.gf['startDate'].enable();
      this.gf['endDate'].enable();
    } else {
      this.enableCalender = false;
      this.gf['startDate'].disable();
      this.gf['endDate'].disable();
      this.reportForm.patchValue({ startDate: null, endDate: null });
      this.filterList();
    }
  }
  filterList() {
    this.searchedTransactionDetails = [];
    if (!this.enableCalender) {
      this.services
        .getTransactionReportsFilterPagination(
          this.pageIndex,
          this.pageSize,
          this.gf['period'].value.id
        )
        .subscribe((res: any) => {
          this.transactionDetails = res?.data;
          this.searchedTransactionDetails = JSON.parse(
            JSON.stringify(this.transactionDetails)
          );
        });
    } else {
      this.services
        .getTransactionReportsFilterDatePagination(
          this.pageIndex,
          this.pageSize,
          this.gf['period'].value.id,
          this.gf['startDate'].value,
          this.gf['endDate'].value
        )
        .subscribe((res: any) => {
          this.transactionDetails = res?.data;
          this.searchedTransactionDetails = JSON.parse(
            JSON.stringify(this.transactionDetails)
          );
        });
    }
  }

  exportTable() {
    let element = document.getElementById('transaction-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }

  handlePageEvent(e: any) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.showLoader = true

    this.services
      .getTransactionReportsPagination(this.pageIndex, this.pageSize)
      .subscribe((res: any) => {
        this.transactionDetails = res.data;
        this.searchedTransactionDetails = JSON.parse(
          JSON.stringify(this.transactionDetails)
        );
        this.showLoader = false
      });
  }

  getFormatterDate(originalDateString: any) {
    const originalDate = new Date(originalDateString);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, '0');
    const day = String(originalDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
}
