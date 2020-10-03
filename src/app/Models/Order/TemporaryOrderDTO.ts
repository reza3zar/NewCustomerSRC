import { GuaranteeType } from './GuaranteeType';

    export class TemporaryOrderDTO {
        public customerId: number;
        public brokerId: number;
        public guaranteeType: GuaranteeType;
        public value: number;
        public guaranteeCoefficient: number;
        public privilegedToUseBrokerCredit: boolean;
        public privilegedToUseLetterCredit: boolean;
    }