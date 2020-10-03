    export class AddCreditDTO {
        public creditCategoryId: number;
        public bankId: number;
        public creditNumber: string;
        public value: number;
        public issueDate: Date;
        public dueDate: Date;
        public branchCode: string;
        public branchName: string;
        public description: string;
    }
    export class AddBondDTO extends AddCreditDTO {

    }
    export class AddCashDTO extends AddCreditDTO {
        public paymentId: string;
        public bankAccountCode: string;
        public bankAccountName: string;
        public depositorAddress: string;
        public depositorName: string;
    }
    export class AddCheckDTO extends AddCreditDTO {
        public inFavorOf: string;
        public city: string;
        public bankAccountCode: string;
        public bankAccountName: string;
    }
    export class AddWarrantyDTO extends AddCreditDTO {
        public address: string;
    }