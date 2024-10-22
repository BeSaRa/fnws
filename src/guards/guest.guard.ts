import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AppStore } from '@/stores/app.store'
import { of } from 'rxjs'

export const guestGuard: CanActivateFn = () => {
  const store = inject(AppStore)
  const router = inject(Router)
  // noinspection JSDeprecatedSymbols
  return store.authenticated() ? router.parseUrl('home') : of(true)
}
