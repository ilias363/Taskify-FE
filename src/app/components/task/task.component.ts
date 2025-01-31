import { Component, computed, inject, input, output } from '@angular/core';
import { Task } from '../../utils/data.models';
import { CommonModule } from '@angular/common';
import { SpeedDial } from 'primeng/speeddial';
import { MenuItem, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TasksService } from '../../services/tasks.service';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';

@Component({
  selector: 'app-task',
  imports: [CommonModule, SpeedDial, ToastModule, EditTaskDialogComponent],
  providers: [MessageService],
  template: `
    <div
      class="flex flex-col gap-4 bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-all duration-300 ease-in-out"
    >
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold text-gray-800">
          {{ task().title }}
        </h3>
        <p-toast />
        <p-speeddial
          [model]="filteredItems()"
          [radius]="120"
          type="quarter-circle"
          direction="down-left"
          [style]="{ position: 'relative' }"
          [buttonProps]="{ severity: 'info', rounded: true }"
          [tooltipOptions]="{ tooltipPosition: 'left' }"
        />
      </div>

      <p class="text-sm text-gray-600 ">
        {{ task().description }}
      </p>

      <div
        class="px-3 py-1 text-sm font-medium rounded-full"
        [ngClass]="{
          'bg-blue-200 text-blue-700': task().status === 'TODO',
          'bg-yellow-200 text-yellow-700': task().status === 'IN_PROGRESS',
          'bg-green-200 text-green-700': task().status === 'COMPLETED',
          'bg-red-200 text-red-700': task().status === 'CANCELLED'
        }"
      >
        {{ task().status.replace('_', ' ') }}
      </div>

      <div class="text-sm text-gray-500">
        <div>
          <span class="font-medium text-gray-700">Start date:</span>
          {{ task().startDate | date : 'medium' }}
        </div>
        <div>
          <span class="font-medium text-gray-700">Deadline:</span>
          {{ task().deadline | date : 'medium' }}
        </div>
      </div>
      <app-edit-task-dialog
        [visible]="visible"
        [task]="task()"
        (onClose)="visible = false"
        (onEditSuccess)="onEditSuccess($event)"
      />
    </div>
  `,
  styles: `
    :host ::ng-deep {
      .p-speeddial .p-speeddial-button {
        background-color: var(--color-purple-400);
        color: black;
        border: none;
        &:hover {
          background-color: var(--color-purple-300);
          color: black;
          border: none;
        }
      }

      .p-speeddial .p-speeddial-action {
        background-color: var(--color-gray-800);
        color: white;
        border: none;
        &:hover {
          background-color: var(--color-gray-700);
          color: white;
        }
      }
    }
  `,
})
export class TaskComponent {
  taskService = inject(TasksService);
  messageService = inject(MessageService);

  task = input.required<Task>();
  onTaskDeleteSuccess = output();

  visible: boolean = false;

  items: MenuItem[] = [
    {
      for: ['TODO', 'IN_PROGRESS'],
      label: 'Cancel Task',
      icon: 'pi pi-times',
      command: () => {
        if (!['TODO', 'IN_PROGRESS'].includes(this.task().status)) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Task should be todo or in progress to be cancelled',
          });
        } else {
          this.taskService.cancelTask(this.task()).subscribe({
            error: (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: `Task could not be cancelled: ${error.error.message}`,
              });
            },
            complete: () => {
              this.task().status = 'CANCELLED';
              this.messageService.add({
                severity: 'success',
                summary: 'Task Cancelled',
                detail: 'Task has been cancelled successfully',
              });
            },
          });
        }
      },
    },
    {
      for: ['IN_PROGRESS'],
      label: 'Complete Task',
      icon: 'pi pi-check-circle',
      command: () => {
        if (!['IN_PROGRESS'].includes(this.task().status)) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Task should be in progress to be completed',
          });
        } else {
          this.taskService.completeTask(this.task()).subscribe({
            error: (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: `Task could not be completed: ${error.error.message}`,
              });
            },
            complete: () => {
              this.task().status = 'COMPLETED';
              this.messageService.add({
                severity: 'success',
                summary: 'Task Completed',
                detail: 'Task has been completed successfully',
              });
            },
          });
        }
      },
    },
    {
      for: ['TODO'],
      label: 'Start Task',
      icon: 'pi pi-play',
      command: () => {
        if (!['TODO'].includes(this.task().status)) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Task should be todo to be started',
          });
        } else {
          this.taskService.startTask(this.task()).subscribe({
            error: (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: `Task could not be started: ${error.error.message}`,
              });
            },
            complete: () => {
              this.task().status = 'IN_PROGRESS';
              this.messageService.add({
                severity: 'success',
                summary: 'Task Started',
                detail: 'Task has been started successfully',
              });
            },
          });
        }
      },
    },
    {
      for: ['TODO', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
      label: 'Delete Task',
      icon: 'pi pi-trash',
      command: () => {
        this.taskService.deleteTask(this.task().id).subscribe({
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Task could not be deleted: ${error.error.message}`,
            });
          },
          complete: () => {
            this.onTaskDeleteSuccess.emit();
            this.messageService.add({
              severity: 'success',
              summary: 'Task Deleted',
              detail: 'Task has been deleted successfully',
            });
          },
        });
      },
    },
    {
      for: ['TODO', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
      label: 'Edit Task',
      icon: 'pi pi-pen-to-square',
      command: () => {
        this.visible = true;
      },
    },
  ];

  filteredItems = computed(() =>
    this.items.filter((item) => item?.['for'].includes(this.task().status))
  );

  onEditSuccess(task: Task) {
    this.task().title = task.title;
    this.task().description = task.description;
    this.task().status = task.status;
    this.task().startDate = task.startDate;
    this.task().deadline = task.deadline;
    this.messageService.add({
      severity: 'success',
      summary: 'Task Updated',
      detail: 'Task has been updated successfully',
    });
  }
}
