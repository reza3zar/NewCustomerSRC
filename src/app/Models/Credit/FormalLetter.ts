import { Customer } from "../Misc/Customer";
import { FormalLetterStatus } from "./FormalLetterStatus";

    export class FormalLetter {
        public id: number;
        public customer: Customer;
        public creatorId: string;
        public modifierId: string;
        public creationTime: Date;
        public modificationTime: Date;
        public status: FormalLetterStatus;
        public ceilingAmount: number;
        public issueDate: Date;
        public dueDate: Date;
        public letterNo: string;
        public letterDate: Date;
        public letterDescription: string;
    }