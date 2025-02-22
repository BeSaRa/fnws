import { ToastComponent } from '@/components/toast/toast.component'
import { ComponentType } from '@angular/cdk/portal'
import { TemplateRef, EmbeddedViewRef } from '@angular/core'
import { MatSnackBarConfig, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar'

export interface ToastContract {
  open(msg: string, action?: string, config?: MatSnackBarConfig): MatSnackBarRef<TextOnlySnackBar>

  openFromComponent<Component, Data = unknown>(
    component: ComponentType<Component>,
    config: MatSnackBarConfig<Data>
  ): MatSnackBarRef<Component>

  openFromTemplate(template: TemplateRef<unknown>, config?: MatSnackBarConfig): MatSnackBarRef<EmbeddedViewRef<unknown>>

  error<Data = unknown>(message: Data, config?: Omit<MatSnackBarConfig, 'data'>): MatSnackBarRef<ToastComponent>

  warning<Data = unknown>(message: Data, config?: Omit<MatSnackBarConfig, 'data'>): MatSnackBarRef<ToastComponent>

  success<Data = unknown>(message: Data, config?: Omit<MatSnackBarConfig, 'data'>): MatSnackBarRef<ToastComponent>

  info<Data = unknown>(message: Data, config?: Omit<MatSnackBarConfig, 'data'>): MatSnackBarRef<ToastComponent>
}
