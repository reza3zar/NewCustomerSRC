import { Country } from './../CustomersModels/Common/country';
import { AddressDetails } from '../CustomersModels/Individual/addressDetails';
import { PersonalDetails } from './../CustomersModels/Individual/personalDetails';
import { LegalBasicInformation } from './../CustomersModels/Legal/legalBasicInformation';
import { ComboItem } from '../System/comboItem';
import { RequestStatus } from '../CustomersModels/Common/requestStatus';
import { ResponseStatus } from '../CustomersModels/Common/responseStatus';

export class AttorneyRequest{
 
    constructor() {
        this.addressDetails=new Array<AddressDetails>();
        this.personalDetails=new PersonalDetails;
        this.firmDetails=null;
        this.attorneyContractType=new Array<ComboItem>();
        this.attorneyContractStatus=new Array<ComboItem>();
    }

    public correlationId:string;
    public name:string;
    public attorneyName:string;
    public externalId:string;
    public customerExternalId:string;
    public customerName:string;

    public nationality:Country;
    public assignmentDate:string;
    public assignmentExpirationDate:string;
    public contractNumber:string;
    public resolutionNumber:string;
    public documentId:string;
    public consentCode:string;
    public addressDetails:Array<AddressDetails>;
    public personalDetails:PersonalDetails;
    public firmDetails:LegalBasicInformation;
    public attorneyContractType:Array<ComboItem>;
    public attorneyContractStatus:Array<any>;
    public id:number;
    public   requestCreateDate: Date ;
    public   requestStatus : RequestStatus 
    public   responseType : ResponseStatus;
}