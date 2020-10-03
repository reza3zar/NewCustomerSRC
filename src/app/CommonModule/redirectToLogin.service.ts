import { Injectable } from "@angular/core";
import { Router } from "@angular/router";



@Injectable( )
export class RedirectToLogin {

  constructor(private router: Router) {
  }

  public redirectToLoginPage():void{
     this.router.navigate(['login']);
  }
}
