import { afterNextRender, Component } from '@angular/core'
import { particlesConfig } from '@/constants/particles-config'

declare global {
  interface Window {
    particlesJS: (tagId: string, options: unknown) => void
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  host: {
    class: 'flex-auto',
  },
})
export class LoginComponent {
  constructor() {
    afterNextRender(() => {
      window.particlesJS('particles-js', particlesConfig)
    })
  }
}
