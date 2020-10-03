import { Credit } from "./Credit";
import { Customer } from "../Misc/Customer";
import { CreditOwnerType } from "./CreditOwnerType";

export class CustomerCredit extends Credit {
  public customer: Customer;
  /**
   *
   */
  constructor() {
    super();
    this.ownerType = CreditOwnerType.customer;
  }
}
