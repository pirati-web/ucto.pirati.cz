import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/find';

import { environment } from '../environments/environment';
import { Center, BudgetItem, ExpenditureItem, GroupedExpenditures } from './budget.interface';

class MetaService {
  protected url: string;

  constructor(protected http : Http) {
    this.url = environment.apiUrl;
  }

  protected extractJson(response: Response) {
    return response.json();
  }

  protected handleError(error: Response | any) {
    console.log(error.message || error);
    return Observable.throw(error.message || error);
  }
}

@Injectable()
export class CenterService extends MetaService {

  private dataO: Observable<Center[]>;
  private data: Center[];

  constructor(protected http: Http) {
    super(http);
    this.dataO = this.http
      .get(`${this.url}/budgets/centers.json`)
      .map(this.extractJson)
      .map(items => items.map(item => this.extractCenter(item)))
      .catch(this.handleError.bind(this));
  }

  getAll(): Observable<Center[]> {
    return this.dataO;
  }

  get(kod: string): Observable<Center> {
    return this.dataO.map(centers => centers.filter(center => center.kod === kod)[0]);
  }

  private extractCenter(obj): Center {
    return <Center>({
      kod: obj.stredisko_kod,
      nazev: obj.stredisko_nazev,
      prijem: Number.parseInt(obj.prijem),
      prijem_plan: Number.parseInt(obj.prijem_plan),
      vydej: Number.parseInt(obj.vydej),
      vydej_plan: Number.parseInt(obj.vydej_plan)
    });
  }
}

@Injectable()
export class BudgetService extends MetaService {

  private data;

  constructor(protected http: Http) {
    super(http);
    this.data = this.http
      .get(`${this.url}/budgets/budget_items.json`)
      .map(this.extractJson)
      .map(items => items.map(item => this.extractBudgetItem(item)))
      .catch(this.handleError);
  }

  getAll(): Observable<BudgetItem[]> {
    return this.data;
  }

  getFor(center: string): Observable<BudgetItem[]> {
    return this.data.map(items => items.filter(item => item.stredisko_kod == center));
  }

  get(kod: number): Observable<BudgetItem> {
    return this.data.map(items => items.filter(item => item.kod == kod));
  }

  private extractBudgetItem(obj): BudgetItem {
    let config = {
      rok: Number.parseInt(obj.rok),
      kod: Number.parseInt(obj.kod),
      nazev: obj.nazev,
      organ: obj.organ,
      rozpoctova_skladba: obj.rozpoctova_skladba,
      stredisko_kod: obj.stredisko_kod,
      stredisko_nazev: obj.stredisko_nazev,
      typ: obj.typ,
      prijem: Number.parseInt(obj.prijem) || 0,
      prijem_plan: Number.parseInt(obj.prijem_plan) || 0,
      vydej: Number.parseInt(obj.vydej) || 0,
      vydej_plan: Number.parseInt(obj.vydej_plan) || 0
    };
    return new BudgetItem(config);
  }
}

@Injectable()
export class ExpenditureService extends MetaService {

  private data;

  constructor(protected http: Http) {
    super(http);
    this.data = this.http
      .get(`${this.url}/budgets.json`)
      .map(this.extractJson)
      .map(items => items.map(item => this.extractExpenditureItem(item)))
      .catch(this.handleError);
  }

    getAll(): Observable<ExpenditureItem[]> {
      return this.data;
    }

    getFor(kod: number) {
      return this.data.map(items => items.filter(item => item.budgetKod == kod));
    }

    getByCode(kod: number) {
      return this.data.map(items => items.filter(item => item.budgetKod == kod));
    }

    getByPartnerIc(ic: number): Observable<ExpenditureItem> {
      return this.data.map(items => items.filter(item => item.ic == ic));
    }

    private extractExpenditureItem(obj): ExpenditureItem {
      return <ExpenditureItem>({
        kod: obj.doklad_kod,
        ic: Number.parseInt(obj.doklad_ic),
        firma: obj.doklad_nazfirmy,
        budgetKod: Number.parseInt(obj.kod),
        budgetNazev: obj.nazev,
        stredisko: obj.stredisko_kod,
        nazev: obj.polozka_nazev,
        castka: Number.parseInt(obj.polozka_castka),
        vystaveni: new Date(obj.doklad_datvyst)
      });
    }
}
