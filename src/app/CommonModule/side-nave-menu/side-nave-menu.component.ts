import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../model/category';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { LoginServiceService } from '../../services/login-service.service';

@Component({
  selector: 'app-side-nave-menu',
  templateUrl: './side-nave-menu.component.html',
  styleUrls: ['./side-nave-menu.component.css']
})
export class SideNaveMenuComponent implements OnInit,OnDestroy {
  constructor(private categoryService: CategoryService,private router: Router,private loginservice:LoginServiceService) {
  }


  setClickedRow (index :number) {
    this.selectedRow = index ;

  }


  ngOnDestroy(): void {
    if (this.categoryubscriber !== undefined) {
      this.categoryubscriber.unsubscribe();
    }
    if (this.loginSubscriber !== undefined) {
      this.loginSubscriber.unsubscribe();
    }


  }

  logOff(){
  // this.loginSubscriber=  this.loginservice.logOut().subscribe(rex=>{
  //   this.router.navigate(['login']);
  //   });
  }


  categories: Category[];
  selectedRow: number;

  ngOnInit() {
    this.getCategories();

  }
  categoryubscriber:Subscription;
  loginSubscriber:Subscription;

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

    public generateFake(count: number): Array<number> {
      const indexes = [];
      for (let i = 0; i < count; i++) {
        indexes.push(i);
      }
      return indexes;
    }

    onNavigate(cat:Category) {
      // this.router.navigate(['/categories', catId]);
      this.router.navigate(['/'+cat.path]);

    }

}
