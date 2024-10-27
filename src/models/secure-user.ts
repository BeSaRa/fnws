export class SecureUser {
  declare id: number
  declare username: string
  declare appId: string
  declare updatedOn: string

  getAppNames() {
    return this.appId.split(',')
  }
}
