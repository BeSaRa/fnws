import { afterNextRender, Component, inject } from '@angular/core'
import { particlesConfig } from '@/constants/particles-config'
import { LocalService } from '@/services/local.service'
import { AuthService } from '@/services/auth.service'
import { exhaustMap, map, Subject, tap } from 'rxjs'
import { AsyncPipe } from '@angular/common'
import { ignoreErrors } from '@/utils/utils'
import { Router } from '@angular/router'
import { FormsModule } from '@angular/forms'

declare global {
  // noinspection JSUnusedGlobalSymbols
  interface Window {
    particlesJS: (tagId: string, options: unknown) => void
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AsyncPipe, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  host: {
    class: 'flex-auto',
  },
})
export class LoginComponent {
  lang = inject(LocalService)
  auth = inject(AuthService)
  router = inject(Router)
  login$ = new Subject<void>()
  credentials = {
    username: '',
    password: '',
  }
  loginProcess$ = this.login$
    .pipe(exhaustMap(() => this.auth.authenticate(this.credentials).pipe(ignoreErrors())))
    .pipe(tap(() => this.router.navigate(['home']).then()))
    .pipe(map(() => ''))

  constructor() {
    afterNextRender(() => {
      window.particlesJS('particles-js', particlesConfig)
    })
  }
}
