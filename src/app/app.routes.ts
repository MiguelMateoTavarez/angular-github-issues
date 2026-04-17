import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'issues',
    loadComponent: () => import('./modules/issues/pages/issues-list-page')
  },
  {
    path: 'issue/:id',
    loadComponent: () => import('./modules/issues/pages/issue-page')
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'issues'
  }
];
