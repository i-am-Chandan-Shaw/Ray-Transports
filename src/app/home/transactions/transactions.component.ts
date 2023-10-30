import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { filterList1, sortOption } from 'src/app/shared/utils/filter-utils';
import { filter } from 'src/app/shared/interface/filter-interface';
import { SharedService } from 'src/app/shared/sevices/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component';
import { ModelComponent } from 'src/app/shared/component/model/model.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  constructor(private services: SharedService, public dialog: MatDialog) {}

  public userList: any[] = [];
  public filterList: filter[] = filterList1;
  public myMath = Math;
  pageSize = 10;
  pageIndex = 0;
  totalLength!: number;
  addedBy: filter[] = [];
  showLoader: boolean = false;

  transactionDetails: any = [];
  transactionDetailsList: any[] = [];
  screenHeight: any;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenHeight = window.innerHeight;
    this.pageSize = Math.floor((this.screenHeight - 240) / 30);
  }

  ngOnInit(): void {
    this.onResize();
    this.showLoader = true;
    this.services
      .getAllTransactionDetailsPagination(this.pageSize, this.pageIndex)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.transactionDetails = res;
          this.totalLength = this.transactionDetails.totalCount;
          this.transactionDetails = this.transactionDetails.data;
          this.transactionDetailsList = JSON.parse(
            JSON.stringify(this.transactionDetails)
          );

          for (let item of this.transactionDetails) {
            this.userList.push({
              id: item.customerId,
              displayName: item.customerName,
              value: item.customerName,
            });
            this.addedBy.push({
              id: item.customerId,
              name: item.addedBy,
              value: item.addedBy,
              isSelected: false,
            });
          }

          //this is how we filter out dublicate array of object
          this.userList = this.userList.filter(
            (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
          );
          this.addedBy = this.addedBy.filter(
            (v, i, a) => a.findIndex((v2) => v2.name === v.name) === i
          );
          this.showLoader = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  autoCompleteInputValue(e: any) {
    this.transactionDetails = [];
    for (let item of this.transactionDetailsList) {
      const targetDisplayName =
        typeof e === 'string' ? e.toLowerCase() : e?.displayName.toLowerCase();
      if (item.customerName.toLowerCase().includes(targetDisplayName)) {
        this.transactionDetails.push(item);
      }
    }
  }
  onSelectUserInputValue(e: any) {
    console.log(e);
    this.services
      .getTransactionByCustomerName(e.displayName)
      .subscribe((res: any) => {
        console.log(res.data);
        this.transactionDetails = res.data;
        this.totalLength = res.totalCount;
      });
  }

  handlePageEvent(e: any) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.showLoader = true;

    this.services
      .getAllTransactionDetailsPagination(this.pageSize, this.pageIndex)
      .subscribe((res) => {
        this.transactionDetails = res;
        this.transactionDetails = this.transactionDetails.data;
        this.showLoader = false;
      });
  }

  public openEditTransactionDialog(selectedTransaction: any) {
    const dialogRef = this.dialog.open(EditTransactionComponent, {
      disableClose: true,
      autoFocus: false,
      height: '450px',
      width: '450px',
      data: selectedTransaction,
    });
    dialogRef.afterClosed().subscribe((updatedTransaction) => {
      console.log('up', updatedTransaction);
      if(updatedTransaction){
        for (let transaction of this.transactionDetails) {
          if (transaction.transactionId == updatedTransaction.transactionId) {
            transaction.customerName = updatedTransaction.customerName;
            transaction.addedBy = updatedTransaction.addedBy;
            transaction.amount = updatedTransaction.amount;
            transaction.description = updatedTransaction.description;
          }
        }
        this.services.updateTransaction(updatedTransaction).subscribe({
          next: (res) => {
            console.log('response=>>', res);
          },
        });
      }
    });
  }

  public openDeleteTransactionDialog(selectedTransaction: any) {

    const dialogRef = this.dialog.open(ModelComponent, {
      disableClose: true,
      autoFocus: false,
      height: '200px',
      width: '250px',
      data: { status: 'delete' },
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log('res=>', res);
      if (res == true) {
        this.transactionDetails = this.transactionDetails.filter((arr: any) => {
          return arr.transactionId != selectedTransaction.transactionId;
        });
        this.services.onDeleteTransaction(selectedTransaction.transactionId).subscribe({
          next:(res)=>{
            console.log('delete_response',res)
          }
        })
        this.totalLength = this.totalLength - 1
        this.openSuccessDialog()
      }
    });

    
  }

  openSuccessDialog(){
    const dialogRef = this.dialog.open(ModelComponent, {
      disableClose: true,
      autoFocus: false,
      height: '200px',
      width: '250px',
      data: { status: 'success' },
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log('res=>', res);
    });
  }
}
