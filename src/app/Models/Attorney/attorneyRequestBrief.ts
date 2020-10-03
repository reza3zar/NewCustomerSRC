import { Country } from '../CustomersModels/Common/country';
import { RequestStatus, RequestType } from '../CustomersModels/Common/requestStatus';
import { ResponseStatus } from '../CustomersModels/Common/responseStatus';

export class AttorneyRequestBrief{

    public   id:number;
    public attorneyName:string;
    public attorneyExternalId:string;
    public customerName :string;
    public customerExternalId :string;
    public brokerUserName:string;
    public requestCreateDateTime :string;
    public requestSendDateTime :string;
    public responseCreateDateTime :string;
    public responseSendDateTime :string;
    public responseDescription :string;
    public nationality:Country
    public requestStatus:RequestStatus;
    public requestType:RequestType;
    public responseStatus:ResponseStatus;
    public responseType:ResponseType;

    
}