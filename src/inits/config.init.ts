import { APP_INITIALIZER, Provider } from '@angular/core'
import { ConfigService } from '@/services/config.service'
import { UrlService } from '@/services/url.service'
import { catchError, forkJoin, of, switchMap, tap } from 'rxjs'
import { LocalService } from '@/services/local.service'
import { TokenService } from '@/services/token.service'
import { AuthService } from '@/services/auth.service'

export default {
  provide: APP_INITIALIZER,
  useFactory: (
    configService: ConfigService,
    urlService: UrlService,
    local: LocalService,
    tokenService: TokenService,
    authService: AuthService
  ) => {
    return () =>
      forkJoin([configService.load()]).pipe(
        tap(() => urlService.setConfigService(configService)),
        tap(() => urlService.prepareUrls()),
        switchMap(() => {
          const token = tokenService.getTokenFromCookie()
          return token ? authService.validateToken().pipe(catchError(() => of(true))) : of(true)
        }),
        switchMap(() => local.load())
      )
  },
  deps: [ConfigService, UrlService, LocalService, TokenService, AuthService],
  multi: true,
} satisfies Provider
