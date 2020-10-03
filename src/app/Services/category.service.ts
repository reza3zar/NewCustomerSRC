import {Injectable} from '@angular/core';
import {Category} from "../model/category";
  import {AppUrl} from "../app-url";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CategoryService {
  categories: Category[];
  public url = AppUrl;

  constructor(private http: HttpClient) {
  }

  getCategories() : Observable<any[]>{
    return this.http.get<any[]>(this.url.categories);
  }

  // getCategoriesByParentId(parentId: number) {
  //   let url = this.url.categories ;//+ '/?parentId=' + parentId;
  //   return this.http.get(url)
  //     .toPromise()
  //     .then(res => res.json().filter(c=>c.parentId==parentId));
  // }

  getCategoryById(categoryId: number) : Observable<any[]>{
    let url = this.url.categories + '/' + categoryId;
    return this.http.get<any[]>(url)
  }

}
