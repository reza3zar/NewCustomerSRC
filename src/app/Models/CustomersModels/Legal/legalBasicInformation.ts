import { Country } from './../Common/country';
import { City } from './../Common/city';
import { ComboItem } from "../../System/comboItem";
import { CustomerType } from "../Common/customerType";

export class LegalBasicInformation{

  public companyName:string;

  public activityType:ComboItem;

  public legalType:CustomerType;

  public registerNumber:string;

  public registerCity:City;

  public nationalCode:string;

  public economicCode:string;

  public nationality:Country;

  public registerDate:string;

  public  persianRegisterDate : string ;

  public isLocatedInFreeZones:boolean=false;

  public isLocatedInSpecialZones:boolean=false;

  public freeZone:ComboItem;

  public specialZone:ComboItem;

  public signingProcedure:string;



}
