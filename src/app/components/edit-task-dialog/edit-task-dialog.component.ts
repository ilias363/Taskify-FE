import { Component, inject, input, Input, output, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { FormFieldErrorComponent } from '../form-field-error/form-field-error.component';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { TasksService } from '../../services/tasks.service';
import { deadlineAfterStartDateValidator } from '../../utils/custom.form-validators';
import { Task } from '../../utils/data.models';

@Component({
  selector: 'app-edit-task-dialog',
  imports: [Dialog, ReactiveFormsModule, NgIf, FormFieldErrorComponent],
  template: `
    <p-dialog
      header="Edit Task"
      [modal]="true"
      [(visible)]="visible"
      (onHide)="onCancel()"
    >
      <form
        [formGroup]="editTaskForm"
        (ngSubmit)="onSubmit($event)"
        class="flex flex-col items-center w-md space-y-6"
      >
        <div class="w-full">
          <div class="flex items-center justify-between">
            <label for="title" class="text-sm font-medium text-gray-600"
              >Title</label
            >
            <app-form-field-error
              *ngIf="
                editTaskForm.controls?.['title']?.['touched'] &&
                editTaskForm.controls?.['title']?.['invalid'] &&
                editTaskForm.controls?.['title']?.['errors']?.['required']
              "
              message="Title is required"
            />
            <app-form-field-error
              *ngIf="
                editTaskForm.controls?.['title']?.['touched'] &&
                editTaskForm.controls?.['title']?.['invalid'] &&
                editTaskForm.controls?.['title']?.['errors']?.['maxlength']
              "
              message="Title must be at most 50 characters long"
            />
          </div>
          <input
            id="title"
            name="title"
            formControlName="title"
            placeholder="Enter Task Title"
            class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple-400 focus:outline-hidden"
          />
        </div>

        <div class="w-full">
          <div class="flex items-center justify-between">
            <label for="description" class="text-sm font-medium text-gray-600"
              >Description</label
            >
            <app-form-field-error
              *ngIf="
                editTaskForm.controls?.['description']?.['touched'] &&
                editTaskForm.controls?.['description']?.['invalid'] &&
                editTaskForm.controls?.['description']?.['errors']?.['required']
              "
              message="Description is required"
            />
            <app-form-field-error
              *ngIf="
                editTaskForm.controls?.['description']?.['touched'] &&
                editTaskForm.controls?.['description']?.['invalid'] &&
                editTaskForm.controls?.['description']?.['errors']?.['maxlength']
              "
              message="Description must be at most 1000 characters long"
            />
          </div>
          <textarea
            id="description"
            name="description"
            formControlName="description"
            placeholder="Enter Task description"
            class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple-400 focus:outline-hidden"
          ></textarea>
        </div>

        <div class="w-full">
          <div class="flex items-center justify-between">
            <label for="status" class="text-sm font-medium text-gray-600"
              >Status</label
            >
            <app-form-field-error
              *ngIf="
                editTaskForm.controls?.['status']?.['touched'] &&
                editTaskForm.controls?.['status']?.['invalid'] &&
                editTaskForm.controls?.['status']?.['errors']?.['required']
              "
              message="Status is required"
            />
          </div>
          <select
            id="status"
            name="status"
            formControlName="status"
            class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple-400 focus:outline-hidden"
          >
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>

        <div class="w-full">
          <div class="flex items-center justify-between">
            <label for="startDate" class="text-sm font-medium text-gray-600"
              >Start date and time</label
            >
            <app-form-field-error
              *ngIf="
                editTaskForm.controls?.['startDate']?.['touched'] &&
                editTaskForm.controls?.['startDate']?.['invalid'] &&
                editTaskForm.controls?.['startDate']?.['errors']?.['required']
              "
              message="Start date and time are required"
            />
          </div>
          <input
            id="startDate"
            name="startDate"
            type="datetime-local"
            formControlName="startDate"
            class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple-400 focus:outline-hidden"
          />
        </div>

        <div class="w-full">
          <div class="flex items-center justify-between">
            <label for="deadline" class="text-sm font-medium text-gray-600"
              >Deadline</label
            >
            <app-form-field-error
              *ngIf="
                editTaskForm.controls?.['deadline']?.['touched'] &&
                editTaskForm.controls?.['deadline']?.['invalid'] &&
                editTaskForm.controls?.['deadline']?.['errors']?.['required']
              "
              message="Deadline is required"
            />
            <app-form-field-error
              *ngIf="
                editTaskForm.controls?.['deadline']?.['invalid'] &&
                editTaskForm.controls?.['deadline']?.['errors']?.['deadlineAfterStartDate']
              "
              message="Deadline must be after start date"
            />
          </div>
          <input
            id="deadline"
            name="deadline"
            type="datetime-local"
            formControlName="deadline"
            class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple-400 focus:outline-hidden"
          />
        </div>

        <div class="flex items-center justify-between w-full space-x-4">
          <button
            (click)="onCancel()"
            [disabled]="isLoading()"
            class="flex items-center justify-center gap-x-4 w-full py-2 cursor-pointer disabled:cursor-not-allowed bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 focus:outline-hidden focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            [disabled]="editTaskForm.invalid || isLoading()"
            class="flex items-center justify-center gap-x-4 w-full py-2 cursor-pointer disabled:cursor-not-allowed bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 focus:outline-hidden focus:ring-2 focus:ring-purple-400"
          >
            Update Task
            <div
              *ngIf="isLoading()"
              class="border-white/50 h-6 w-6 animate-spin rounded-full border-4 border-t-black/50"
            ></div>
          </button>
        </div>
      </form>
    </p-dialog>
  `,
  styles: ``,
})
export class EditTaskDialogComponent {
  @Input() visible!: boolean;
  task = input.required<Task>();
  onClose = output();
  onEditSuccess = output<Task>();

  private formBuilder = inject(FormBuilder);
  private tasksService = inject(TasksService);
  private dialog = inject(MatDialog);

  isLoading = signal(false);

  editTaskForm: FormGroup = this.formBuilder.group(
    {
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      status: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
    },
    { validators: deadlineAfterStartDateValidator }
  );

  ngOnInit(): void {
    this.editTaskForm.patchValue({
      title: this.task().title,
      description: this.task().description,
      status: this.task().status,
      startDate: this.task().startDate.substring(0, 16),
      deadline: this.task().deadline.substring(0, 16),
    });
  }

  onCancel() {
    this.visible = false;
    this.editTaskForm.reset({
      title: this.task().title,
      description: this.task().description,
      status: this.task().status,
      startDate: this.task().startDate.substring(0, 16),
      deadline: this.task().deadline.substring(0, 16),
    });
    this.onClose.emit();
  }

  onSubmit(e: Event) {
    e.preventDefault();
    if (this.editTaskForm.valid) {
      this.isLoading.set(true);

      const updatedTask: Task = {
        ...this.task(),
        ...this.editTaskForm.value,
      };

      this.tasksService.updateTask(updatedTask).subscribe({
        error: (error: HttpErrorResponse) => {
          this.isLoading.set(false);
          this.onCancel();
          this.dialog.open(ErrorDialogComponent, {
            data: {
              message: error.error.message,
              errorType: 'Task Edit',
            },
          });
        },
        complete: () => {
          this.isLoading.set(false);
          this.onCancel();
          this.onEditSuccess.emit(updatedTask);
        },
      });
    }
  }
}
