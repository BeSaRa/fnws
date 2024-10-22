import { ApplicationConfig } from '@angular/core'
import { provideRouter, withHashLocation } from '@angular/router'
import { routes } from '@/routes/app.routes'
import { provideInterceptors } from 'cast-response'
import { GeneralInterceptor } from '@/model-interceptors/general-interceptor'
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { tokenInterceptor } from '@/http-interceptors/token.interceptor'
import configInit from '../inits/config.init'
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar'

export const appConfig: ApplicationConfig = {
  providers: [
    configInit,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      },
    },
    provideHttpClient(withInterceptors([tokenInterceptor]), withFetch()),
    provideRouter(routes, withHashLocation()),
    // provideClientHydration(),
    provideInterceptors([GeneralInterceptor]),
    provideAnimationsAsync(),
  ],
}
