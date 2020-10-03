import { NotFoundComponent } from './CommonModule/not-found/not-found.component';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { AuthGuard } from './Services/auth-guard.service';
import { UnAuthorizedPageComponent } from './CommonModule/un-authorized-page/un-authorized-page.component';
 

const routes: Routes = [

  // {path:'login',
  // loadChildren:()=>import('./login/login.module') 
  // .then(m=>m.LoginModule)},


  {path:'exchange',
  loadChildren:()=>import('././exchange-module/exchange-module.module')
  .then(m=>m.ExchangeModuleModule), canActivate: [AuthGuard]},
  
  {path:'broker',
  loadChildren:()=>import('././brokerModule/broker.module')
  .then(m=>m.BrokerModule), canActivate: [AuthGuard]},

  // {
  //   path: 'pages',
  //   loadChildren: () => import('./pages/pages.module')
  //     .then(m => m.PagesModule),
  // },

  // {
  //   path: 'auth',
  //   component: NbAuthComponent,
  //   children: [
    
  //     {
  //       path: 'logout',
  //       component: NbLogoutComponent,
  //     },
  //     {
  //       path: 'request-password',
  //       component: NbRequestPasswordComponent,
  //     },
  //     {
  //       path: 'reset-password',
  //       component: NbResetPasswordComponent,
  //     },
  //   ],
  // },
  { path: '', redirectTo: 'broker', pathMatch: 'full' },
  { path: 'UnAutorized', component: UnAuthorizedPageComponent },
  { path: 'index.html', redirectTo: 'exchange', pathMatch: 'full' },


  { path: '**', component: NotFoundComponent },
];

const config: ExtraOptions = {
  // useHash: false,
  initialNavigation: false // <- turn off the initial redirect, used for redirect or hash routing strategy
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
