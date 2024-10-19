import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { UrlService } from '@/services/url.service'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient)
  private readonly urlService = inject(UrlService)

  authenticate(credentials: { username: string; password: string }): Observable<unknown> {
    return this.http.post<unknown>(this.urlService.URLS.AUTH, credentials)
  }

  logout(): Observable<void> {
    return this.http.post<void>(this.urlService.URLS.LOGOUT, {})
  }
}
