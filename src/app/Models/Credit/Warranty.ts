import { CreditType } from './CreditType';
import { CustomerCredit } from "./CustomerCredit";
import { BrokerCredit } from "./BrokerCredit";

    export class CustomerWarranty extends CustomerCredit {
        public address: string;
        constructor() {
          super();
          this.type = CreditType.warranty;
        }
    }

    export class BrokerWarranty extends BrokerCredit {
        public address: string;
        constructor() {
          super();
          this.type = CreditType.warranty;
        }
    }
