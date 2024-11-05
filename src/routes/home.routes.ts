import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users',
  },
  {
    path: 'users',
    loadComponent: () => import('@/views/users/users.component').then(m => m.UsersComponent),
  },
  {
    path: 'tasks',
    loadComponent: () => import('@/views/tasks/tasks.component').then(m => m.TasksComponent),
  },
]
