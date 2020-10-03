import { Injectable } from "@angular/core";
import { AppUrl } from "../app-url";
import { Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class CustomerCollectionService {
  public url = AppUrl;
  constructor(private http: HttpClient) { }


  getCustomerCollection(){
    // return this.http.get(this.url.customersCollection)
    //   .toPromise()
    //   .then(res => res.json());
  }


  public getAllCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.url.customers);
  }





}
