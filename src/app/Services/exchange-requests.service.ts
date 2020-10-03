import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppUrl } from './Url';
import { Observable } from 'rxjs';
import { RequestOptions } from '@angular/http';
import { RequestType } from '../Models/CustomersModels/Enums/RequestType';
import { RejectTypeOfRequestEnum } from '../Models/CustomersModels/Enums/RejectTypeEnum';
 
@Injectable({
  providedIn: 'root'
})
export class ExchangeRequestsService {

  private url = AppUrl;
  private urlBroker = AppUrl;

  constructor(private http: HttpClient) { }

  getAllresponses(): Observable< any>{
    return this.http.get<any>(this.url.responseStatus);
   }

  getRequestsOfBrokers(): Observable< any>{
    return this.http.get<any>(this.url.requestsOfBrokers);
   }

   acceptRequestByReqId(reqId:number,description): Observable< any>{
    return this.http.post<any>(this.url.acceptRequest+reqId,{Description:description});
   }

   rejectRequestByReqId(reqId:number,description): Observable< any>{
    return this.http.post<any>(this.url.rejectRequest+reqId,{Description:description});
   }

   getSupervisorRequests(): Observable< any>{
    return this.http.get<any>(this.url.supervisorRequests);
   }

   supervisorAcceptRequestByReqId(reqId:number,description): Observable< any>{
    return this.http.put<any>(this.url.supervisorAcceptRequest+reqId,{Description:description});
   }

   getHistoryOfrejectRequestByRequestId(requestId ){
 
    // return this.http.get<any>(this.url.historyOfrejectRequest, {  params: new HttpParams({fromString: "Id=4"})});
    // let params = new HttpParams()
    // .set("requestData", encodeURIComponent(JSON.stringify(dataPrincipalBlnc)))
    // .set("authenticationType", this.authType);

    // let params = new HttpParams()
    // .set("Id",  requestId);
    return this.http.get<any>(this.url.historyOfrejectRequest+requestId);
   }

   supervisorRejectRequestByReqId(reqId:number,description,selectedOperation): Observable< any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        Description: description,
      }
    }

    switch (selectedOperation.value) {
      case RejectTypeOfRequestEnum.RejectAltogether:
        return this.http.delete<any>(this.url.supervisorRejectAltogether+reqId,options);

      case RejectTypeOfRequestEnum.RejectToBroker:
        return this.http.delete<any>(this.url.supervisorRejectToBroker+reqId,options);

      case RejectTypeOfRequestEnum.RejectToClerk:
        return this.http.delete<any>(this.url.supervisorReassessment+reqId,options);

      default:
        break;
    }

   }



   public getBrokerRequestInfo(requestId:number,requestIsInterior:boolean,customerType:number,requesttype:number):Observable<any>{
    switch (customerType) {
      case CustomerTypeEnum.individualInterior:
          if(requestIsInterior && requesttype==RequestType.Add){
              return this.http.get(this.url.getIndividualInteriorBrokerRequest+requestId);
          }

          if(!requestIsInterior){
            break;
          }

      case CustomerTypeEnum.legalInterior:
            if(requestIsInterior && requesttype==RequestType.Add){
              return this.http.get(this.url.getLegalInteriorBrokerRequest+requestId);
          }

      case CustomerTypeEnum.public:
            if(requesttype==RequestType.Add){
              return this.http.get(this.url.getPublicBrokerRequestExchangeSide+requestId);
          }

          if(!requestIsInterior){
            break;
          }
        break;
    
      default:
        break;
    }
  }

  public updateResponseStatusByClerk(requestId:number,responseStatusId :number,description:string){
    return this.http.post<any>(this.url.switchResponseRequestStatusByClerk+requestId+"/"+responseStatusId,{Description:description});
  }
  
  public updateResponseStatusBySupervisor(requestId:number,responseStatusId :number,description:string){
    return this.http.post<any>(this.url.switchResponseRequestStatusBySupervisor+requestId+"/"+responseStatusId,{Description:description});
  }

  public getAllCustomers(pageSize):Observable<any>{
    return this.http.get<any>(this.url.allCustomers+'?PageSize='+pageSize);
  }

  public allCustomerReadytoMigration(pageSize):Observable<any>{
    return this.http.get<any>(this.url.allCustomerReadytoMigration+'?PageSize='+pageSize);
  }

  public sendRequestToMigration(requestId): Observable< any>{
    return this.http.post<any>(this.url.migrateToOldSystems+requestId,{});
   }
}
