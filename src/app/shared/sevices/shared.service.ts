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
    const api = this.apiString + `getVehicle.php`;
    return this.http.get(api);
  }

  public getIndividualTransaction(customerId: number) {
    const api = this.apiString + `getTransactions.php?customerId=${customerId}`;
    return this.http.get(api);
  }

  public getUserVehicle(customerId: number) {
    const api = this.apiString + `getVehicle.php?customerId=${customerId}`;
    return this.http.get(api);
  }

  public getAllTransactionDetails() {
    const api = this.apiString + `getTransactions.php`;
    return this.http.get(api);
  }

  public addIndividualTransaction(payload: any) {
    const api = this.apiString + ``;
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
    const api = this.apiString + `getVehicle.php?filter=` + filterBy;
    return this.http.get(api);
  }
  public addVehicleToCustomer(payload: any) {
    console.log('=>>',payload)
    const api = this.apiString + `addVehicletoCustomer.php`;
    return this.http.post(api, payload);
  }
}