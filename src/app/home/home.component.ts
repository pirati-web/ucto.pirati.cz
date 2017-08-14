import { Component, OnInit } from '@angular/core';
import { CenterListComponent } from '../center-list/center-list.component';

@Component({
  selector: 'app-home',
  template: `
  <nav aria-label="You are here:" role="navigation">
    <ul class="breadcrumbs">
      <li><a [routerLink]="['/']">Home</a></li>
    </ul>
  </nav>

  <h1>Rozpočet a účetnictví Pirátské strany</h1>

  <ul class="vertical menu">
    <li><a [routerLink]="['/partner']"><strong>Seznam dodavatelů</strong></a></li>
    <li><a [routerLink]="['/center']"><strong>Aktuální rozpočet</strong> a jeho plnění</a></li>
    <li><a href="https://wiki.pirati.cz/fo/seznam_uctu">Transparentní bankovní <strong>účty</strong></a></li>
    <li><a [routerLink]="['/about']">O aplikaci a <strong>otevřená data</strong></a></li>
    <li>
      <a href="https://wiki.pirati.cz/fo/start">Starší rozpočty</a>
      <ul class="nested vertical menu">
        <li *ngFor="let year of years">
          <a href="https://wiki.pirati.cz/fo/hospodareni{{year}}/start">{{year}}</a>
        </li>
      </ul>
    </li>
    <li><a href="https://dary.pirati.cz">Přispějte nám</a></li>
  </ul>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  years: number[];

  constructor() { }

  ngOnInit() {
    this.years = [2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009];
  }

}
