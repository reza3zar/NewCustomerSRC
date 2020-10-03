import { Credit } from './Credit';
import { Broker } from '../Misc/Broker';
import { CreditOwnerType } from './CreditOwnerType';

    export class BrokerCredit extends Credit {
        public broker: Broker;
        constructor() {
          super();
          this.ownerType = CreditOwnerType.broker;
        }
    }
