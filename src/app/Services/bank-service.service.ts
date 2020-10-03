import { Injectable } from '@angular/core';
import { AppUrl } from '../app-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bank } from '../Models/Misc/Bank';

@Injectable({
  providedIn: 'root'
})
export class BankServiceService {

  private url = AppUrl;
  constructor(private http: HttpClient) {
  }

  public getBanks(): Observable<Array<Bank>>{
    return  this.http.get<Array<Bank>>(this.url.bank);
  }
}
