import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActivatedRoute } from '@angular/router';

import { Center, BudgetItem } from '../budget.interface';
import { CenterService, BudgetService } from '../ucto.service';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styles: []
})
export class BudgetListComponent implements OnInit {

  @Input()
  data: Observable<BudgetItem[]>
  filtredData: BudgetItem[];
  @Input()
  typ: string;
  @Input()
  centerId: string;

  sumUsed: number;
  sumLimit: number;
  sumPercent: number;

  constructor() {
    this.filtredData = [];
    this.sumLimit = 0;
    this.sumUsed = 0;
  }

  ngOnInit() {
    this.data.subscribe(
      items => {
        this.filtredData = items.filter(item => item.typ == this.typ);
        this.sumLimit = this.filtredData.reduce((a, b) => a + b.limit, 0);
        this.sumUsed = this.filtredData.reduce((a, b) => a + b.used, 0);
      }
    );
  }

  getPercent(): number {
    return this.sumUsed * 100 / this.sumLimit;
  }
}
