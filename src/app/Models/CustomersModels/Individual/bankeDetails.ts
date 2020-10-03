import { Bank } from "../Common/bank";
import { City } from "../Common/city";
import { AccountType } from "../Common/accountType";



export  class BankDetails{

  public   id  : number ;


  public   bank  : Bank  ;

  public   city   : City;

  public   branchName  : string  ;


  public   branchCode  : string ;


  public   accountType  : AccountType ;

  public accountKind  : AccountType ;

  public   accountNumber  : string ;


  public   ibanCode  : string;


}
