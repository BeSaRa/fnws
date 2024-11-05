export const EndPoints = {
  BASE_URL: '',
  EXAMPLES: '/examples',
  LOCALS: 'http://localhost:3333',
  AUTH: 'auth/login',
  LOGOUT: 'auth/logout',
  VALIDATE_TOKEN: 'auth/validate-token',
  USERS: 'secure-user',
  PERMISSONS: 'permissions',
  TASKS: 'tasks',
}

export type EndpointsType = typeof EndPoints
