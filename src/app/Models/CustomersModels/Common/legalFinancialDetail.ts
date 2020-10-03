import { ComboItem } from './../../System/comboItem';
export class LegalFinancialDetail{

  public  totalAssetsBasedOnTheLatestFinancialStatements :number;

  public  recordedCapitalBasedOnTheLatestOfficialNewspaper:number;

  public  totalSalaryOfStockOwnerBasedOnTheLatestFinancialStatements:number;

  public  totalBuysLastYearBasedOnTheLatestFinancialStatements:number;


  public  netSalesAndGrossContractRevenueBasedOnTheLatestFinancialStatements:number;


  public  isTheCustomerRankedByReference:boolean=false;

  public  ratingReferenceName:string;

  public  ratingDate:string;

  public  persianRatingDate : string ;

  public  ratingNumber:number; 

  public  isSpotMarket:boolean=false;

  public  isFutureMarket :boolean=false;

  public  predictContractValueInSpotMarket :number;

  public  predictContractValueInFutureMarket :number;

  public currency:ComboItem;

}
