import { bootstrapApplication } from '@angular/platform-browser'
import { config } from '@/configs/app.config.server'
import { AppComponent } from '@/views/app/app.component'

const bootstrap = () => bootstrapApplication(AppComponent, config)

export default bootstrap
