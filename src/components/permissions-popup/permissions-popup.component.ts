import { OnDestroyMixin } from '@/mixins/on-destroy-mixin'
import { Permission } from '@/models/permission'
import { SecureUser } from '@/models/secure-user'
import { LocalService } from '@/services/local.service'
import { PermissionService } from '@/services/permission.service'
import { ToastService } from '@/services/toast.service'
import { indicate } from '@/utils/utils'
import { AsyncPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, OnInit, viewChild } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatButton } from '@angular/material/button'
import { MatOptionModule } from '@angular/material/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInput } from '@angular/material/input'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatSelectModule } from '@angular/material/select'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import PerfectScrollbar from 'perfect-scrollbar'
import { BehaviorSubject, exhaustMap, of, Subject, switchMap, takeUntil, tap } from 'rxjs'

@Component({
  selector: 'app-permissions-popup',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatIconModule,
    AsyncPipe,
    MatOptionModule,
    MatSelectModule,
    MatProgressBarModule,
  ],
  templateUrl: './permissions-popup.component.html',
  styleUrl: './permissions-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionsPopupComponent extends OnDestroyMixin(class {}) implements OnInit {
  dialogRef = inject(MatDialogRef)
  data = inject<SecureUser>(MAT_DIALOG_DATA)
  permissionService = inject(PermissionService)
  lang = inject(LocalService)
  fb = inject(FormBuilder)
  permissionsForm!: FormGroup
  loading$ = new BehaviorSubject<boolean>(false)
  permissions$ = this.permissionService.getPermissionsWithUserStatus(this.data.id).pipe(
    indicate(this.loading$),
    tap(permissions => this.createPermissionsFormArray(permissions))
  )
  private fileSizeSubject = new BehaviorSubject<number>(0) // Track file size changes
  fileSizeOptions = Array.from({ length: 10 }, (_, k) => (k + 1) * 10)
  save = new Subject<void>()
  toast = inject(ToastService)
  permissionContainer = viewChild<ElementRef<HTMLDivElement>>('permissionContainer')

  permissionContainerEffect = effect(() => {
    if (this.permissionContainer()) {
      console.log('Hi')
      new PerfectScrollbar(this.permissionContainer()!.nativeElement)
    }
  })
  ngOnInit(): void {
    this.buildForm()
    this.onFileSizeChange()
    this.listenToSave()
  }

  buildForm() {
    this.permissionsForm = this.fb.group({
      fileSize: this.fb.control<number>(0),
      permissions: this.fb.array([]),
    })
  }

  onFileSizeChange() {
    this.permissionsForm.get('fileSize')?.valueChanges.subscribe(size => {
      this.fileSizeSubject.next(size)
    })
  }

  private createPermissionsFormArray(permissions: Permission[]): FormArray {
    const permissionsArray = this.fb.array(
      permissions.map(permission => {
        const permissionGroup = this.fb.group({
          fileSize: [0],
          secUserId: [this.data.id],
          taskId: [permission.id],
          updatedOn: [permission.updateOn],
          assigned: [permission.assigned || false],
        })

        // Subscribe to fileSizeSubject to update fileSize value for each permission
        this.fileSizeSubject.pipe(takeUntil(this.destroy$)).subscribe(size => {
          if (size !== null) permissionGroup.get('fileSize')?.setValue(size, { emitEvent: false })
        })

        return permissionGroup
      })
    )

    const fileSize = permissions.find(permission => permission.fileSize > 0)?.fileSize ?? 0

    if (fileSize) {
      this.permissionsForm.get('fileSize')?.setValue(fileSize)
    }
    this.permissionsForm.setControl('permissions', permissionsArray)
    return permissionsArray
  }
  get permissionsArray(): FormArray {
    return this.permissionsForm.get('permissions') as FormArray
  }

  protected _beforeSave() {
    const activePermissions = this.permissionsArray.controls
      .filter(control => control.get('assigned')?.value)
      .map(control => control.value)

    return activePermissions
  }

  protected _afterSave() {
    this.toast.success(this.lang.locals.permission_change_successfully)
    this.dialogRef.close()
  }
  close() {
    this.dialogRef.close()
  }

  private listenToSave() {
    this.save
      .pipe(takeUntil(this.destroy$))
      .pipe(
        switchMap(() => {
          return of(this._beforeSave())
        })
      )
      .pipe(
        exhaustMap(activePermissions => {
          return this.permissionService.updateBulkPermissions(activePermissions).pipe(indicate(this.loading$))
        })
      )
      .subscribe(() => {
        this._afterSave()
      })
  }
}
