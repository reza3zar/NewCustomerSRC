import { CustomerCredit } from './CustomerCredit';
import { BrokerCredit } from './BrokerCredit';
import { CreditType } from './CreditType';

    export class CustomerCash extends CustomerCredit {
        public paymentId: string;
        public bankAccountCode: string;
        public bankAccountName: string;
        public depositorAddress: string;
        public depositorName: string;

        constructor() {
          super();
          this.type = CreditType.cash;
        }
    }
    export class BrokerCash extends BrokerCredit {
        public paymentId: string;
        public bankAccountCode: string;
        public bankAccountName: string;
        public depositorAddress: string;
        public depositorName: string;

        constructor() {
          super();
          this.type = CreditType.cash;
        }
    }
