export class User {
  declare id: number
  declare arFullName: string
  declare loginName: string
  declare enFullName: string
  declare employeeNo: string
  declare domainName: string
  declare email: string
  declare mobile: number
  declare status: boolean
  declare updatedOn: Date | string

  getNames(lang: 'ar' | 'en'): string {
    return this[(lang + 'FullName') as 'arFullName']
  }
}
