import { ComboItem } from './../../System/comboItem';
import { City } from "../Common/city";
import { Country } from "../Common/country";
import { Gender } from "../Common/Gender";
import * as moment from 'jalali-moment';

export class PersonalDetails{


public  firstName : string ;


public  lastName : string;



public  gender : Gender ;


public  birthDate : string ;
public  persianBirthBirthDate : string ;

 

public  fatherName : string ;



public  identificationNumber : string ;


public  registerCity : City ;


public  nationality : Country;

public maritalStatus : ComboItem;


public  serial : string ;

public  nationalCode : string ;

public economicCode:string;

public letterSeries:string;

public digitalSeries:string;


}
