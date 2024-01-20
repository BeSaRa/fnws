import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TodoListComponent } from './todo-list.component'
import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'

describe('TodoListComponent', () => {
  let component: TodoListComponent
  let fixture: ComponentFixture<TodoListComponent>
  let ele: DebugElement
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(TodoListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    ele = fixture.debugElement
  })

  it('should create todoList component', () => {
    expect(component).toBeTruthy()
  })

  it('should has ul element', () => {
    expect(ele.query(By.css('ul'))).toBeTruthy()
  })

  it('should find paragraph', () => {
    expect(ele.query(By.css('p'))).toBeTruthy()
  })

  it('should find welcome inside the paragraph', () => {
    expect(
      (ele.query(By.css('p')).nativeElement as HTMLElement).innerHTML,
    ).toContain('welcome')
  })
})
