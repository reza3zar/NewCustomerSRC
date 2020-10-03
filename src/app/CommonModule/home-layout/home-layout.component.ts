import { LoginServiceService } from './../../services/login-service.service';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationStart, Router} from "@angular/router";
import { Subscription } from 'rxjs';
import { InActiveBackgroundService } from '../../in-active-background.service';
import { Category } from '../../model/category';
import { CategoryService } from '../../services/category.service';
import { User } from '../../Models/User/User';
import { state, trigger, style } from '@angular/animations';
import { AnalyticsService } from '../../@core/utils';
import { NbLayoutDirectionService, NbThemeService, NbLayoutDirection, NbMenuItem } from '@nebular/theme';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { MENU_ITEMS } from '../../pages/pages-menu';
 

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0px)'

      })),
      state('out', style({
        transform: 'translateX(250px)'

      })),

    ]),
  ]
})
export class HomeLayoutComponent implements OnInit, OnDestroy{
  menu:NbMenuItem[];

  public mymenuState: string = 'in';
  showSideBarIcon = false;

  changeStateSideBar(val: boolean){
    this.showSideBarIcon = val;
    if(this.mymenuState==='in')
      this.mymenuState='out';
    else
    this.mymenuState='in'
  }
  ngOnInit(): void {

    this.menu = MENU_ITEMS;
    let menuHelper=[];
     let exchangeRoles=["ime_spot","ime_derivative","ict","sso","ime_legal"] ;
    

    let userTenant= this.localStorage.get('tenant') as string;
    let userRoles= this.localStorage.get('roles')  ;
    console.log(userRoles)
    

    this.menu.find(item=>{
      
        if(userTenant.toLowerCase()=="ict" || userTenant.toLowerCase()=="sso" || userTenant.toLowerCase()=="ime" )
          menuHelper.push(item);
        else{
          if(item.roles && !exchangeRoles.includes(userTenant) && item.roles.includes('broker')    ) 
          {
            menuHelper.push(item);
          }
    
         else if(item.roles && userRoles && exchangeRoles.includes(userTenant) &&item.roles.includes('exchange') && !userRoles.includes('legal')   ) {
          menuHelper.push(item);
         }

            else if(item.roles && exchangeRoles.includes(userTenant) && item.roles.includes('ime_legal') && userRoles.includes('legal')  ){
              menuHelper.push(item);
            }
        }

        return false;
    })  ;

    this.menu=[];
    this.menu=menuHelper;
    console.log(menuHelper)
    this.backGroundSubscriber= this.inActiveServ.change.subscribe(state=>
      {
        this.state=state;
      }
    );
 

    this.localSubscriber= this.loginService.getUserData().subscribe((user) => {
      this.user=user;
      });

      this.getCategories();
  }

  user:User=new User();
  localSubscriber: Subscription;
  routerSubscriber: Subscription;

  loading:boolean = false;
  progress: boolean = false;
  state:boolean=false;
  constructor(private router: Router,private inActiveServ:InActiveBackgroundService ,private loginService:LoginServiceService
    ,private categoryService: CategoryService,private analytics: AnalyticsService,
    private directionService: NbLayoutDirectionService,
    private themeService: NbThemeService,
    @Inject(LOCAL_STORAGE) private localStorage:WebStorageService) {



    let themeName= localStorage.get('themeName');
    if(themeName!=null && themeName!=undefined)
       this.themeService.changeTheme(themeName);

    this.directionService.setDirection(NbLayoutDirection.RTL);   
    
    
    
    {
    this.routerSubscriber=  router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.loading = true;
      }else if(event instanceof NavigationEnd) {
        this.loading = false;
      }});
  }

    }




  
  private isInActive=false;

  backGroundSubscriber:Subscription;

  ngOnDestroy(): void {
    if (this.backGroundSubscriber !== undefined) {
      this.backGroundSubscriber.unsubscribe();
    }

    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }

    if (this.routerSubscriber !== undefined) {
      this.routerSubscriber.unsubscribe();
    }

    if (this.categoryubscriber !== undefined) {
      this.categoryubscriber.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.progress = true;
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.progress = false;
      }
    }, e => (this.progress = false));
  }

  categories: Category[];

  categoryubscriber:Subscription;
  public menuIsLoad=false;

  getCategories() {
    var dataResult= this.categoryService.categories;
    if( dataResult!==undefined && dataResult.length>0)
    {
      this.categories = dataResult.filter(x=>x.parentId==0) ;
      this.menuIsLoad=true;
      return;
    }

    this.categoryubscriber=  this.categoryService.getCategories().subscribe(result => {
        this.categories = result.filter(x=>x.parentId==0);
        this.menuIsLoad=true;
        this.categoryService.categories=this.categories;
      });
    }


    onNavigate(cat:Category) {
      console.log(cat)
      this.router.navigate(['/'+cat.path]);

    }

}
