import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
  <nav aria-label="You are here:" role="navigation">
    <ul class="breadcrumbs">
      <li><a [routerLink]="['/']">Home</a></li>
      <li>about</li>
    </ul>
  </nav>

  <h1>Rozpočet a účetnictví Pirátské strany</h1>

  <div class="callout warning"><p>Beta verze! Aplikace je stále ve vývoji.</p></div>

  <p>Zdrojové kódy aplikace jsou na <a href="https://github.com/pirati-web/ucto.pirati.cz">Githubu</a></p>
  <p>Data pocházejí z <a href="https://pirati.alvarium.cz">https://pirati.alvarium.cz</a>, kde jsou přístupná jako JSON a CSV.</p>
  `,
  styles: []
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
