import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { Center } from '../budget.interface';
import { CenterService } from '../ucto.service';

@Component({
  selector: 'app-center-list',
  template: `
  <nav aria-label="You are here:" role="navigation">
    <ul class="breadcrumbs">
      <li><a [routerLink]="['/']">Home</a></li>
      <li>Střediska</li>
    </ul>
  </nav>
    <table>
      <thead>
        <tr>
          <th rowspan="2">Středisko</th>
          <th colspan="3" class="text-center">Příjmy</th>
          <th colspan="3" class="text-center">Výdaje</th>
        </tr>
        <tr>
          <th class="text-right">Skutečnost</th>
          <th class="text-right">Plán</th>
          <th class="text-right">%</th>
          <th class="text-right">Skutečnost</th>
          <th class="text-right">Plán</th>
          <th class="text-right">%</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let center of centers | async" [class.selected]="center == selectedCenter">
          <td><a [routerLink]="['/center', center.kod]" (click)="selectCenter(center)">{{center.nazev}}</a></td>
          <td class="text-right">{{center.prijem | number:"1.1-2" }}</td>
          <td class="text-right">{{center.prijem_plan | number:"1.1-2"}}</td>
          <td class="text-right">{{percent(center, 'prijem') | number:"1.1-1"}}</td>
          <td class="text-right">{{center.vydej | number:"1.1-2"}}</td>
          <td class="text-right">{{center.vydej_plan | number:"1.1-2"}}</td>
          <td class="text-right">{{percent(center, 'vydej') | number:"1.1-1"}}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Suma</th>
          <th class="text-right">{{sumIncomeReal | number:"1.1-2"}}</th>
          <th class="text-right">{{sumIncome | number:"1.1-2"}}</th>
          <th class="text-right">{{sumPercent('prijem') | number:"1.1-1"}}</th>
          <th class="text-right">{{sumOutcomeReal | number:"1.1-2"}}</th>
          <th class="text-right">{{sumOutcome | number:"1.1-2"}}</th>
          <th class="text-right">{{sumPercent('vydej') | number:"1.1-1"}}</th>
        </tr>
      </tfoot>
    </table>

  `,
  styles: ['.selected { background-color: lightgray; }']
})
export class CenterListComponent implements OnInit {
  centers: Observable<Center[]>;
  sumIncome: number;
  sumIncomeReal: number;
  sumOutcome: number;
  sumOutcomeReal: number;

  constructor(private centerService: CenterService) { }

  ngOnInit() {
    this.centers = this.centerService.getAll();
    this.centers.subscribe(
        items => {
          this.sumIncome = items.reduce((a, b) => a + b.prijem_plan, 0);
          this.sumIncomeReal = items.reduce((a, b) => a + b.prijem, 0);
          this.sumOutcome = items.reduce((a, b) => a + b.vydej_plan, 0);
          this.sumOutcomeReal = items.reduce((a, b) => a + b.vydej, 0);

        }
    );
  }

  percent(center: Center, typ: string): number {
    if(typ == 'prijem') {
      return center.prijem * 100 / center.prijem_plan;
    } else {
      return center.vydej * 100 / center.vydej_plan;
    }
  }

  sumPercent(typ: string): number {
    if(typ == 'prijem') {
      return this.sumIncomeReal * 100 / this.sumIncome;
    } else {
      return this.sumOutcomeReal * 100 / this.sumOutcome;
    }
  }
}
