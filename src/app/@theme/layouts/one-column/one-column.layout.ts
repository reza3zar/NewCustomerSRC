import { style } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode style="background:#222b45 !important">
      <nb-layout-header fixed style="background:#222b45 !important">
        <ngx-header ></ngx-header>
      </nb-layout-header>

      <nb-sidebar right class="menu-sidebar myOrginalFont" tag="menu-sidebar" responsive style="background:#060f19">
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column style="padding: 10px 10px !important;background:#060f19">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

    
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent {}
