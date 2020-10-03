import { CreditRevocationReason } from "./CreditRevocationReason";

    export class CreditRevocation {
        public creditId: number;
        public userId: string;
        public revocationTime: Date;
        public reason: CreditRevocationReason;
        public description: string;
    }