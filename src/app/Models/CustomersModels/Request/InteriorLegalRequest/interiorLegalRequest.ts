import { LegalBasicInformation } from './../../Legal/legalBasicInformation';
export class InteriorLegalRequest {
  constructor() {
    this.legalbasicInformation = new LegalBasicInformation();
  }
  public legalbasicInformation:LegalBasicInformation;
}
