import { inquiryTax } from './../Models/CustomersModels/Inquiry/taxInquiry';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppUrl } from '../app-url';
import { VerifyCellPhone } from '../Models/Misc/verifyCellPhone';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  private url = AppUrl;
  constructor(private http:HttpClient) { }

  public getTaxInfobyNationalId(nationalId):Observable<any[]>{
    return this.http.get<any[]>(this.url.inquiryTaxpaer+nationalId);
  }

  public getLegalPersonInfobyNationalId(nationalId):Observable<any[]>{
    return this.http.get<any[]>(this.url.inquirylegalInfo+nationalId);
  }


  public getDepositoryInfobyPostalCode(postalCode):Observable<any[]>{
    return this.http.get<any[]>(this.url.inquiryDepository+postalCode);
  }

  public getFidaLegalPerson(fidaCode):Observable<any[]>{
    return this.http.get<any[]>(this.url.inquiryfidaLegalPerson+fidaCode);
  }

  public getFidaNaturalPerson(fidaCode):Observable<any[]>{
    return this.http.get<any[]>(this.url.inquiryfidanaturalPerson+fidaCode);
  }
  public getVerifyCellInfoIndividualPerson(verify:VerifyCellPhone):Observable<any[]>{
    return this.http.get<any[]>(this.url.verifyCellInfoIndividualPerson+verify.nationalCode+'/'+verify.cellPhone);
  }


  public getVerifyCellInfoLegalPerson(verify:VerifyCellPhone):Observable<any[]>{
    return this.http.get<any[]>(this.url.verifyCellInfoLegalPerson+verify.nationalCode+'/'+verify.nationalCodeCeo+'/'+verify.cellPhone);
  }
  public getDepositoryInfobyNationalID(nationalId):Observable<any[]>{
    return this.http.get<any[]>(this.url.inquiryDepositoryByNationalID+nationalId);
  }

  public getBehinyabInfobyNationalID(nationalId):Observable<any[]>{
    return this.http.get<any[]>(this.url.behinyabinfo+nationalId);
  }

  public getCustomerInfoTsetmcbyNationalID(nationalId):Observable<any[]>{
    return this.http.get<any[]>(this.url.customerInfo+nationalId);
  }
  public getLicenseInfoById(nationalId,typeId:number):Observable<any[]>{
     
      if(typeId==1)  
          return this.http.get<any[]>(this.url.licenseInfoByNationalId+nationalId);
      if(typeId==2)  
          return this.http.get<any[]>(this.url.licenseInfoByNationalCode+nationalId);
      if(typeId==3)  
          return this.http.get<any[]>(this.url.licenseInfoByBusinessId+nationalId);
    
  }
  public getIncomeTaxReturn(nationalId,year):Observable<any[]>{
    return this.http.get<any[]>(this.url.incomeTaxReturn+year+'/'+nationalId);
  }
  
  

}
