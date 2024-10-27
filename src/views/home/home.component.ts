import { Component, ElementRef, OnInit, viewChild } from '@angular/core'
import { TopNavComponent } from '@/components/top-nav/top-nav.component'
import { RouterOutlet } from '@angular/router'
import PerfectScrollbar from 'perfect-scrollbar'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopNavComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  container = viewChild.required<ElementRef<HTMLDivElement>>('container')

  ngOnInit(): void {
    new PerfectScrollbar(this.container().nativeElement)
  }
}
