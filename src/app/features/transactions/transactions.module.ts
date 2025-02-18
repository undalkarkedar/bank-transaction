import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TransactionEditComponent } from './transaction-edit/transaction-edit.component';
import { authGuard } from '../../shared/guards/auth.guard';

const routes: Routes = [
  { path: '', component: TransactionListComponent, canActivate: [authGuard] }, // List view
  {
    path: ':id',
    component: TransactionDetailComponent,
    canActivate: [authGuard],
  }, // Detail view
  {
    path: ':id/edit',
    component: TransactionEditComponent,
    canActivate: [authGuard],
  }, // Edit view
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TransactionDetailComponent,
    TransactionEditComponent,
    TransactionListComponent,
  ],
})
export class TransactionsModule {}
