import {Component, Inject, inject} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {HttpClient, HttpClientModule} from "@angular/common/http";


@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  todos: { id: number }[] = []

  httpClient = inject(HttpClient)

  constructor(@Inject(DOCUMENT) document: Document) {

    console.log(document.URL);
  }
}
