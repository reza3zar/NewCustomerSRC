import { CustomerStatus } from './customerStatus';
import { CustomerType } from './customerType';
import { Nationality } from './Nationality';

export class CustomerBrief{
    public createDate:string;
    public derivativeCode:string;
    public economicNo:string;
    public externalId:string;
    public name:string;
    public spotCode:string;
    public updateDate:string;
    public id:number;
    public customerStatus:CustomerStatus;
    public customerType:CustomerType;
    public nationality:Nationality;
    public classId:string;

}