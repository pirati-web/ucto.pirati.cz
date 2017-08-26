import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ExpenditureService } from '../ucto.service';
import { ExpenditureItem, GroupedExpenditures } from '../budget.interface';

@Component({
  selector: 'app-partner-list',
  template: `
    <nav aria-label="You are here:" role="navigation">
      <ul class="breadcrumbs">
        <li><a routerLink="/">Home</a></li>
        <li>Partneři</li>
      </ul>
    </nav>
    <table>
      <thead>
        <tr>
          <th (click)="sort('name')">Název partnera <i class="fa fa-sort" aria-hidden="true"></i></th>
          <th class="text-right" (click)="sort('ic')" >IČ <i class="fa fa-sort" aria-hidden="true"></i></th>
          <th class="text-right" (click)="sort('sum')">Vyplaceno (Kč) <i class="fa fa-sort" aria-hidden="true"></i></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngIf="loading">
          <td colspan="3"><i class="fa fa-spinner fa-pulse fa-fw"></i>
          &nbsp; Stahují se aktuální data. Prosím vyčkejte.</td>
        </tr>
        <tr *ngFor="let g of grouped">
          <td><a [routerLink]="['/partner', g.ic]">{{g.name}}</a></td>
          <td class="text-right"><a href="https://or.justice.cz/ias/ui/rejstrik-$firma?ico={{g.ic}}">{{g.ic}}</a></td>
          <td class="text-right">{{g.sum | number:"1.1-1"}}</td>
        </tr>
      </tbody>
      <tfoot>
        <th>Položek: {{grouped.length}}</th>
        <th></th>
        <th></th>
      </tfoot>
    </table>
  `,
  styles: []
})
export class PartnerListComponent implements OnInit {
  expenditures: Observable<ExpenditureItem[]>;
  grouped: GroupedExpenditures[];
  loading: boolean;
  sort_col: string;

  constructor(private expenditureService: ExpenditureService) { }

  ngOnInit() {
    this.loading = true;
    this.grouped = [];
    this.expenditures = this.expenditureService.getAll()
    this.expenditures.subscribe(
      items => {
        this.grouped = this.groupByPartner(items);
      }
    )
  }

  dynamicSort(property: string) {
      let sortOrder = 1;
      if(property[0] === "-") {
          sortOrder = -1;
          property = property.substr(1);
      }
      return (a,b) => {
          let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
          return result * sortOrder;
      }
  }

  sort(col: string) {
    if(col == this.sort_col) {
      this.sort_col = col;
      col = '-' + col;
    } else {
      this.sort_col = col;
    }
    this.grouped.sort(this.dynamicSort(col))
  }

  groupByPartner(data: ExpenditureItem[]): GroupedExpenditures[] {
     // our logic to group the posts by category
     if (!data) return;

     // find out all the unique categories
     const icos = new Set(data.map(x => x.ic).filter(x => !isNaN(x)));

     // produce a list of category with its posts
     const result = Array.from(icos).map(x => new GroupedExpenditures(
         x, data.filter(item => item.ic === x)
       ));

     this.loading = false;

     return result;
 }
}
