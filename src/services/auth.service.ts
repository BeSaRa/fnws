import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { UrlService } from '@/services/url.service'
import { Observable, tap } from 'rxjs'
import { TokenService } from '@/services/token.service'
import { CastResponse } from 'cast-response'
import { AuthResponse } from '@/models/auth-response'
import { User } from '@/models/user'
import { AppStore } from '@/stores/app.store'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient)
  private readonly urlService = inject(UrlService)
  private readonly tokenService = inject(TokenService)
  private readonly store = inject(AppStore)

  @CastResponse(() => AuthResponse, {
    shape: {
      userInfo: () => User,
    },
    unwrap: 'rs',
  })
  private _authenticate(credentials: { username: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.urlService.URLS.AUTH, credentials)
  }

  authenticate(credentials: { username: string; password: string }): Observable<AuthResponse> {
    return this._authenticate(credentials)
      .pipe(tap(res => this.tokenService.setToken(res.token)))
      .pipe(tap(() => this.store.updateAuthenticated(true)))
      .pipe(tap(res => this.store.updateUser(res.userInfo)))
  }

  @CastResponse(() => AuthResponse, {
    shape: {
      userInfo: () => User,
    },
    unwrap: 'rs',
  })
  private _validateToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.urlService.URLS.VALIDATE_TOKEN, {})
  }

  validateToken(): Observable<AuthResponse> {
    return this._validateToken()
      .pipe(tap(res => this.tokenService.setToken(res.token)))
      .pipe(tap(() => this.store.updateAuthenticated(true)))
      .pipe(tap(res => this.store.updateUser(res.userInfo)))
  }

  logout(): Observable<void> {
    return this.http.post<void>(this.urlService.URLS.LOGOUT, {})
  }
}
