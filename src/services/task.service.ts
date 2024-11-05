import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { UrlService } from './url.service'
import { Task } from '@/models/task'
import { forkJoin, iif, map, Observable } from 'rxjs'
import { CastResponse, CastResponseContainer } from 'cast-response'
import { FilterTaskType } from '@/types/task-filter-type.type'

@CastResponseContainer({
  $default: {
    model: () => Task,
  },
})
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly http = inject(HttpClient)
  private readonly urlService = inject(UrlService)
  constructor() {}

  @CastResponse()
  load(): Observable<Task[]> {
    const url = `${this.urlService.URLS.TASKS}`
    return this.http.get<Task[]>(url)
  }

  @CastResponse()
  lookupTask(): Observable<Task[]> {
    const url = `${this.urlService.URLS.TASKS}/lookups`
    return this.http.get<Task[]>(url)
  }

  @CastResponse()
  getAllTasks(taskType: FilterTaskType): Observable<Task[]> {
    return forkJoin({
      allTasks:
        taskType === 'all_tasks'
          ? this.load()
          : iif(() => taskType === 'success_tasks', this.getSuccessTasks(), this.getFailedTasks()),
      lookupTasks: this.lookupTask(),
    }).pipe(
      map(({ allTasks, lookupTasks }) => {
        const lookupMap = new Map(lookupTasks.map(task => [task.id, task]))

        return allTasks.map(task => {
          const lookup = lookupMap.get(task.taskId)
          return {
            ...task,
            arName: lookup?.arName || '-',
            enName: lookup?.enName || '-',
            name: lookup?.name || '-',
            taskDate: task.taskTime ? new Date(task.taskTime) : null,
          } as Task
        })
      })
    )
  }

  @CastResponse()
  getFailedTasks(): Observable<Task[]> {
    const url = `${this.urlService.URLS.TASKS}/all-fail`
    return this.http.get<Task[]>(url)
  }

  @CastResponse()
  getSuccessTasks(): Observable<Task[]> {
    const url = `${this.urlService.URLS.TASKS}/all-success`
    return this.http.get<Task[]>(url)
  }
}
