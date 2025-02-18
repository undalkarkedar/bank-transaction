import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Transaction } from '../../../core/models/transaction.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../../core/services/transaction.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrl: './transaction-edit.component.scss',
  imports: [SharedModule, ReactiveFormsModule, FormsModule],
})
export class TransactionEditComponent implements OnInit {
  transactionForm!: FormGroup;
  transaction: Transaction | null = null;
  loading: boolean = false;
  error: string | null = null;
  isEditing: boolean = false;

  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  transactionService$ = inject(TransactionService);
  nav = inject(Router);

  ngOnInit(): void {
    this.initializeForm();
    this.loadTransaction()
  }

  initializeForm(): void {
    this.transactionForm = this.fb.group({
      id: ['', Validators.required],
      description: ['', Validators.required],
      amount: [
        '',
        [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)],
      ], // Number validation
      date: [
        '',
        [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
      ], // Date format validation
      type: ['', Validators.required],
      accountNumber: ['', [Validators.required, this.accountNumberValidator]],
    });
  }

  accountNumberValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const accountNumber = control.value;
    if (!accountNumber) {
      return { required: true };
    }

    const allowedCharacters = /^[a-zA-Z0-9]+$/;
    if (!allowedCharacters.test(accountNumber)) {
      return { characters: true };
    }
    return null;
  }

  loadTransaction(): void {
    this.loading = true;
    this.error = null;

    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          console.log(id)
          if (id) {
            return this.transactionService$.transactions$.pipe(
              map(
                (transactions) => transactions.find((t) => t.id === id) || null
              )
            );
          } else {
            this.goBack();
            return of(null); // Return empty observable to stop further execution
          }
        }),
        tap((transaction) => {
          this.loading = false;
          if (transaction) {
            this.transaction = transaction;
            console.log(this.transaction);
            this.transactionForm.setValue(transaction);
          }
        }),
        catchError((error) => {
          this.loading = false;
          this.error = 'Error loading transaction.';
          console.error(error);
          return of(null);
        })
      )
      .subscribe();
  }
  goBack(): void {
    this.nav.navigateByUrl('/transaction');
  }
  onSubmit() {
    if (this.transaction && this.transactionForm.valid) {
      const updatedTransaction = {
        ...this.transaction,
        ...this.transactionForm.value,
      };
      this.transactionService$.updateTransaction(updatedTransaction);
      this.goBack();
    }
  }
}
