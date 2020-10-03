import { Router } from '@angular/router';
import { LoginManagerService } from './../../../Services/login-manager.service';
import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { LogoutInputModel } from '../../../Models/LogoutInputModel';
import { CookieService } from 'ngx-cookie-service';
import { InActiveBackgroundService } from '../../../in-active-background.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user={name:""};
  
  themes = [
    {
      value: 'default',
      name: 'لایت',
    },
    {
      value: 'dark',
      name: 'تیره',
    },
    {
      value: 'cosmic',
      name: 'کیهانی',
    },
   
    // {
    //   value: 'corporate',
    //   name: 'Corporate',
    // },
  ];

  currentTheme = 'cosmic';

  userMenu = [ { title: 'پروفایل', icon: 'people' }, { title: 'خروج', icon: 'log-out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              // private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              // private loginService:LoginManagerService,
              // private router:Router,
              private oauthService: OAuthService,
              @Inject(LOCAL_STORAGE) private storage: WebStorageService,
              private inActiveServ:InActiveBackgroundService) {
  }
  userName:string='';

  public state = false;
  backGroundSubscriber: Subscription;

  ngOnInit() {

 
    


    this.menuService.onItemClick().subscribe(( event ) => {
      this.onItemSelection(event.item.title);
    })

    this.backGroundSubscriber = this.inActiveServ.change.subscribe(myState => {
      this.state = myState;
    });


    this.currentTheme = this.themeService.currentTheme;
    let userName=this.storage.get('userInfo');
     
    
    if(userName==null ||userName==undefined)
      this.user.name='کاربر میهمان';
      else
    this.user.name=userName

    // this.userService.getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) =>
    //   {
    //     this.user = users.nick;
    //     this.user.name=this.userName
    //     console.log(this.user)
    //   }
    //    );

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

 

  logOut(){
    // let userInfo=this.storage.get('userInfo');
    this.oauthService.logOut();
    this.storage.remove('userInfo');
    this.storage.remove('tenant');
    this.storage.set("lastUrl","");
    this.user.name='کاربر میهمان';

    // this.oauthService.initImplicitFlow();

    // this.loginService.logOut(userInfo).subscribe(result=>{
    // this.cookieService.delete('userInfo');
    // this.storage.remove('userInfo');

    // this.router.navigate(['login']);
    // });

   }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.backGroundSubscriber !== undefined) {
      this.backGroundSubscriber.unsubscribe();
    }
  }

  changeTheme(themeName: string) {

    this.storage.set('themeName',themeName);
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  menuClick(event){
    console.log('reza')
    console.log(event)
  }

  onItemSelection( title ) {
    if ( title === 'خروج' ) {
        this.logOut();
      console.log('Log out Clicked ')
    } else if ( title === 'Profile' ) {
      // Do something on Profile
      console.log('Profile Clicked ')
    }
  }
}
