import { OrderStatus } from './OrderStatus';
import { GuaranteeType } from './GuaranteeType';
import { TimeInterval } from '../Misc/TimeInterval';

    export class SearchOrderDTO {
        public customerId: number;
        public brokerId: number;
        public symbol: string;
        public status: OrderStatus;
        public guaranteeType: GuaranteeType;
        public supplyDate: TimeInterval;
        public deliveryDate: TimeInterval;
    }