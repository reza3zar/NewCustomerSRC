import { ComboItem } from './../Models/System/comboItem';
import { AccountType } from './../Models/CustomersModels/Common/accountType';
import { AddressType } from './../Models/CustomersModels/Common/addressType';
import { CustomerType } from './../Models/CustomersModels/Common/customerType';
import { Gender } from './../Models/CustomersModels/Common/gender';
import { Education } from './../Models/CustomersModels/Common/Education';
import { Injectable } from '@angular/core';
import { AppUrl } from '../app-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bank } from '../Models/CustomersModels/Common/Bank';
import { City } from '../Models/CustomersModels/Common/city';
import { Country } from '../Models/CustomersModels/Common/country';
import { State } from '../Models/CustomersModels/Common/State';
import { IdentityType } from '../Models/CustomersModels/Common/identityType';

@Injectable({
  providedIn: 'root'
})
export class ComboBoxesService {

  private url = AppUrl;
  constructor(private http: HttpClient) {
  }

  public getBanks(): Observable<Array<Bank>>{
    return  this.http.get<Array<Bank>>(this.url.bank);
  }

  public getAccountTypes(): Observable<Array<AccountType>>{
    return  this.http.get<Array<AccountType>>(this.url.bankAccountTypes);
  }
  public getCities(): Observable<Array<City>>{
    return  this.http.get<Array<City>>(this.url.Cities);
  }

  public getCountries(): Observable<Array<Country>>{
    return  this.http.get<Array<Country>>(this.url.Countries);
  }

  public getEducations(): Observable<Array<Education>>{
    return  this.http.get<Array<Education>>(this.url.Educations);
  }

  public getGenders(): Observable<Array<Gender>>{
    return  this.http.get<Array<Gender>>(this.url.Genders);
  }

  public getState(): Observable<Array<State>>{
    return  this.http.get<Array<State>>(this.url.States);
  }

  public getCustomerTypes(): Observable<Array<CustomerType>>{
    return  this.http.get<Array<CustomerType>>(this.url.customerType);
  }


  public getAddressTypes(): Observable<Array<AddressType>>{
    return  this.http.get<Array<AddressType>>(this.url.addressType);
  }

  public getIdentityTypes(): Observable<Array<IdentityType>>{
    return  this.http.get<Array<IdentityType>>(this.url.identityType);
  }

  public getLegalTypes(): Observable<Array<CustomerType>>{
    return  this.http.get<Array<CustomerType>>(this.url.legalTypes);
  }

  public getDirectorateAuthoritiesTypes(): Observable<Array<ComboItem>>{
    return  this.http.get<Array<ComboItem>>(this.url.directorateAuthoritiesTypes);
  }

  public getFreeZones(): Observable<Array<ComboItem>>{
    return  this.http.get<Array<ComboItem>>(this.url.freeZones);
  }

  public getMeasurementUnits(): Observable<Array<ComboItem>>{
    return  this.http.get<Array<ComboItem>>(this.url.measurementUnits);
  }


  public getPositions(): Observable<Array<ComboItem>>{
    return  this.http.get<Array<ComboItem>>(this.url.positions);
  }

  public getZonesOfActivity(): Observable<Array<ComboItem>>{
    return  this.http.get<Array<ComboItem>>(this.url.zonesOfActivity);
  }

  public getSeriesLetters(): Observable<Array<ComboItem>>{
    return  this.http.get<Array<ComboItem>>(this.url.seriesLetters);
  }

  public getSpecialZones(): Observable<Array<ComboItem>>{
    return  this.http.get<Array<ComboItem>>(this.url.specialZones);
  }

  public getCurrencies(): Observable<Array<ComboItem>>{
    return  this.http.get<Array<ComboItem>>(this.url.currencies);
  }

  public getMartials(): Observable<Array<ComboItem>>{
    return  this.http.get<Array<ComboItem>>(this.url.martials);
  }

  public getAssociation(): Observable<Array<ComboItem>>{
    return  this.http.get<Array<ComboItem>>(this.url.associations);
  }

  public getPartnerships(): Observable<Array<ComboItem>>{
    return  this.http.get<Array<ComboItem>>(this.url.partnership);
  }


   
  
}
