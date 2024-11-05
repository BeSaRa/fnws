import { Component, inject, OnInit } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { LocalService } from '@/services/local.service'
import { exhaustMap, filter, of, Subject, switchMap, takeUntil } from 'rxjs'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { SecureUser } from '@/models/secure-user'
import { UserService } from '@/services/user.service'
import { CustomValidators } from '@/validators/custom-validators'
import { OnDestroyMixin } from '@/mixins/on-destroy-mixin'
import { ToastService } from '@/services/toast.service'

@Component({
  selector: 'app-password-popup',
  standalone: true,
  imports: [MatButton, MatFormField, MatLabel, MatInput, ReactiveFormsModule],
  templateUrl: './password-popup.component.html',
  styleUrl: './password-popup.component.scss',
})
export class PasswordPopupComponent extends OnDestroyMixin(class {}) implements OnInit {
  dialogRef = inject(MatDialogRef)
  data = inject<{ model: SecureUser; type: 'ldapPassword' | 'password' }>(MAT_DIALOG_DATA)
  lang = inject(LocalService)
  fb = inject(FormBuilder)
  toast = inject(ToastService)
  save = new Subject<void>()

  private readonly userService = inject(UserService)
  form = this.fb.group(
    {
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: CustomValidators.confirmPasswordValidator }
  )

  ngOnInit(): void {
    this.listenToSave()
  }

  close(): void {
    this.dialogRef.close()
  }

  protected _beforeSave(): boolean {
    this.form.markAllAsTouched()
    return this.form.valid
  }

  protected _afterSave(): void {
    this.toast.success(this.lang.locals.password_changed_successfully)
    this.dialogRef.close()
  }

  private updatePassword() {
    const { model, type } = this.data
    const { password } = this.form.value
    return this.userService.updatePassword(model, password!, type)
  }

  private listenToSave() {
    this.save
      .pipe(takeUntil(this.destroy$))
      .pipe(
        switchMap(() => {
          return of(this._beforeSave())
        })
      )
      .pipe(filter(value => value))
      .pipe(
        exhaustMap(() => {
          return this.updatePassword()
        })
      )
      .subscribe(() => {
        this._afterSave()
      })
  }
}
