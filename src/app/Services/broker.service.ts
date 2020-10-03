import { Observable } from "rxjs/Observable";
import { Broker } from "./../Models/Misc/Broker";
import { HttpClient } from "@angular/common/http";
import { AppUrl } from "./../app-url";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class BrokerService {
  private url = AppUrl;

  static brokerCollection: Array<Broker> = new Array<Broker>();
  constructor(private http: HttpClient) {
  }

  public getBrokers(): Observable<Array<Broker>>{
    return  this.http.get<Array<Broker>>(this.url.broker);
  }
}
