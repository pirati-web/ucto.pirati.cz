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
  templateUrl: 'expenditure.html',
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
