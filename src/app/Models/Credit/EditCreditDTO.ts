    export class EditCreditDTO {
        public branchCode: string;
        public branchName: string;
        public description: string;
    }
    export class EditBondDTO extends EditCreditDTO {

    }
    export class EditCashDTO extends EditCreditDTO {
        public paymentId: string;
        public bankAccountCode: string;
        public bankAccountName: string;
        public depositorAddress: string;
        public depositorName: string;
    }
    export class EditCheckDTO extends EditCreditDTO {
        public inFavorOf: string;
        public city: string;
        public bankAccountCode: string;
        public bankAccountName: string;
    }
    export class EditWarrantyDTO extends EditCreditDTO {
        public address: string;
    }