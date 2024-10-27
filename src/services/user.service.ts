import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { UrlService } from '@/services/url.service'
import { Observable } from 'rxjs'
import { CastResponse, CastResponseContainer } from 'cast-response'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { PermissionsPopupComponent } from '@/components/permissions-popup/permissions-popup.component'
import { PasswordPopupComponent } from '@/components/password-popup/password-popup.component'
import { SecureUser } from '@/models/secure-user'

@CastResponseContainer({
  $default: {
    model: () => SecureUser,
    unwrap: 'rs',
  },
})
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient)
  private readonly urlService = inject(UrlService)
  private readonly dialog = inject(MatDialog)

  @CastResponse()
  load(): Observable<SecureUser[]> {
    return this.http.get<SecureUser[]>(this.urlService.URLS.USERS)
  }

  openEditPermissions(model: SecureUser): MatDialogRef<PermissionsPopupComponent> {
    return this.dialog.open(PermissionsPopupComponent, { data: model })
  }

  openEditPassword(model: SecureUser, type: 'ldapPassword' | 'password'): MatDialogRef<PasswordPopupComponent> {
    return this.dialog.open(PasswordPopupComponent, {
      data: { model, type },
    })
  }
}