import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { TokenService } from '@/services/token.service'
import { ConfigService } from '@/services/config.service'

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService)
  const configService = inject(ConfigService)
  const request = req.clone({
    setHeaders: {
      ...(tokenService.hasToken() ? { [configService.CONFIG.TOKEN_HEADER_KEY]: tokenService.getToken() } : undefined),
    },
  })
  return next(request)
}
