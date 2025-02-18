import { fileUploadMsg } from './../../errors/error-message';
import { Router } from '@angular/router';
import { TransactionService } from './../../core/services/transaction.service';
import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Transaction } from '../../core/models/transaction.model';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
  imports: [SharedModule],
})
export class FileUploadComponent {
  transactionService$ = inject(TransactionService);
  progress: number = 0;
  errorMessage: string = null;
  nav = inject(Router);
  fileUploadMsg = fileUploadMsg;
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (!file) {
      this.errorMessage = fileUploadMsg.fileSelection;
      return;
    }
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      this.errorMessage = fileUploadMsg.fileType;
      return;
    }

    if (file.size === 0) {
      this.errorMessage = fileUploadMsg.emptyFile;
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const contents = reader.result as string;
        if (!contents.trim()) {
          this.errorMessage = fileUploadMsg.whiteSpace;
          return;
        }

        const lines = contents.split('\n');
        if (lines.length <= 1) {
          this.errorMessage = fileUploadMsg.noData;
          return;
        }
        this.simulateProcessing(contents);
      } catch (parseError) {
        this.errorMessage = fileUploadMsg.parsingError;
      }
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      this.errorMessage = fileUploadMsg.readingError;
    };
    this.errorMessage = null;
    reader.readAsText(file);
  }

  private async simulateProcessing(csv: string) {
    try {
      // ...
      const transactions = await this.transactionService$.parseCSV(csv);
      this.progress = 0;

      for (const transaction of transactions) {
        this.progress = Math.round(
          (transactions.indexOf(transaction) / transactions.length) * 100
        );
        try {
          await this.transactionService$.addTransaction(transaction); // Await each transaction
        } catch (error) {
          console.error('Error adding transaction:', error);
          this.errorMessage = 'Error adding transactions. Please try again.';
          return;
        }
      }
      this.errorMessage = '';
      this.nav.navigate(['/transactions']); // Navigate after all transactions are added
    } catch (parseError) {
      // ...
    }
  }

 
}
