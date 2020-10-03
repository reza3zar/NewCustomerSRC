import { brokerRequest } from "./brokerRequest";
import { PersonalDetails } from "../Individual/personalDetails";
import { AddressDetails } from "../Individual/addressDetails";
import { workingDetails } from "../Individual/workingDetails";
import { IdentityDetails } from "../Individual/identityDetails";
import { FinancialDetails } from "../Individual/financialDetails";
import { BankDetails } from "../Individual/bankeDetails";
import { CommitmentDetailsComponent } from "../../../shareComponentModule/commitment-details/commitment-details.component";

export class InteriorIndividualBrokerRequest extends brokerRequest{
  public personalDetails?: PersonalDetails;
  public addressCollection?: Array<AddressDetails>;
  public workingDetails?: workingDetails;
  public identityCollection?: Array<IdentityDetails>;
  public financialDetails?: FinancialDetails;
  // public bankDetails?: BankDetails;
  public bankDetails?: Array<BankDetails>;
  public commitmentDetails?: CommitmentDetailsComponent;

  constructor() {
    super();
    this.addressCollection=new Array<AddressDetails>();
    this.identityCollection=new Array<IdentityDetails>();
    this.personalDetails=new PersonalDetails();
    this.workingDetails=new workingDetails();
    this.financialDetails=new FinancialDetails();
    // this.bankDetails=new BankDetails();
    this.bankDetails=new Array<BankDetails>();
    this.commitmentDetails=new CommitmentDetailsComponent;
  }
}
