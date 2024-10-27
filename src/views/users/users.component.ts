import { Component, inject, OnInit } from '@angular/core'
import { UserService } from '@/services/user.service'
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table'
import { BehaviorSubject, exhaustMap, filter, map, Subject, switchMap, tap } from 'rxjs'
import { AsyncPipe } from '@angular/common'
import { LocalService } from '@/services/local.service'
import { MatIconButton } from '@angular/material/button'
import { MatTooltip } from '@angular/material/tooltip'
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu'
import { SecureUser } from '@/models/secure-user'

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    AsyncPipe,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatNoDataRow,
    MatRowDef,
    MatHeaderRowDef,
    MatIconButton,
    MatTooltip,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  editUser$ = new Subject<{ model: SecureUser; type: 'permissions' | 'password' | 'ldapPassword' }>()
  displayedColumns: string[] = ['applicationName', 'username', 'actions']
  lang = inject(LocalService)
  service = inject(UserService)
  dataSource = new MatTableDataSource<SecureUser>([])
  reload$ = new BehaviorSubject<void>(undefined)
  data$ = this.reload$
    .pipe(switchMap(() => this.service.load()))
    .pipe(tap(value => (this.dataSource.data = value)))
    .pipe(tap(value => console.log(value)))
    .pipe(map(() => ''))

  ngOnInit(): void {
    this.reload$.next()

    this.listenToEditUser()
  }

  private listenToEditUser() {
    const changePassword$ = this.editUser$.pipe(
      filter(value => value.type === 'password' || value.type === 'ldapPassword')
    )

    const changePermissions$ = this.editUser$
      .pipe(filter(value => value.type === 'permissions'))
      .pipe(map(({ model }) => model))

    changePermissions$.pipe(exhaustMap(model => this.service.openEditPermissions(model).afterClosed())).subscribe()
    changePassword$
      .pipe(
        exhaustMap(model =>
          this.service.openEditPassword(model.model, model.type as unknown as 'ldapPassword' | 'password').afterClosed()
        )
      )
      .subscribe()
  }
}
