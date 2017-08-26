import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ExpenditureService } from '../ucto.service';
import { ExpenditureItem, GroupedExpenditures } from '../budget.interface';

@Component({
  selector: 'app-partner',
  template: `
    <nav aria-label="You are here:" role="navigation">
      <ul class="breadcrumbs">
        <li><a routerLink="/">Home</a></li>
        <li [routerLink]="['/partner']">Partneři</li>
        <li>{{partner.name}}</li>
      </ul>
    </nav>
    <table>
      <thead>
        <th>Doklad</th>
        <th>Vystavení</th>
        <th>Rozpočet</th>
        <th>Předmět výdaje</th>
        <th>Částka</th>
      </thead>
      <tbody>
        <tr *ngIf="loading">
          <td><i class="fa fa-spinner fa-pulse fa-fw"></i></td>
          <td colspan="2">Stahují se aktuální data. Prosím vyčkejte.</td>
        </tr>
        <tr *ngFor="let expenditure of partner.expenditures">
          <td>{{expenditure.kod}}</td>
          <td>{{expenditure.vystaveni}}</td>
          <td><a [routerLink]="['/center', expenditure.stredisko, expenditure.budgetKod]">{{expenditure.budgetNazev}}</a></td>
          <td>{{expenditure.nazev}}</td>
          <td class="text-right">{{expenditure.castka | number:"1.1-1"}}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Položek: {{partner.expenditures.length}}</th>
          <th></th>
          <th></th>
          <th>Suma</th>
          <th class="text-right">{{partner.sum | number:"1.1-1"}}</th>
        </tr>
      </tfoot>
    </table>
  `,
  styles: []
})
export class PartnerComponent implements OnInit {

  partner: GroupedExpenditures;
  loading: boolean;

  constructor(private expenditureService: ExpenditureService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loading = true;
    this.partner = new GroupedExpenditures(0, []);
    this.route.params.subscribe(params => {
      let ic = Number.parseInt(params['ic']);
      this.partner = new GroupedExpenditures(ic, []);
      this.expenditureService.getByPartnerIc(ic).subscribe(
         items => {
           this.partner = new GroupedExpenditures(ic, items);
           this.loading = false;
         }
      );
    });
  }
}
