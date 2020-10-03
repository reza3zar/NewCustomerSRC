import { CustomerCredit } from './CustomerCredit';
import { BrokerCredit } from './BrokerCredit';
import { CreditType } from './CreditType';

    export class CustomerBond extends CustomerCredit {
      constructor() {
        super();
        this.type = CreditType.bond;
      }
    }

    export class BrokerBond extends BrokerCredit {
      constructor() {
        super();
        this.type = CreditType.bond;
      }
    }
