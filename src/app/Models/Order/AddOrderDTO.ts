import { OrderSide } from './OrderSide';
import { GuaranteeType } from './GuaranteeType';

    export class AddOrderDTO {
        public orderId: number;
        public customerId: number;
        public brokerId: number;
        public orderSide: OrderSide;
        public symbol: string;
        public value: number;
        public guaranteeCoefficient: number;
        public guaranteeType: GuaranteeType;
        public supplyDate: Date;
        public deliveryDate: Date;
        public privilegedToUseBrokerCredit: boolean;
        public privilegedToUseFormalLetterCredit: boolean;
    }