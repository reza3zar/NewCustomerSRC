import { Injectable, Output, EventEmitter, OnDestroy } from "@angular/core";
import { AppUrl } from "../app-url";
import { Observable, Subscription } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { CreditResult } from "../Models/System/resultCredit";
import { Credit } from "../Models/Credit/Credit";

@Injectable({
  providedIn: "root"
})
export class credit implements OnDestroy {
  public url = AppUrl;
    httpOptions = {
    withCredentials: true,
  };

  @Output()
  change: EventEmitter<CreditResult> = new EventEmitter();
  constructor(private http: HttpClient) {}

  localSubscriber:Subscription;

  ngOnDestroy(): void {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }
  }

  public getAllCredit(): Observable<Credit[]> {

    return this.http.get<Credit[]>(this.url.credit);
  }

  public getAllCreditCustomers(): Observable<Credit[]> {
    return this.http.get<Credit[]>(this.url.credit + "/customer");
  }

  public getAllCreditBrokers(): Observable<Credit[]> {
    return this.http.get<Credit[]>(this.url.credit + "/broker");
  }


  public getAllCreditsBaseCredittype(creditType: string) {
    switch (creditType) {
      case "credit":
      this.localSubscriber=  this.getAllCredit().subscribe(data => {
          var result = new CreditResult();
          result.data = data;
          result.creditOption = "credit";
          this.change.emit(result);
        });
        break;
      case "customer":
      this.localSubscriber= this.getAllCreditCustomers().subscribe(data => {
          var result = new CreditResult();
          result.data = data;
          result.creditOption = "customer";
          this.change.emit(result);
        });
        break;
      case "broker":
      this.localSubscriber = this.getAllCreditBrokers().subscribe(data => {
          var result = new CreditResult();
          result.data = data;
          result.creditOption = "broker";
          this.change.emit(result);
        });
        break;
    }
  }
  public getCreditById(credtId:number): Observable<any[]> {
    return this.http.get<any[]>(this.url.credit + "/"+credtId);
  }

  public deleteCreditById(credtId:number){
    const httpOptions = {
      withCredentials: true,
    };

    return this.http.post(this.url.credit + '/delete', credtId,httpOptions);
    // return this.http.delete(this.url.credit + "/"+credtId)
  }

  public addCredit(credit:Credit):Observable<any>{
   return this.http.post(this.url.credit,credit);
  }


  // public getAllCustomerRecordCount():Observable<number>{
  //   return this.http.get<number>(this.url.customers+'?$count=true');
  // }

  // public getAllCustomersBySkipTope(skip:number,top:number) :Observable<Customer[]> {
  //   return this.http.get<Customer[]>(this.url.customers+'?$skip='+skip+'&$top='+top+'');
  // }
}
