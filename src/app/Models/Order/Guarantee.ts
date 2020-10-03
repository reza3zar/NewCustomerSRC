import { GuaranteeType } from './GuaranteeType';

    export class Guarantee {
        public creationTime: Date;
        public type: GuaranteeType;
        public customerShare: number;
        public brokerShare: number;
        public letterShare: number;
        public shortage: number;
        public description: string;
    }