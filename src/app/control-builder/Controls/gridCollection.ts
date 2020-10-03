import { GItem } from "./../Common/dataGridItem";
import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CustomControl } from "../Common/control";
import { GridDataResult, PageChangeEvent } from "@progress/kendo-angular-grid";

@Component({
  selector: "gridCollection",
  template: `
    <div class="container" style="display:flex;width:100%">
      <div class="row">
        <div class="col-md-12">
          <div class="panel panel-info">
            <div class="panel-heading">
              <h3 class="panel-title">{{ this.controlValues.label }}</h3>
            </div>
            <kendo-grid
              [data]="gridView"
              [pageSize]="pageSize"
              [skip]="skip"
              [pageable]="true"
              (pageChange)="pageChange($event)"
            >
              <kendo-grid-messages
                noRecords="رکوردی برای نمایش یافت نشد!"
                pagerItems="کل رکورد"
                pagerOf="از"
                sortAscending="صعودی"
                sortDescending="نزولی"
                filter="جستجو"
                columns="انتخاب سر ستون"
                columnsApply="اعمال"
                columnsReset="باز نشانی"
              >
              </kendo-grid-messages>
            </kendo-grid>
          </div>
        </div>
      </div>
    </div>
  `
})

// <div class="row col-md-12">
// <div class="alert alert-danger my-1 p-2 fadeInDown animated" *ngIf="!isValidContol && isDirtyContol && (controlValues.value?.length==0)">{{controlValues.label}} is required !!!</div>
// </div>

// <div class="row col-md-12">
// <div class="alert alert-danger my-1 p-2 fadeInDown animated" *ngIf="!isValidContol && isDirtyContol && (controlValues.value?.length<controlValues.minLengthValidation)">{{controlValues.label}} Min Lentgh is : {{controlValues.minLengthValidation}}!!!</div>
// </div>
export class GridCollectionComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() controlValues: CustomControl = {};

  public arrayHelper = [];
  public gridView: GridDataResult;
  public pageSize = 10;
  public skip = 0;
  private data: Object[];

  public items: any[] = new Array<GItem>();

  constructor() {}

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  private loadItems(): void {
    this.items = new Array<GItem>();
    this.items = this.controlValues.items;
    console.log(this.items)
    this.gridView = {
      data: this.items.slice(this.skip, this.skip + this.pageSize),
      total: this.items.length
    };
  }

  // get isDirtyContol() {
  //   return this.form.controls[this.controlValues.name].dirty;
  // }
  // get isValidContol() {
  //   return this.form.controls[this.controlValues.name].valid;
  // }

  ngOnInit() {
    this.loadItems();
  }
}
