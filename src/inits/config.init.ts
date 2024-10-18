import { APP_INITIALIZER, Provider } from '@angular/core'
import { ConfigService } from '@/services/config.service'
import { UrlService } from '@/services/url.service'
import { forkJoin, switchMap, tap } from 'rxjs'
import { LocalService } from '@/services/local.service'

export default {
  provide: APP_INITIALIZER,
  useFactory: (configService: ConfigService, urlService: UrlService, local: LocalService) => {
    return () =>
      forkJoin([configService.load()]).pipe(
        tap(() => urlService.setConfigService(configService)),
        tap(() => urlService.prepareUrls()),
        switchMap(() => local.load())
      )
  },
  deps: [ConfigService, UrlService, LocalService],
  multi: true,
} satisfies Provider
