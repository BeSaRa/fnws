import { Routes } from '@angular/router'
import { guestGuard } from '@/guards/guest.guard'
import { authGuard } from '@/guards/auth.guard'

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('@/views/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () => import('@/views/home/home.component').then(m => m.HomeComponent),
    loadChildren: () => import('@/routes/home.routes').then(m => m.routes),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
]
