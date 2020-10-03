import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {AppUrl} from "../app-url";

@Injectable()
export class CustomersService {
  public url = AppUrl;
  constructor(private http: Http) { }

  getCustomers() {

    return this.http.get(this.url.customers)
      .toPromise()
      .then(res => res.json());

  }

}
