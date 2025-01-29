import { Component, computed, inject, input } from '@angular/core';
import { Task } from '../../utils/data.models';
import { CommonModule } from '@angular/common';
import { SpeedDial } from 'primeng/speeddial';
import { MenuItem, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-task',
  imports: [CommonModule, SpeedDial, ToastModule],
  providers: [MessageService],
  template: `
    <div
      class="flex flex-col gap-4 bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out"
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
          mask
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
    </div>
  `,
  styles: ``,
})
export class TaskComponent {
  task = input.required<Task>();
  filteredItems = computed(() =>
    this.items.filter((item) => item?.['for'].includes(this.task().status))
  );
  messageService = inject(MessageService);
  items: MenuItem[] = [
    {
      for: ['TODO', 'IN_PROGRESS'],
      label: 'Cancel Task',
      icon: 'pi pi-times',
      command: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Cancel',
          detail: 'Data Cancelled',
        });
      },
    },
    {
      for: ['IN_PROGRESS'],
      label: 'Complete Task',
      icon: 'pi pi-check-circle',
      command: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Complete',
          detail: 'Data Completed',
        });
      },
    },
    {
      for: ['TODO'],
      label: 'Start Task',
      icon: 'pi pi-play',
      command: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Start',
          detail: 'Data Started',
        });
      },
    },
    {
      for: ['TODO', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
      label: 'Delete Task',
      icon: 'pi pi-trash',
      command: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Delete',
          detail: 'Data Deleted',
        });
      },
    },
    {
      for: ['TODO', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
      label: 'Edit Task',
      icon: 'pi pi-pen-to-square',
      command: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Edit',
          detail: 'Data Edited',
        });
      },
    },
  ];
}
