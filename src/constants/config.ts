export const Config = {
  VERSION: 'v0.0.2',
  BASE_ENVIRONMENT: '',
  ENVIRONMENTS_URLS: {},
  BASE_URL: '',
  API_VERSION: '',
  EXTERNAL_PROTOCOLS: ['http', 'https'],
  TOKEN_HEADER_KEY: 'security.auth.header',
  COOKIE_KEY: '__COOKIE__',
}

export type ConfigType = typeof Config
