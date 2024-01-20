import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideClientHydration } from '@angular/platform-browser'
import { routes } from '@/routes/app.routes'
import { provideInterceptors } from 'cast-response'
import { GeneralInterceptor } from '@/model-interceptors/general-interceptor'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideInterceptors([GeneralInterceptor]),
  ],
}
