import { OnDestroyMixin } from '@/mixins/on-destroy-mixin'
import { Task } from '@/models/task'
import { LocalService } from '@/services/local.service'
import { TaskService } from '@/services/task.service'
import { UserService } from '@/services/user.service'
import { FilterTaskType } from '@/types/task-filter-type.type'
import { AsyncPipe, DatePipe, NgTemplateOutlet } from '@angular/common'
import { Component, inject, OnInit, viewChild } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatIconButton } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { MatSort, MatSortModule } from '@angular/material/sort'
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
import { MatTooltip } from '@angular/material/tooltip'
import { combineLatest, map, startWith, switchMap, takeUntil, tap } from 'rxjs'

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
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
    MatSelectModule,
    ReactiveFormsModule,
    MatSortModule,
    NgTemplateOutlet,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent extends OnDestroyMixin(class {}) implements OnInit {
  displayedColumns: string[] = ['taskName', 'username', 'description', 'taskDate', 'exception', 'result']
  fitlerOptions: FilterTaskType[] = ['all_tasks', 'fail_tasks', 'success_tasks']

  taskFilterCtrl = new FormControl<FilterTaskType>('all_tasks', { nonNullable: true })
  taskNameFilterCtrl = new FormControl<number | null>(null)
  usernameFilterCtrl = new FormControl<string | null>(null)

  lang = inject(LocalService)
  service = inject(TaskService)
  userService = inject(UserService)

  dataSource = new MatTableDataSource<Task>([])

  sort = viewChild.required(MatSort)

  users$ = this.userService.load()
  tasks$ = this.service.lookupTask()

  ngOnInit(): void {
    this.dataSource.sort = this.sort()
    this.setupFilteredData()
  }

  setupFilteredData() {
    const tasks$ = this.taskFilterCtrl.valueChanges.pipe(
      startWith(this.taskFilterCtrl.value),
      switchMap(taskFilter => this.service.getAllTasks(taskFilter))
    )

    combineLatest([
      tasks$,
      this.taskNameFilterCtrl.valueChanges.pipe(startWith(this.taskNameFilterCtrl.value)),
      this.usernameFilterCtrl.valueChanges.pipe(startWith(this.usernameFilterCtrl.value)),
    ])
      .pipe(
        takeUntil(this.destroy$),
        map(([tasks, taskName, username]) =>
          tasks.filter(task => (!taskName || task.id === taskName) && (!username || task.userName === username))
        )
      )
      .pipe(
        tap(filteredTasks => {
          this.dataSource.data = filteredTasks
        })
      )
      .subscribe()
  }
}
