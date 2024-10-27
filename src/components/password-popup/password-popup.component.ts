import { Component, inject, OnInit } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { LocalService } from '@/services/local.service'
import { of, Subject, switchMap } from 'rxjs'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { SecureUser } from '@/models/secure-user'

@Component({
  selector: 'app-password-popup',
  standalone: true,
  imports: [MatButton, MatFormField, MatLabel, MatInput, ReactiveFormsModule],
  templateUrl: './password-popup.component.html',
  styleUrl: './password-popup.component.scss',
})
export class PasswordPopupComponent implements OnInit {
  dialogRef = inject(MatDialogRef)
  data = inject<{ model: SecureUser; type: 'ldapPassword' | 'password' }>(MAT_DIALOG_DATA)
  lang = inject(LocalService)
  save = new Subject<void>()
  fb = inject(FormBuilder)
  form = this.fb.group({
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  })
  ngOnInit(): void {
    this.listenToSave()
  }

  close(): void {
    this.dialogRef.close()
  }

  private listenToSave() {
    this.save.pipe(switchMap(() => of(true))).subscribe(console.log)
  }
}
