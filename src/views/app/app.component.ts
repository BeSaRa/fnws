import { Component, HostListener, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { VersionComponent } from '@/components/version/version.component'
import { MatDialog } from '@angular/material/dialog'
import { LocalService } from '@/services/local.service'
import { LocalPopupComponent } from '@/components/local-popup/local-popup.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VersionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  lang = inject(LocalService)
  dialog = inject(MatDialog)

  @HostListener('window:keydown.Control.Alt.a', ['$event'])
  @HostListener('window:keydown.Control.Alt.ش', ['$event'])
  openLocalDialog($event: Event): void {
    $event.preventDefault()
    const ref = this.dialog.open(LocalPopupComponent, {
      direction: document.dir as 'rtl' | 'ltr',
    })

    console.log(ref)
  }

  @HostListener('window:keydown.Control.Alt.l', ['$event'])
  toggleLanguage(): void {
    this.lang.toggleLanguage()
  }
}
