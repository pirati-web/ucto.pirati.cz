import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';

import { routes } from './app.router';
import { CenterService, BudgetService, ExpenditureService } from './ucto.service';

import { AppComponent } from './app.component';
import { CenterListComponent } from './center-list/center-list.component';
import { ExpenditureComponent } from './expenditure/expenditure.component';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { BudgetComponent } from './budget/budget.component';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { PartnerComponent } from './partner/partner.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    CenterListComponent,
    ExpenditureComponent,
    BudgetListComponent,
    BudgetComponent,
    PartnerListComponent,
    PartnerComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routes
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "cz" },
    CenterService,
    BudgetService,
    ExpenditureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
