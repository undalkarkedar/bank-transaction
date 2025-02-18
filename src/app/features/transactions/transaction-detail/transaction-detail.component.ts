import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../../core/services/transaction.service';
import { Transaction } from '../../../core/models/transaction.model';
import { CommonModule } from '@angular/common';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.scss',
  imports: [CommonModule],
})
export class TransactionDetailComponent implements OnInit, OnDestroy {
  transaction: Transaction | undefined;
  transactions: Transaction[];
  loading: boolean = false;
  error: string | null = null;
  isList: boolean = false;
  transactions$: Observable<Transaction[]> | null = null;
  route = inject(ActivatedRoute);
  transactionService$ = inject(TransactionService);
  nav = inject(Router);
  private routeSubscription: Subscription | undefined;
  private transactionSubscription: Subscription | undefined;
  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log(id)
      this.isList = id == 'id'; 
      this.loadTransactionDetails();
    });
  }
  private loadTransactionDetails(): void {
    this.loading = true;
    this.error = null;

    if (this.isList) {
      this.loadTransactionList();
    } else {
      const id = this.route.snapshot.paramMap.get('id'); // Use snapshot
      if (!this.isList) {
        this.loadSingleTransaction(id);
      } else {
        this.error = "Invalid transaction ID.";
        this.loading = false;
      }
    }
  }

  private loadSingleTransaction(id: string): void {
    this.transactionSubscription = this.transactionService$.transactions$
      .pipe(
        tap(() => (this.loading = true)),
        switchMap((transactions) => {
          const foundTransaction = transactions.find((t) => t.id === id);
          return foundTransaction ? of(foundTransaction) : of(null);
        }),
        catchError((error) => {
          console.error('Error fetching transaction:', error);
          this.error = 'Error loading transaction details.';
          this.loading = false;
          return of(null);
        }),
        tap((transaction) => {
          this.transaction = transaction;
          this.loading = false;
        })
      )
      .subscribe();
  }

  private loadTransactionList(): void {
    this.transactions$ = this.transactionService$.transactions$.pipe(
      tap(() => (this.loading = true)),
      catchError((error) => {
        console.error('Error fetching transactions:', error);
        this.error = 'Error loading transaction list.';
        this.loading = false;
        return of([]);
      }),
      tap(() => {
        this.loading = false;
      })
    );
  }

  goBack(): void {
    this.nav.navigateByUrl('/transactions');
  }

  editTransaction(item: Transaction) {
    this.nav.navigate(['/transactions', item.id, 'edit']);
  }

  trackById(index: number, item: Transaction): string {
    return item.id;
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.transactionSubscription) {
      this.transactionSubscription.unsubscribe();
    }
  }
}
