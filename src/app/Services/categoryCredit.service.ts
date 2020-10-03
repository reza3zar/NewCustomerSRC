import { CreditCategory } from './../Models/Credit/CreditCategory';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppUrl } from '../app-url';

@Injectable({
  providedIn: 'root'
})
export class CategoryCreditService {

  private url = AppUrl;
  constructor(private http: HttpClient) {
  }

  public getcreditCategories(): Observable<Array<CreditCategory>>{
    return  this.http.get<Array<CreditCategory>>(this.url.categoryCredit);
  }
}
