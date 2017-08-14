import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { CenterService, BudgetService, ExpenditureService } from './ucto.service';

import { routes } from './app.router';
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
    CenterService,
    BudgetService,
    ExpenditureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
