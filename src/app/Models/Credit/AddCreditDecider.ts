import { CreditType } from './CreditType';
import { Broker } from './../Misc/Broker';
import { Customer } from './../Misc/Customer';
import { CreditCategory } from './CreditCategory';
export class AddCreditDecider{

   private _category: CreditCategory;
  public get category(): CreditCategory {
    return this._category;
  }
  public set category(value: CreditCategory) {
    this._category = value;
  }
   public creditType:CreditType;


   constructor(){
     this.customer=new Customer();
     this.broker=new Broker();
     this.category=new CreditCategory();
   }

   private _customer: Customer;
   public get customer(): Customer {
     return this._customer;
   }
   public set customer(value: Customer) {


     this._customer = value;
   }

  private _broker: Broker = new Broker();
  get broker(): Broker {
    return this._broker;
  }
  set broker(item: Broker) {
    this._broker = item;
  }

}
