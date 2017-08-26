import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { CenterService, BudgetService, ExpenditureService } from '../ucto.service';
import { ActivatedRoute } from '@angular/router';

import { BudgetItem, ExpenditureItem } from '../budget.interface';
import { Center } from '../budget.interface';

@Component({
  selector: 'app-expenditure',
  template: `
  <section *ngIf="center">
  <nav aria-label="You are here:" role="navigation">
    <ul class="breadcrumbs">
      <li><a [routerLink]="['/']">Home</a></li>
      <li><a routerLink="/center">Centra</a></li>
      <li *ngIf="center"><a [routerLink]="['/center', center.kod]">{{center.nazev}}</a></li>
      <li *ngIf="budgetItem">{{budgetItem.nazev}}</li>
    </ul>
  </nav>
      <table>
        <thead>
          <tr>
            <th (click)="sort('kod')">Kod <i class="fa fa-sort" aria-hidden="true"></i></th>
            <th (click)="sort('nazev')">Nazev <i class="fa fa-sort" aria-hidden="true"></i></th>
            <th (click)="sort('castka')" class="text-right">Částka <i class="fa fa-sort" aria-hidden="true"></i></th>
            <th (click)="sort('firma')">Odběratel <i class="fa fa-sort" aria-hidden="true"></i></th>
            <th (click)="sort('ic')" class="text-right">IČ <i class="fa fa-sort" aria-hidden="true"></i></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngIf="loading">
            <td><i class="fa fa-spinner fa-pulse fa-fw"></i></td>
            <td colspan="2">Stahují se aktuální data. Prosím vyčkejte.</td>
          </tr>
          <tr *ngFor="let expenditure of data | async">
            <td>{{expenditure.kod}}</td>
            <td>{{expenditure.nazev}}</td>
            <td class="text-right">{{expenditure.castka | number:"1.1-2"}}</td>
            <td><a [routerLink]="['/partner', expenditure.ic]">{{expenditure.firma}}</a></td>
            <td class="text-right"><a href="{{iclink}}{{expenditure.ic}}">{{expenditure.ic}}</a></td>
          </tr>
        </tbody>
        <tfoot>
          <tr *ngIf="budgetItem">
            <th><!--<span class="show-for-medium">Položek: </span>{{(data | async)?.length}}--></th>
            <th>Suma</th>
            <th class="text-right">{{budgetItem.used | number:"1.1-2"}}</th>
            <th>/  {{budgetItem.limit | number:"1.1-2"}} ({{budgetItem.usedPercent | number:"1.1-1"}} %)</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
      </section>
  `,
  styles: []
})
export class ExpenditureComponent implements OnInit {
  iclink = "https://or.justice.cz/ias/ui/rejstrik-$firma?ico=";
  center: Center;
  budgetItem: Observable<BudgetItem>;
  data: Observable<ExpenditureItem[]>
  loading: boolean;
  sort_col: string;

  constructor(private budgetService: BudgetService, private centerService: CenterService, private expenditureService: ExpenditureService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => {
      let kod = params['kod'];
      let item = Number.parseInt(params['item']);
      this.centerService.get(kod).subscribe(
        center => this.center = center,
        err => console.log(err)
      );
      this.budgetService.get(item).subscribe(
        budgets => {
          this.budgetItem = budgets[0];
          this.loading = false;
        },
        err => console.log(err)
      );
      this.data = this.expenditureService.getFor(item);
    });
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
      col = '-' + col;
    }
    this.sort_col = col;
    
    this.data = this.data.map(items => items.sort(this.dynamicSort(col)));
  }
}
