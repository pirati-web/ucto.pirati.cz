import { Component, Input, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { Center, BudgetItem } from '../budget.interface';
import { CenterService, BudgetService } from '../ucto.service';

import { BudgetListComponent } from '../budget-list/budget-list.component';

@Component({
  selector: 'app-budget',
  template: `
    <section *ngIf="center">
    <nav aria-label="You are here:" role="navigation">
      <ul class="breadcrumbs">
        <li><a [routerLink]="['/']">Home</a></li>
        <li><a [routerLink]="['/center']">Centra</a></li>
        <li *ngIf="center">{{center.nazev}}</li>
      </ul>
    </nav>
      <app-budget-list [data]="data" [typ]="income" [centerId]="center.kod"></app-budget-list>
      <app-budget-list [data]="data" [typ]="outcome" [centerId]="center.kod"></app-budget-list>
    </section>
  `,
  styles: []
})
export class BudgetComponent implements OnInit {

  income: string = "PŘÍJMY";
  outcome: string = "VÝDAJE";

  center: Center;
  data: Observable<BudgetItem[]>;

  constructor(private budgetService: BudgetService, private centerService: CenterService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let kod = params['kod'];
      this.centerService.get(kod).subscribe(
        center => this.center = center,
        err => console.log(err)
      );
      this.data = this.budgetService.getFor(kod);
    });
  }
}
