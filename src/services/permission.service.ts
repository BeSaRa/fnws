import { HttpClient, HttpParams } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { UrlService } from './url.service'
import { forkJoin, map, Observable } from 'rxjs'
import { Permission } from '@/models/permission'
import { CastResponse, CastResponseContainer } from 'cast-response'

@CastResponseContainer({
  $default: {
    model: () => Permission,
  },
})
@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private readonly http = inject(HttpClient)
  private readonly urlService = inject(UrlService)
  private readonly dialog = inject(MatDialog)

  constructor() {}

  @CastResponse()
  getAllPermissions(): Observable<Permission[]> {
    const url = `${this.urlService.URLS.TASKS}/lookups`
    return this.http.get<Permission[]>(url)
  }

  @CastResponse()
  getPermissionPerSecureUserId(secUserId: number): Observable<Permission[]> {
    const url = `${this.urlService.URLS.PERMISSONS}/secUserId`
    const param = new HttpParams().set('secUserId', secUserId)
    return this.http.get<Permission[]>(url, { params: param })
  }

  updateBulkPermissions(permissions: unknown[]) {
    const url = `${this.urlService.URLS.PERMISSONS}/bulk`
    return this.http.put(url, permissions)
  }

  @CastResponse()
  getPermissionsWithUserStatus(secUserId: number): Observable<Permission[]> {
    return forkJoin({
      allPermissions: this.getAllPermissions(),
      userPermissions: this.getPermissionPerSecureUserId(secUserId),
    }).pipe(
      map(({ allPermissions, userPermissions }) =>
        allPermissions.map(
          permission =>
            ({
              ...permission,
              fileSize: userPermissions[0]?.fileSize,
              assigned: userPermissions.some(el => el.taskId === permission.id),
            }) as Permission
        )
      )
    )
  }
}
