import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AppStore } from '@/stores/app.store'
import { map, of } from 'rxjs'

export const authGuard: CanActivateFn = () => {
  const store = inject(AppStore)
  const router = inject(Router)
  // noinspection JSDeprecatedSymbols
  return of(true).pipe(map(() => (store.authenticated() ? true : router.parseUrl('login'))))
}
