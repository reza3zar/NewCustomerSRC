import { CustomerCredit } from './CustomerCredit';
import { BrokerCredit } from './BrokerCredit';
import { CreditType } from './CreditType';

    export class CustomerCheck extends CustomerCredit {
        public inFavorOf: string;
        public city: string;
        public bankAccountCode: string;
        public bankAccountName: string;

        constructor() {
          super();
          this.type = CreditType.check;
        }
    }
    export class BrokerCheck extends BrokerCredit {
        public inFavorOf: string;
        public city: string;
        public bankAccountCode: string;
        public bankAccountName: string;

        constructor() {
          super();
          this.type = CreditType.check;
        }
    }
