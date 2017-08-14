import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CenterListComponent } from './center-list/center-list.component';
import { ExpenditureComponent } from './expenditure/expenditure.component';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { BudgetComponent } from './budget/budget.component';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { PartnerComponent } from './partner/partner.component';
import { AboutComponent } from './about/about.component';

export const router: Routes = [
    { path: '', component: HomeComponent },
    { path: 'center', component: CenterListComponent },
    { path: 'center/:kod', component: BudgetComponent },
    { path: 'center/:kod/:item', component: ExpenditureComponent },
    { path: 'partner', component: PartnerListComponent },
    { path: 'partner/:ic', component: PartnerComponent },
    { path: 'about', component: AboutComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
