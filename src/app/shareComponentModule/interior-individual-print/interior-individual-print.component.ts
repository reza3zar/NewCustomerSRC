import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { aggregateBy } from '@progress/kendo-data-query';
@Component({
  selector: 'ngx-interior-individual-print',
  templateUrl: './interior-individual-print.component.html',
  styleUrls: ['./interior-individual-print.component.scss'],
})
export class InteriorIndividualPrintComponent implements OnInit {
  // encapsulation: ViewEncapsulation.ShadowDom

  constructor() { }
  public data: InvoiceRow[] = invoiceData;

  ngOnInit() {
  }
 

  private aggregates: any[] = [{
    field: 'qty', aggregate: 'sum'
  }, {
    field: 'total', aggregate: 'sum'
  }];

  public get totals(): any {
    return aggregateBy(this.data, this.aggregates) || {};
  }
}
export class InvoiceRow {
  public get total(): number {
    return this.unitPrice * this.qty;
  }

  constructor(
    public productName: string,
    public unitPrice: number,
    public qty: number
  ) {}

 



}

 

export const invoiceData = [
  new InvoiceRow('رضا یونسیم', 21, 5),
  new InvoiceRow('ALICE MUTTON', 39, 7),
  new InvoiceRow('GENEN SHOUYU', 15.50, 3),
  new InvoiceRow('CHARTREUSE VERTE', 18, 1),
  new InvoiceRow('MASCARPONE FABIOLI', 32, 2),
  new InvoiceRow('VALKOINEN SUKLAA', 16.25, 3)
];