import { User } from '@/models/user'

export class AuthResponse {
  declare token: string
  declare userInfo: User
  declare version: string
  declare versionCountry: string
}
