import { User } from '@/models/user'
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'
import { inject } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { ConfigService } from '@/services/config.service'

export type AppStore = {
  user: User | null
  authenticated: boolean
}

const initialState: AppStore = {
  user: null,
  authenticated: false,
}
export const AppStore = signalStore(
  {
    providedIn: 'root',
    protectedState: true,
  },
  withState(initialState),
  withMethods(
    (store, cookieService: CookieService = inject(CookieService), config: ConfigService = inject(ConfigService)) => {
      return {
        updateAuthenticated(value: boolean) {
          patchState(store, { authenticated: value })
        },
        updateUser(value: User | null) {
          patchState(store, { user: value })
        },
        logout() {
          cookieService.delete(config.CONFIG.COOKIE_KEY)
          patchState(store, { authenticated: false, user: null })
        },
      }
    }
  )
)
