import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) {

   }

  private apiString = `https://raytransports.com/raytransports/`;

  public getAllCustomer() {
    const api= this.apiString+`getCustomer.php`
    return this.http.get(api);
  }

  public addCustomer(payload:any){
    const api = this.apiString + `postcustomer.php`;
    return this.http.post(api,payload);
  }

  public getCustomerDetails(id:number){
    const api= this.apiString+`getCustomerDetails.php?id=`+id;
    return this.http.get(api);
  }

  public filterCustomers(filterBy:string){
    const api= this.apiString+`getCustomer.php?filter=` + filterBy;
    return this.http.get(api);
  }

  public sortCustomer(sortBy:string){
    const api= this.apiString+`getCustomer.php?sort=` + sortBy;
    return this.http.get(api);
  }
}
