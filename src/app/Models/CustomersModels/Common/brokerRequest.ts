import { RequestStatus, RequestType } from "./requestStatus";
import { ResponseStatus } from "./responseStatus";
import { Country } from "./country";
import { CustomerType } from "./customerType";
import { InteriorIndividualRequest } from "../Request/InteriorIndividualRequest/interiorIndividualRequest";

export class brokerRequest {

  public id:number;
  
  public   requestId: number ;

  public   customerType: CustomerType ;
  
  public   nationality: Country ;

  public   requestCreateDate: Date ;

  public   requestStatus : RequestStatus 

  public   responseType : ResponseStatus;

  
  // public   requestName: string ;

  public nationalCode: string;
  public nationalId: string;

  public externalId:string;

  public name:string;

  public requestType:RequestType;

  public responseDescription:string;

  public spotMarket:boolean;
  
  public derivativesMarket:boolean;

  
}
