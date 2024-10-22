import { Component, inject, OnInit } from '@angular/core'
import { LocalService } from '@/services/local.service'
import { MatIconButton } from '@angular/material/button'
import { NgOptimizedImage } from '@angular/common'
import { Router, RouterLink } from '@angular/router'
import { AppStore } from '@/stores/app.store'
import { MatTooltip } from '@angular/material/tooltip'
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu'
import { Subject, switchMap, takeUntil } from 'rxjs'
import { OnDestroyMixin } from '@/mixins/on-destroy-mixin'
import { AuthService } from '@/services/auth.service'
import { ignoreErrors } from '@/utils/utils'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [MatIconButton, NgOptimizedImage, RouterLink, MatTooltip, MatMenuTrigger, MatMenu, MatMenuItem],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.scss',
})
export class TopNavComponent extends OnDestroyMixin(class {}) implements OnInit {
  lang = inject(LocalService)
  store = inject(AppStore)
  router = inject(Router)
  logout$ = new Subject<void>()
  authService = inject(AuthService)
  snackbar = inject(MatSnackBar)

  ngOnInit(): void {
    this.logout$
      .pipe(switchMap(() => this.authService.logout().pipe(ignoreErrors())))
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.snackbar.open(this.lang.locals.logout_message)
        this.router.navigate(['/login']).then()
        this.store.logout()
      })
  }
}
