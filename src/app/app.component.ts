import {Component, Inject} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {TodoListComponent} from "./components/todo-list/todo-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(@Inject(DOCUMENT) document: Document) {
    setTimeout(()=> {
      document.body.classList.add('welcome')
    })
  }
}
