import { Injectable } from '@angular/core';
import { AppUrl } from './Url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from "rxjs";
import { CategoryOfDocument } from '../Models/Misc/CategoryOfDocument';
import { EvidenceParameters } from '../Models/Misc/EvidencParameter';
import { UploadOfEvidencParameter } from '../Models/Misc/UploadOfEvidencParameter';
import { FinalizeEvidence } from '../Models/Misc/finalizeEvidence';
import { anyChanged } from '@progress/kendo-angular-common';
import { DocumentTypeEnum } from '../Models/CustomersModels/Enums/MarketEnum';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  public url = AppUrl;
  constructor(private http: HttpClient) { }

  public getEvidenceCategories() : Observable<Array<any>> {
    return this.http.get<Array<any>>(this.url.EvidenceCategories);
  }


  public getEvidenceNodes() : Observable<any> {
    return this.http.get<any>(this.url.SharedEvidenceNodes);
  }

  public getMarketNodes() : Observable<any> {
    return this.http.get<any>(this.url.MarketEvidenceNodes);
  }
//TODO: we should change IsBrokerSide To Enum for Cover any cases
  
  public getTokenForUploadEvidenceOfRequest(requestId,typeId,evidenceId,evidenceName,documentType:DocumentTypeEnum,isBroker:number): Observable<any> {
      let param:EvidenceParameters=new EvidenceParameters();
      param.evidenceId=evidenceId;
      param.requestId=requestId;
      param.description=evidenceName;
      param.label=evidenceName;
      console.log(param)

      if(documentType==DocumentTypeEnum.Attorney)
         return this.http.post<any>(this.url.TokenForUploadEvidenceOfAttorneyRequest+`${requestId}/${evidenceId}`,param);

      if(typeId==CustomerTypeEnum.legalInterior && isBroker==1)
      return this.http.post<any>(this.url.TokenForUploadEvidenceOfLegalInteriorRequest+`${requestId}/${evidenceId}`,param);

      if(typeId==CustomerTypeEnum.legalInterior && isBroker==0)
      return this.http.post<any>(this.url.TokenForUploadEvidenceOfLegalInteriorRequestExchangeSide+`${requestId}/${evidenceId}`,param);

      if(typeId==CustomerTypeEnum.public && isBroker==1)
      return this.http.post<any>(this.url.TokenForUploadEvicdenceOfPublicRequest+`${requestId}/${evidenceId}`,param);

      if(typeId==CustomerTypeEnum.public && isBroker==0)
      return this.http.post<any>(this.url.TokenForUploadEvicdenceOfPublicRequestExchangeSide+`${requestId}/${evidenceId}`,param);

    if(typeId==CustomerTypeEnum.individualInterior && isBroker==1)
      return this.http.post<any>(this.url.TokenForUploadEvidenceOfIndividualInteriorRequest+`${requestId}/${evidenceId}`,param);

    if(typeId==CustomerTypeEnum.individualInterior && isBroker==0)
      return this.http.post<any>(this.url.TokenForUploadEvidenceOfIndividualInteriorRequestExchangeSide+`${requestId}/${evidenceId}`,param);
  }

//TODO: we should change IsBrokerSide To Enum for Cover any cases

  public getStatusOfEvidence(id:number,type:number,documentType:DocumentTypeEnum,isbrokerSide:number): Observable<any> {

    console.log(isbrokerSide);
    
    if(documentType==DocumentTypeEnum.Attorney){
      return this.http.get<any>(this.url.StatusOfEvidenceOfAttorney+id);
    }

    if(type==CustomerTypeEnum.legalInterior && isbrokerSide==1)
      return this.http.get<any>(this.url.StatusOfEvidenceOfLegalInterior+id);

    if(type==CustomerTypeEnum.legalInterior && isbrokerSide==0)
      return this.http.get<any>(this.url.StatusOfEvidenceOfLegalInteriorExchangeSide+id);

    if(type==CustomerTypeEnum.individualInterior && isbrokerSide==1)
      return this.http.get<any>(this.url.StatusOfEvidenceOfIndividualInterior+id);

    if(type==CustomerTypeEnum.individualInterior && isbrokerSide==0)
      return this.http.get<any>(this.url.StatusOfEvidenceOfIndividualInteriorExchangeSide+id);

    if(type==CustomerTypeEnum.public && isbrokerSide==1 )
      return this.http.get<any>(this.url.StatusOfEvidenceOfPublic+id);

      if(type==CustomerTypeEnum.public && isbrokerSide==0 )
      return this.http.get<any>(this.url.StatusOfEvidenceOfPublicExchangeSide+id);
  }


  public getStatusOfEvidenceByExchangeSide(id:number,type:number,documentType:DocumentTypeEnum): Observable<any> {
    if(documentType==DocumentTypeEnum.Attorney){
      return this.http.get<any>(this.url.StatusOfEvidenceOfAttorneyExchangeSide+id);
    }
  }

  public getStatusOfFinalEvidenceBrokerSide(id:number,type:number,documentType:DocumentTypeEnum): Observable<any> {
    if(documentType==DocumentTypeEnum.Attorney){
      return this.http.get<any>(this.url.StatusOfEvidenceOfFinalAttorneyBrokerSide+id);
    }
 
  }

  public getStatusOfFinalEvidenceExchangeSide(id:number,type:number,documentType:DocumentTypeEnum): Observable<any> {
    if(documentType==DocumentTypeEnum.Attorney){
      return this.http.get<any>(this.url.StatusOfEvidenceOfFinalAttorneyExchangeSide+id);
    }
 
  }

  public postFileOfEvidence(token,binaryFile): Observable<any> {
    const payload = new FormData();
    payload.append('token', token);
    payload.append('file', binaryFile,binaryFile.name);

   return this.http.post(this.url.uploadFileOfEvidence,payload)


 


      // }

    // let params:UploadOfEvidencParameter=new UploadOfEvidencParameter();
    // params.file=binaryFile;                
    // params.token=token;
    // return this.http.post<any>(this.url.uploadFileOfEvidence,params,{reportProgress:true,observe:'events'});
  }

  public downloadAllDocuments(arrayKeys): Observable<any> {
    let headers = new HttpHeaders();
    // headers = headers.set('Accept', 'application/pdf');
    let params:any={}
    params.ids=arrayKeys;
    return this.http.post(this.url.downloadAllUploadedDocument,params,{ headers: headers,responseType: 'blob' });
  }

//TODO: we should change documentType To Enum for Cover any cases

  public finalizeEvidence(finalToken,typeId,documentType:DocumentTypeEnum): Observable<any>{
    let final:FinalizeEvidence=new FinalizeEvidence();
    final.token=finalToken.token;

    if(documentType==DocumentTypeEnum.Attorney)
      return this.http.post(this.url.finalizeAttorneyEvicdence,final)

    if(typeId==CustomerTypeEnum.legalInterior)
      return this.http.post(this.url.finalizeLegalEvicdence,final)

      if(typeId==CustomerTypeEnum.public)
      return this.http.post(this.url.finalizePublicEvicdence,final)

    if(typeId==CustomerTypeEnum.individualInterior)
      return this.http.post(this.url.finalizeIndividualEvicdence,final);

    
  }
//TODO: we should change IsBrokerSide To Enum for Cover any cases
  downloadUploadedDocument(uri,isBrokerSide: number): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    let params:any={}
    params.id=uri;

    if(isBrokerSide==1)
      return this.http.post(this.url.downloadUploadedDocument,params,{ headers: headers,responseType: 'blob' });

    if(isBrokerSide==0)
      return this.http.post(this.url.downloadUploadedDocumentExchangeSide,params,{ headers: headers,responseType: 'blob' });
    
  }
   ///api/File/Brokers/Download
}



