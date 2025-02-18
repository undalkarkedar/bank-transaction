import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '', // Give the login route a specific path
    loadChildren: () =>
      import('./core/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    redirectTo: 'transactions',
    pathMatch: 'full',
  }, // Default route
  {
    path: 'upload',
    loadChildren: () =>
      import('./features/file-upload/file-upload.module').then(
        (m) => m.FileUploadModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'transactions',
    loadChildren: () =>
      import('./features/transactions/transactions.module').then(
        (m) => m.TransactionsModule
      ),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'transactions' }, // Fallback route
];
