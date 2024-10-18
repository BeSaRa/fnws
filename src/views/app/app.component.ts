import { Component, HostListener, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { VersionComponent } from '@/components/version/version.component'
import { MatDialog } from '@angular/material/dialog'
import { LocalService } from '@/services/local.service'
import { LocalPopupComponent } from '@/components/local-popup/local-popup.component'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VersionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  lang = inject(LocalService)
  dialog = inject(MatDialog)
  title = inject(Title)

  @HostListener('window:keydown.Control.Alt.a', ['$event'])
  @HostListener('window:keydown.Control.Alt.ش', ['$event'])
  openLocalDialog($event: Event): void {
    $event.preventDefault()
    this.dialog.open(LocalPopupComponent, {
      direction: document.dir as 'rtl' | 'ltr',
    })
  }

  @HostListener('window:keydown.Control.Alt.l', ['$event'])
  toggleLanguage(): void {
    this.lang.toggleLanguage()
  }

  ngOnInit(): void {
    this.lang.langChange$.subscribe(() => {
      this.title.setTitle(this.lang.locals.title)
    })
  }
}
