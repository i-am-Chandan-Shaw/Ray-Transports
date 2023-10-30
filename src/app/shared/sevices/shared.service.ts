import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private http: HttpClient) {}

  private apiString = `https://raytransports.com/raytransports/`;

  public getAllCustomer() {
    const api = this.apiString + `getCustomer.php`;
    return this.http.get(api);
  }

  public getAllVehicle() {
    const api = this.apiString + `getAllVehicle.php`;
    return this.http.get(api);
  }

  public getTransactionReports() {
    const api = this.apiString + `getTransactionsReport.php`;
    return this.http.get(api);
  }

  public getTransactionReportsPagination(pageNo?:any,pageSize?:any) {
    const api = this.apiString + `getTransactionsReport.php?pageSize=${pageSize}&page=${pageNo}`;
    return this.http.get(api);
  }

  public getTransactionReportsFilterPagination(pageNo?:any,pageSize?:any,dateFilter?:any) {
    const api = this.apiString + `getTransactionsReport.php?pageSize=${pageSize}&page=${pageNo}&dateFilter=${dateFilter}`;
    return this.http.get(api);
  }

  public getTransactionReportsFilterDatePagination(pageNo?:any,pageSize?:any,dateFilter?:any,startDate?:any,endDate?:any) {
    const api = this.apiString + `getTransactionsReport.php?pageSize=${pageSize}&page=${pageNo}&dateFilter=${dateFilter}&startDate=${startDate},&endDate=${endDate}`;
    return this.http.get(api);
  }


  public getIndividualTransaction(customerId: number) {
    const api = this.apiString + `getTransactions.php?customerId=${customerId}&pageSize=1000&page=0`;
    return this.http.get(api);
  }

  public getTransactionByCustomerName(customerName:string){
    const api = this.apiString + `getTransactions.php?customerName=${customerName}`;
    return this.http.get(api);
  }

  public updateTransaction(payload: any) {
    const api = this.apiString + `patchTransaction.php`;
    return this.http.patch(api, payload);
  }

  public onDeleteTransaction(id: string) {
    const api = this.apiString + `deleteTransaction.php?id=` + id;
    return this.http.delete(api);
  }

  public getUserVehicle(customerId: number) {
    const api = this.apiString + `getVehicle.php?customerId=${customerId}`;
    return this.http.get(api);
  }

  public getAllTransactionDetails() {
    const api = this.apiString + `getTransactions.php`;
    return this.http.get(api);
  }

  public getAllTransactionDetailsPagination(pageSize:number,page:number) {
    const api = this.apiString + `getTransactions.php?pageSize=${pageSize}&page=${page}`;
    return this.http.get(api);
  }

  public addIndividualTransaction(payload: any) {
    const api = this.apiString + `postTransaction.php`;
    return this.http.post(api, payload);
  }

  public addNewVehicle(payload: any) {
    const api = this.apiString + `postVehicle.php`;
    return this.http.post(api, payload);
  }

  public addCustomer(payload: any) {
    const api = this.apiString + `postcustomer.php`;
    return this.http.post(api, payload);
  }

  public updateCustomer(payload: any, id: number) {
    const api = this.apiString + `updateCustomer.php?id=` + id;
    return this.http.patch(api, payload);
  }

  public getCustomerDetails(id: number) {
    const api = this.apiString + `getCustomerDetails.php?id=` + id;
    return this.http.get(api);
  }

  public filterCustomers(filterBy: string) {
    const api = this.apiString + `getCustomer.php?filter=` + filterBy;
    return this.http.get(api);
  }

  public sortCustomer(sortBy: string) {
    const api = this.apiString + `getCustomer.php?sort=` + sortBy;
    return this.http.get(api);
  }

  public filterVehicle(filterBy: string) {
    const api = this.apiString + `getAllVehicle.php?filter=` + filterBy;
    return this.http.get<any[]>(api);
  }
  public addVehicleToCustomer(payload: any) {
    const api = this.apiString + `addVehicletoCustomer.php`;
    return this.http.post(api, payload);
  }

  public onDeleteCustomer(id: string) {
    const api = this.apiString + `deleteCustomer.php?id=` + id;
    return this.http.delete(api);
  }

  public stopIndividualVehicle(payload: any, id: number) {
    const api = this.apiString + `stopVehicle.php?transactionId=` + id;
    return this.http.delete(api);
  }
}