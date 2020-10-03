import { Guarantee } from './Guarantee';
import { OrderSide } from './OrderSide';
import { GuaranteeType } from './GuaranteeType';
import { OrderStatus } from './OrderStatus';
import { Trade } from './Trade';

    export class Order {
        public orderId: number;
        public userId: string;
        public customerId: number;
        public brokerId: number;
        public guarantee: Guarantee;
        public creationTime: Date;
        public modificationTime: Date;
        public orderSide: OrderSide;
        public symbol: string;
        public value: number;
        public surplus: number;
        public guaranteeCoefficient: number;
        public guaranteeType: GuaranteeType;
        public status: OrderStatus;
        public supplyDate: Date;
        public deliveryDate: Date;
        public privilegedToUseBrokerCredit: boolean;
        public privilegedToUseFormalLetterCredit: boolean;
        public trades: Array<Trade>;
        public guaranteeHistory: Array <Guarantee>;
    }