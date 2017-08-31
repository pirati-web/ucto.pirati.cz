import { Component, OnInit } from '@angular/core';
import { CenterService, BudgetService, ExpenditureService } from '../ucto.service';
import { Center, BudgetItem, ExpenditureItem, GroupedExpenditures } from '../budget.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: 'search.html',
  styles: []
})
export class SearchComponent implements OnInit {

  expenditures_all: ExpenditureItem[] = [];
  expenditures_all_ready = false;
  budgets_all: BudgetItem[] = [];
  budgets_all_ready = false;
  partner_all: GroupedExpenditures[] = [];
  res_expens: ExpenditureItem[] = [];       // results expenditures
  res_budgets: BudgetItem[] = [];           // results budgets items
  res_partner: GroupedExpenditures[] =[];   // results partner
  _query: string;
  get query(): string {
    return this._query;
  }
  set query(val: string) {
    this._query = val;
    this.search(val);
  }

  constructor(private budgetService: BudgetService, private expenditureService: ExpenditureService) { }

  ngOnInit() {
    this.budgetService.getAll().subscribe(
      items => this.budgets_all = items,
      err => console.log(err),
      () => this.budgets_all_ready = true
    )
    this.expenditureService.getAll().subscribe(
      items => {
        this.expenditures_all = items;
        this.partner_all = this.groupByPartner(items);
      },
      err => console.log(err),
      () => this.expenditures_all_ready = true
    )
  }

  search(val: string) {
    if(val.length < 3) { return; }
    let val2 = val.toLowerCase();
    this.res_expens = this.expenditures_all.filter(item => item.nazev.toLowerCase().indexOf(val2) != -1);
    this.res_budgets = this.budgets_all.filter(item => item.nazev.toLowerCase().indexOf(val2) != -1);
    this.res_partner = this.partner_all.filter(item => item.name.toLowerCase().indexOf(val2) != -1);
  }

  // Duplicit function!
  groupByPartner(data: ExpenditureItem[]): GroupedExpenditures[] {
     // our logic to group the posts by category
     if (!data) return;

     // find out all the unique categories
     const icos = new Set(data.map(x => x.ic).filter(x => !isNaN(x)));

     // produce a list of category with its posts
     const result = Array.from(icos).map(x => new GroupedExpenditures(
         x, data.filter(item => item.ic === x)
       ));

     return result;
 }
}
