import { TransactionService } from './../../../core/services/transaction.service';
import { Component, inject, OnInit } from '@angular/core';
import { Transaction } from '../../../core/models/transaction.model';
import { AgGridModule } from 'ag-grid-angular';
import {
  _ColumnGroupModule,
  CellClickedEvent,
  CellValueChangedEvent,
  ClientSideRowModelModule,
  ColDef,
  DateFilterModule,
  GridOptions,
  Module,
  NumberEditorModule,
  NumberFilterModule,
  PaginationModule,
  RowClickedEvent,
  RowSelectionModule,
  TextEditorModule,
  TextFilterModule,
  ValidationModule,
  ValueGetterParams,
  ValueSetterParams,
} from 'ag-grid-community';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
@Component({
  selector: 'app-transaction-list',
  imports: [AgGridModule, SharedModule],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  transactionService$ = inject(TransactionService);
  nav = inject(Router);
  modules: Module[] = [
    ClientSideRowModelModule,
    ValidationModule,
    DateFilterModule,
    TextFilterModule,
    NumberFilterModule,
    TextEditorModule,
    NumberEditorModule,
    RowSelectionModule,
    PaginationModule,
    _ColumnGroupModule,
  ];
  gridOptions: GridOptions = {
    theme: 'legacy',
    onCellClicked: this.onCellClicked.bind(this),
    pagination: true,
    paginationAutoPageSize: true,
  };
  defaultColDef = {
    flex: 1,
    minWidth: 100,
  };
  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'Transaction ID', filter: true, sort: 'asc' },
    {
      field: 'date',
      headerName: 'Transaction Date',
      sort: 'asc',
      filter: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      sort: 'asc',
      filter: true,
      editable: true,
      cellDataType: 'text',
      valueGetter: (params: ValueGetterParams) => {
        return params.data.description;
      },
      valueSetter: (params: ValueSetterParams) => {
        const newVal = params.newValue;
        const valueChanged = params.data.description !== newVal;
        if (valueChanged) {
          params.data.description = newVal;
        }
        return valueChanged;
      },
    },
    {
      field: 'amount',
      headerName: 'Amount',
      sort: 'asc',
      filter: true,
      editable: true,
      cellDataType: 'number',
      valueGetter: (params: ValueGetterParams) => {
        return params.data.amount;
      },
      valueSetter: (params: ValueSetterParams) => {
        const newVal = params.newValue;
        const valueChanged = params.data.amount !== newVal;
        if (valueChanged) {
          params.data.amount = newVal;
        }
        return valueChanged;
      },
    },
    {
      field: 'type',
      headerName: 'Transaction Type',
      sort: 'asc',
      filter: true,
      editable: true,
      cellDataType: 'text',
      valueGetter: (params: ValueGetterParams) => {
        return params.data.type;
      },
      valueSetter: (params: ValueSetterParams) => {
        const newVal = params.newValue;
        const valueChanged = params.data.type !== newVal;
        if (valueChanged) {
          params.data.type = newVal;
        }
        return valueChanged;
      },
    },
    {
      field: 'accountNumber',
      headerName: 'Account Number',
      sort: 'asc',
      filter: true,
    },
    {
      field: 'delete',
      headerName: 'Actions',
      cellRenderer: (params) => {
        return `<button class="btn btn-danger" (click)="deleteRow(params)">Delete</button>`;
      },
      width: 100,
    },
  ];

  ngOnInit(): void {
    this.transactionService$.transactions$.subscribe(
      (data) => (this.transactions = data)
    );
  }

  deleteRow(id) {
    const transaction = id;
    console.log(transaction);
    if (confirm('Are you sure you want to delete this transaction? ')) {
      try {
        this.transactionService$.deleteTransaction(transaction);
      } catch (e) {
        console.error(e);
      }
    }
  }
  cellValueChanged(event: CellValueChangedEvent) {
    const updatedTransaction = { ...event.data };
    if (updatedTransaction.hasOwnProperty('b')) {
      delete updatedTransaction.b;
      this.transactionService$.updateTransaction(updatedTransaction);
    }
  }
  onCellClicked(event: CellClickedEvent) {
    const id = event?.data?.id;
    if (event?.colDef?.editable) {
      event.event.stopPropagation();
    } else if (event?.colDef?.field == 'delete') {
      this.deleteRow(id);
      event.event.stopPropagation();
    } else {
      this.nav.navigate([`/transactions/${id}`]);
    }
  }
}
