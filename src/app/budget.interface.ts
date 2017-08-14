export interface Center {
  kod: String;
  nazev: String;
  prijem: number;
  prijem_plan: number;
  vydej: number;
  vydej_plan: number;
}

export class BudgetItem {
  rok: number;
  kod: number;
  nazev: String;
  organ: String;
  rozpoctova_skladba: String;
  stredisko_kod: String;
  stredisko_nazev: String;
  typ: String;
  prijem: number;
  prijem_plan: number;
  vydej: number;
  vydej_plan: number;

  get limit(): number {
    if( this.prijem_plan == 0 ) {
      return this.vydej_plan;
    } else {
      return this.prijem_plan;
    }
  }
  get used(): number {
    if( this.prijem == 0 )
      return this.vydej
    else
      return this.prijem
  }
  get usedPercent(): number {
    return this.used * 100 / this.limit;
  }

  constructor(config: any) {
    this.rok = config.rok;
    this.kod = config.kod;
    this.nazev = config.nazev;
    this.organ = config.organ;
    this.rozpoctova_skladba = config.rozpoctova_skladba;
    this.stredisko_kod = config.stredisko_kod;
    this.stredisko_nazev = config.stredisko_nazev;
    this.typ = config.typ;
    this.prijem = config.prijem;
    this.prijem_plan = config.prijem_plan;
    this.vydej = config.vydej;
    this.vydej_plan = config.vydej_plan
  }
}

export interface ExpenditureItem {
  kod: string;
  ic: number;
  firma: string;
  budgetKod: number;
  nazev: string;
  castka: number;
  vystaveni: Date;
}

export class GroupedExpenditures {
  ic: number;
  sum: number;
  expenditures: ExpenditureItem[]

  get name(): string {
    if(this.expenditures.length) {
      return this.expenditures[0].firma;
    } else {
      return "";
    }
  }

  constructor(ic, expenditures) {
    this.ic = ic;
    this.expenditures = expenditures;
    this.sum = this.expenditures.reduce((a, b) => a + b.castka, 0);
  }
}
