export class Permission {
  declare arName: string
  declare enName: string
  declare name: string
  declare id: number
  declare description: string
  declare updateOn: string
  declare assigned: boolean
  declare fileSize: number
  declare taskId: number

  getNames(local: 'ar' | 'en'): string {
    return this[`${local}Name`]
  }
}
