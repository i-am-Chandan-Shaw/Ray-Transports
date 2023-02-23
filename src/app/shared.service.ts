import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) {

   }

  public getAllCustomer() {
    const api = `https://raytransports.com/raytransports/getCustomer.php`;
    return this.http.get(api);
  }

  public addCustomer(payload:any){
    const api = `https://raytransports.com/raytransports/postcustomer.php`;
    return this.http.post(api,payload);
  }
}
