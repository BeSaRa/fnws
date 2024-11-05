export class Task {
  declare arName: string
  declare enName: string
  declare name: string
  declare id: number
  declare description: string
  declare updateOn: string
  declare taskId: number
  declare userName: string
  declare taskTime: number
  declare exception: string
  declare result: string
  declare taskDate: Date

  getNames(local: 'ar' | 'en'): string {
    return this[`${local}Name`]
  }
}
