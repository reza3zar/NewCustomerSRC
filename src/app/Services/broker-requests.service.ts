import { InteriorIndividualRequest } from './../Models/CustomersModels/Request/InteriorIndividualRequest/interiorIndividualRequest';
import { InteriorLegalBrokerRequest } from './../Models/CustomersModels/Common/interiorLegalBrokerRequest';
import { brokerRequest } from './../Models/CustomersModels/Common/brokerRequest';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders   } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { AppUrl } from '../app-url';
import { InteriorIndividualBrokerRequest } from '../Models/CustomersModels/Common/interiorIndividualBrokerRequest';
import { RequestType } from '../Models/CustomersModels/Enums/RequestType';
import { AssignRequestParameters } from '../Models/Misc/assignRequestParameters';
import { PrintModeEnum } from '../Models/CustomersModels/Enums/PrintModeEnum';
import { PublicBrokerRequest } from './../Models/CustomersModels/Common/publicBrokerRequest';

@Injectable({
  providedIn: 'root'
})
export class BrokerRequestsService {

  private url = AppUrl;
  constructor(private http: HttpClient) { }


  public getBrokerRequests(): Observable< any>{
   return this.http.get<any>(this.url.brokerRequests);
  }

  public chekIsExistExternalId(externalId):Observable<any>{
    return this.http.get(this.url.chekIsExistExternalId+'/'+externalId);
  }

  public chekIsExistExternalIdWithBriefInformation(externalId):Observable<any>{
    
    return this.http.get(this.url.chekIsExistExternalIdWithBreifInformation+'/'+externalId);
  }

  public saveLegalInteriorNewRequest(interiorLegalReq:InteriorLegalBrokerRequest):Observable<any>{
    return this.http.post(this.url.saveLegalInteriorNewRequest,interiorLegalReq);
  }

  public savePublicNewRequest(publicReq:PublicBrokerRequest):Observable<any>{
    return this.http.post(this.url.savePublicNewRequest,publicReq);
  }

  
  public saveLegalInteriorEditOfNewRequest(interiorLegalReq:InteriorLegalBrokerRequest):Observable<any>{
    return this.http.put(this.url.saveLegalInteriorEditOfNewRequest+interiorLegalReq.id,interiorLegalReq);
  }

  
  public savePublicEditOfNewRequest(publicReq:PublicBrokerRequest):Observable<any>{
    return this.http.put(this.url.savePublicEditOfNewRequest+publicReq.id,publicReq);
  }

  public saveDraftIndividualInteriorNewRequest(interiorIndividualRequest:InteriorIndividualBrokerRequest):Observable<any>{
    return this.http.post(this.url.saveIndividualInteriorNewRequest,interiorIndividualRequest);
  }

  public saveDraftIndividualInteriorEditOfNewRequest(interiorIndividualRequest:InteriorIndividualBrokerRequest):Observable<any>{
    return this.http.put(this.url.saveIndividualInteriorEditOfNewRequest+interiorIndividualRequest.id,interiorIndividualRequest);
  }

  public sendDraftRequestToServer(requestId:number,requestTypeId:number,requestIsInterior:boolean,customerType:number):Observable<any>{

    if(customerType===CustomerTypeEnum.public)
    return this.http.post(this.url.sendAddDraftPublicToServer+requestId,'');

    if(requestTypeId== RequestType.Add  && requestIsInterior/*irainianCustomer*/&& customerType==CustomerTypeEnum.individualInterior)
         return  this.http.post(this.url.sendAddDraftIndividualInteriorToServer+requestId,'');

    if(requestTypeId==RequestType.Add  && requestIsInterior/*irainianCustomer*/&& customerType==CustomerTypeEnum.legalInterior)
         return  this.http.post(this.url.sendAddDraftLegalInteriorToServer+requestId,''); 
    
    if(requestTypeId==RequestType.Assign)
        return this.http.post(this.url.sendAssignDraftRequestToServer+requestId,'');

    if(requestTypeId==RequestType.Remove)
        return this.http.post(this.url.sendRemoveDraftRequestToServer+requestId,'');
       
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

          if(!requestIsInterior){
            break;
          }
      case CustomerTypeEnum.public:
            
                return this.http.get(this.url.getPublicBrokerRequest+requestId);
         
        break;
    
      default:
        break;
    }
  }


  public deleteDraftRequest(requestId:number,requestTypeId:number,requestIsInterior:boolean,customerType:number):Observable<any>{

    if(customerType===CustomerTypeEnum.public)
    return  this.http.delete(this.url.deletePublicRequest+requestId); 

    if(requestTypeId==1/*Add */&& requestIsInterior/*irainianCustomer*/&& customerType==1/*Individual*/)
         return  this.http.delete(this.url.sendAddDraftIndividualInteriorToServer+requestId);

    if(requestTypeId==1/*Add */&& requestIsInterior/*irainianCustomer*/&& customerType==3/*Individual*/)
         return  this.http.delete(this.url.sendAddDraftLegalInteriorToServer+requestId); 
  }

  public getAllCustomersOfBroker(pageSize):Observable<any>{
    return this.http.get<any>(this.url.allCustomersOfBroker+'?PageSize='+pageSize);
  }

 

  public getKeyOfIndividualInteriorForExportPdf(requestId,printMode:PrintModeEnum):Observable<any>{
    if(printMode==PrintModeEnum.CodeIssuanceForm)
       return this.http.get<any>(this.url.keyOfIndividualInteriorForExportPdf+requestId);
    if(printMode==PrintModeEnum.SampleSignatureIndividualForm || printMode==PrintModeEnum.SignedRightHolders)
       return this.http.get<any>(this.url.keyOfPublishSignatureAuthority+requestId);
      //  /api/broker/Requests/publishSignatureAuthority/{id}
  }
 
  public getPdfOfRequestByKey(keyCode,printMode):Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    switch (printMode) {
      case PrintModeEnum.CodeIssuanceForm:
        return this.http.post(this.url.getPdfOfRequestByKey,keyCode,{ headers: headers,responseType: 'blob' });

      case PrintModeEnum.SampleSignatureIndividualForm:
        return this.http.post(this.url.getPdfOfIndividualAuthoritySignatureForm,keyCode,{ headers: headers,responseType: 'blob' });

      case PrintModeEnum.SignedRightHolders:
        return this.http.post(this.url.SignedRightHolders,keyCode,{ headers: headers,responseType: 'blob' });

      default:
        break;
    }

  }

 

  public getInquiryOfRequest(customerType:CustomerTypeEnum,nationalCode :string):Observable<any>{
    switch (customerType) {
      case CustomerTypeEnum.legalInterior:
        return this.http.get(this.url.inquirylegalInteriorRequestInfo +nationalCode);
      case CustomerTypeEnum.individualExterior:
          return this.http.get(this.url.inquiryIndividualExteriorRequestInfo +nationalCode);
      case CustomerTypeEnum.legalExterior:
            return this.http.get(this.url.inquirylegalExteriorRequestInfo +nationalCode);
      case CustomerTypeEnum.individualInterior:
        return this.http.get(this.url.inquiryIndividualInteriorRequestInfo +nationalCode);
      
      case CustomerTypeEnum.public:
        return this.http.get(this.url.inquirylegalInteriorRequestInfo +nationalCode);

          // return this.http.get(this.url.inquiryPublicRequestInfo +nationalCode);

      default:
        return null;
    }
  }

  public sendDraftAssignRequestToServer(externalId):Observable<any>{

    let requestParameters=new AssignRequestParameters();
    requestParameters.code=externalId;
    return  this.http.post(this.url.sendDraftAssignRequestToServer,requestParameters); 
  }

  public sendDraftRemoveRequestToServer(externalId):Observable<any>{
    let requestParameters=new AssignRequestParameters();
    requestParameters.code=externalId;
    return  this.http.post(this.url.sendDraftRemoveRequestToServer,requestParameters); 
  }

}
 