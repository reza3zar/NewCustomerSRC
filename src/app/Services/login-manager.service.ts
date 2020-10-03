import { LoginInfo } from './../Models/LoginInfo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { AppUrl } from "./Url";
@Injectable({
  providedIn: 'root'
})
export class LoginManagerService {
  public url=AppUrl;
  constructor(private http:HttpClient) { }

//   public login(loginInfo:LoginInfo): Observable<any>{
 

//     const httpOptions = {
//       withCredentials: true,
//     };

//     return this.http.post(this.url.logIn,loginInfo,httpOptions)
//   }

//   public logOut(userInfo:any): Observable<any>{
 
//     const httpOptions = {
//       withCredentials: true,
//     };
//     return this.http.post(this.url.logOut,userInfo,httpOptions)
//   }



//   public getChaptchaKey(randomTimeSpan):Observable<any>{
//  return this.http.get<Object>(this.url.captchaKey+randomTimeSpan );
//   }

//   public getChaptchaImage(keyValue):Observable<any>{
//     return  this.http.get(this.url.captchaImg+keyValue, {responseType: 'text'});
//   }

  // public gettest():Observable<any>{
  //   // return this.http.get<Object>("https://sso.ime.co.ir/api/manage/profile" );
  //    }

}
