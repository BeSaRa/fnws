import { inject, Injectable } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { ConfigService } from '@/services/config.service'

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  cookieService = inject(CookieService)
  config = inject(ConfigService)
  private token = ''

  setToken(token: string) {
    this.token = token
    this.cookieService.set(this.config.CONFIG.COOKIE_KEY, token, {
      expires: new Date().setHours(new Date().getHours() + 1),
    })
  }

  getToken() {
    return this.token
  }

  getTokenFromCookie(): string {
    this.token = this.cookieService.get(this.config.CONFIG.COOKIE_KEY)
    return this.token
  }

  hasToken(): boolean {
    return !!this.token
  }
}
