
import { City } from "../Common/city";
import { AddressType } from "../Common/addressType";
import { State } from "../Common/state";

export class AddressDetails{


  public   id  : number ;

  public   state  : State;  

public city : City ;
public   street  : string;


public   alley  : string;


public   pelak  : string ;


public   postalCode  : string ;

public   tel  : string ;


public   cellPhone  : string;


public   email  : string ;


public   addressType  : AddressType;

public fax:string;

  public description:string;

public areaCode:string;

public website:string;
 
    constructor() {
    
    }
}
