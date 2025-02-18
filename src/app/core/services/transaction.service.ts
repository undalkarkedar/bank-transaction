import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactionsSubject = new BehaviorSubject<Transaction[]>(
    this.loadTransactions()
  );
  transactions$ = this.transactionsSubject.asObservable();

  constructor() {}

  private loadTransactions(): Transaction[] {
    return JSON.parse(localStorage.getItem('transactions') || '[]');
  }

  private saveTransactions(transactions: Transaction[]): void {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    this.transactionsSubject.next(transactions);
  }

  addTransaction(transaction: Transaction): void {
    const transactions = this.loadTransactions();
    transactions.push(transaction);
    this.saveTransactions(transactions);
  }

  updateTransaction(updatedTransaction: Transaction): void {
    let transactions = this.loadTransactions();
    transactions = transactions.map((t) =>
      t.id === updatedTransaction.id ? updatedTransaction : t
    );
    this.saveTransactions(transactions);
  }

  deleteTransaction(id: string): void {
    let transactions = this.loadTransactions().filter((t) => t.id !== id);
    this.saveTransactions(transactions);
  }

  parseCSV(csv: string): Transaction[] {
    return csv
      .split('\n')
      .slice(1)
      .map((line: any) => {
        const [id, date, description, amount, type, accountNumber] =
          line.split(',');
        return {
          id,
          date,
          description,
          amount: parseFloat(amount),
          type: type as 'Credit' | 'Debit',
          accountNumber,
        };
      });
  }
}
