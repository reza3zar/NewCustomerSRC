import { Broker } from './../Misc/Broker';
import { Customer } from "./../Misc/Customer";
import { TimeInterval } from "../Misc/TimeInterval";
import { CreditCategory } from "./CreditCategory";
import { Bank } from '../Misc/Bank';

export class SearchCreditDTO {
  constructor() {
    this.dueDate = new TimeInterval();
  }
  // public customerId: number;
  // public brokerId: number;
  // public creditCategoryId: number;
  // public bankId: number;
  public creditNumber: string;
  public minValue: number;
  public maxValue: number;
  public dueDate: TimeInterval;
  public branchCode: string;
  public branchName: string;

  // get creditCategory(): CreditCategory {
  //   let crdCategory: CreditCategory = new CreditCategory();
  //   crdCategory.id = this.creditCategoryId;
  //   return crdCategory;
  // }

  private _creditCategoryId: number;
  get creditCategoryId(): number {
    return this._creditCategoryId;
  }
  set creditCategoryId(count: number) {
    let crdItem = new CreditCategory();
    crdItem.id = count;
    this.creditCategory = crdItem;
    this._creditCategoryId = count;
  }

  private _crdCategory: CreditCategory = new CreditCategory();
  get creditCategory(): CreditCategory {
    return this._crdCategory;
  }
  set creditCategory(item: CreditCategory) {
    this._crdCategory = item;
  }

  // set value(v: any) {
  //   if (v !== this.creditCategory) {
  //     this.creditCategory.value = v;
  //     this.onChangeCallback(v);
  //   }
  // }

  private _custId: number;
  get customerId(): number {
    return this._custId;
  }
  set customerId(count: number) {
    let custItem = new Customer();
    custItem.customerId = count;
    this.customer = custItem;
    this._custId = count;
  }

  private _cust: Customer = new Customer();
  get customer(): Customer {
    return this._cust;
  }
  set customer(item: Customer) {
    this._cust = item;
  }



  private _brokerId: number;
  get brokerId(): number {
    return this._brokerId;
  }
  set brokerId(count: number) {
    let brokerItem = new Broker();
    brokerItem.brokerId = count;
    this.broker = brokerItem;
    this._brokerId = count;
  }

  private _broker: Broker = new Broker();
  get broker(): Broker {
    return this._broker;
  }
  set broker(item: Broker) {
    this._broker = item;
  }



  private _bankId: number;
  get bankId(): number {
    return this._bankId;
  }
  set bankId(count: number) {
    let bankItem = new Bank();
    bankItem.id = count;
    this.bank = bankItem;
    this._bankId = count;
  }

  private _bank: Bank = new Bank();
  get bank(): Bank {
    return this._bank;
  }
  set bank(item: Bank) {
    this._bank = item;
  }


}
