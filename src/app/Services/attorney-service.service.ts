import { Injectable } from '@angular/core';
import { AppUrl } from './Url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AttorneyRequest } from './../Models/Attorney/AttorneyRequest';
import { RejectTypeOfRequestEnum } from '../Models/CustomersModels/Enums/RejectTypeEnum';

@Injectable({
  providedIn: 'root'
})
export class AttorneyServiceService {

  private url = AppUrl;
  constructor(private http: HttpClient) { }

  public getAttorneyRequests(): Observable< any>{
    return this.http.get<any>(this.url.attorneyRequests);
   }

   public getAttorneyRequestByRequestId(requestId): Observable< any>{
    return this.http.get<any>(this.url.getAttorneyRequestById+requestId);
   }

   public chekIsExistClintInCustomersOfRequest(nationalCode): Observable< any>{
    return this.http.get<any>(this.url.chekIsExistClintInCustomersOfRequest+nationalCode);
   }

   public getAllAttorneyTypes(): Observable< any>{
    return this.http.get<any>(this.url.allAttorneyTypes);
   }

   public addAttorneyRequest(attorneyRequest:AttorneyRequest):Observable<any>{
    return this.http.post(this.url.addAttorney,attorneyRequest);
  }

  public updateAttorneyRequest(reqId ,attorneyRequest:AttorneyRequest):Observable<any>{
    return this.http.put(this.url.updateAttorneyRequest+reqId,attorneyRequest);
  }

  public deleteAttorneyRequest(attorneyRequestId:string):Observable<any>{
    return this.http.delete(this.url.deleteAttorneyRequest+attorneyRequestId,{});
  }

  public sendAttorneyRequest(attorneyRequestId:string):Observable<any>{
    return this.http.post(this.url.sendAttorneyRequest+attorneyRequestId,{});
  }

  public getKeyOfAttorneyRequestForExportPdf(requestId):Observable<any>{
       return this.http.get<any>(this.url.keyOfAttorneyForExportPdf+requestId);
  }

  public getAttorneyRequestsOfLegalUnit():Observable<any>{
    return this.http.get<any>(this.url.getAttorneyRequestsOfLegalUnit);
}

public acceptAttorneyRequestsByLegalUnit(reqId,description):Observable<any>{
  return this.http.post<any>(this.url.acceptAttorneyRequestsByLegalUnit+reqId,{Description:description});
}


public rejectAttorneyRequestsByLegalUnit(reqId,description):Observable<any>{
  return this.http.post<any>(this.url.rejectAttorneyRequestsByLegalUnit+reqId,{Description:description});
}

public getWitnessesAttorneyRequests(reqId):Observable<any>{
  return this.http.get<any>(this.url.getWitnessesAttorneyRequests+reqId);
}

public getAttorneyRequestByIdExchangeSide(reqId,isClerk):Observable<any>{
  if(isClerk)
    return this.http.get<any>(this.url.getAttorneyRequestByIdLegalUnit+reqId);
  else
    return this.http.get<any>(this.url.getAttorneyRequestByIdSuperviosrSide+reqId);
}


public updateResponseIfAttorneyRequestsByLegalUnit(reqId,responseId,description):Observable<any>{
  return this.http.post<any>(this.url.updateResponseIfAttorneyRequestsByLegalUnit+reqId+'/'+responseId,{Description:description});
}


public getAttorneyRequestsOfSupervisor():Observable<any>{
  return this.http.get<any>(this.url.getAttorneyRequestsOfSupervisor);
}

public finalizeAttorneyRequestsBySupervisor(reqId,description):Observable<any>{
  return this.http.put<any>(this.url.finalizeAttorneyRequestsBySupervisor+reqId,{Description:description});
}

public getFinalAttorneysOfBrokers():Observable<any>{
  return this.http.get<any>(this.url.getFinalAttorneysOfBroker);
}
public getFinalAttorneysOfExchange():Observable<any>{
  return this.http.get<any>(this.url.getFinalAttorneysOfExchange);
}
public getAttorneyByIdExchangeSide(id):Observable<any>{
  return this.http.get<any>(this.url.getAttorneyByIdExchangeSide+id);
}

public getAttorneyByIdBrokerSide(id):Observable<any>{
  return this.http.get<any>(this.url.getAttorneyByIdBrokerSide+id);
}
​
 

 
 

supervisorRejectRequestByReqId(reqId:number,description,selectedOperation): Observable< any>{
  const options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    body: {
      Description: description,
    }
  }
console.log(selectedOperation)
  switch (selectedOperation.value) {
    case RejectTypeOfRequestEnum.RejectAltogether:
      return this.http.delete<any>(this.url.rejectAltogetherAttorneyRequestsBySupervisor+reqId,options);

    case RejectTypeOfRequestEnum.RejectToBroker:
      return this.http.delete<any>(this.url.rejectToBrokerAttorneyRequestsBySupervisor+reqId,options);

    case RejectTypeOfRequestEnum.RejectToClerk:
      return this.http.delete<any>(this.url.rejectToClerkAttorneyRequestsBySupervisor+reqId,options);

    default:
      break;
  }

 }


public updateResponseIfAttorneyRequestsBySupervisor(reqId,responseId,description):Observable<any>{
  return this.http.post<any>(this.url.updateResponseIfAttorneyRequestsBySupervisor+reqId+'/'+responseId,{Description:description});
}
public getAttorneyRequestByIdSupervisor(reqId):Observable<any>{
  return this.http.get<any>(this.url.getAttorneyRequestByIdSupervisor+reqId);
}
 
  public getPdfOfRequestByKey(keyCode):Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
        return this.http.post(this.url.getPdfOfAttorneyByKey,keyCode,{ headers: headers,responseType: 'blob' });
  }

}
