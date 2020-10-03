import { TradeStatus } from './TradeStatus';

    export class Trade {
        public id: number;
        public buyOrderId: number;
        public sellOrderId: number;
        public creationTime: Date;
        public modificationTime: Date;
        public contractNumber: number;
        public contractTime: Date;
        public assignmentId: number;
        public value: number;
        public deliveryDate: Date;
        public status: TradeStatus;
        public isVirtual: boolean;
    }