import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { TasksStats } from '../../utils/data.models';

@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule, CommonModule, AddTaskDialogComponent],
  template: `
    <aside class="w-64 h-full p-4 bg-purple-500 font-medium">
      <div class="mb-4">
        <button
          class="flex items-center w-full px-4 py-2 bg-white text-purple-600 border border-purple-600 rounded-xl hover:bg-purple-100 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          (click)="showDialog()"
        >
          <mat-icon class="mr-3">add</mat-icon>
          <span class="text-lg font-semibold">Add New Task</span>
        </button>

        <app-add-task-dialog
          [visible]="visible"
          (onClose)="visible = false"
          (onCreateSuccess)="onTaskCreateSuccess.emit()"
        />
      </div>
      <ul class="space-y-2">
        <li>
          <button
            class="flex items-center w-full p-2 cursor-pointer text-white rounded-lg hover:bg-purple-600"
            [ngClass]="selectedFilter === 'all' ? 'bg-purple-600' : 'bg-none'"
            (click)="onFilterChange('all')"
          >
            <mat-icon>view_list</mat-icon>
            <span class="ms-3">All Tasks</span>
            <span
              class="inline-flex items-center justify-center w-3 h-3 p-3.5 ml-auto text-sm font-medium rounded-full bg-purple-900 text-purple-200"
              >{{ stats().all }}</span
            >
          </button>
        </li>
        <li>
          <button
            class="flex items-center w-full p-2 cursor-pointer text-white rounded-lg hover:bg-purple-600"
            [ngClass]="selectedFilter === 'todo' ? 'bg-purple-600' : 'bg-none'"
            (click)="onFilterChange('todo')"
          >
            <mat-icon>checklist</mat-icon>
            <span class="ms-3">Todo Tasks</span>
            <span
              class="inline-flex items-center justify-center w-3 h-3 p-3.5 ml-auto text-sm font-medium rounded-full bg-purple-900 text-purple-200"
              >{{ stats().todo }}</span
            >
          </button>
        </li>
        <li>
          <button
            class="flex items-center w-full p-2 cursor-pointer text-white rounded-lg hover:bg-purple-600"
            [ngClass]="
              selectedFilter === 'in_progress' ? 'bg-purple-600' : 'bg-none'
            "
            (click)="onFilterChange('in_progress')"
          >
            <mat-icon>hourglass_empty</mat-icon>
            <span class="ms-3">In Progress Tasks</span>
            <span
              class="inline-flex items-center justify-center w-3 h-3 p-3.5 ml-auto text-sm font-medium rounded-full bg-purple-900 text-purple-200"
              >{{ stats().in_progress }}</span
            >
          </button>
        </li>
        <li>
          <button
            class="flex items-center w-full p-2 cursor-pointer text-white rounded-lg hover:bg-purple-600"
            [ngClass]="
              selectedFilter === 'completed' ? 'bg-purple-600' : 'bg-none'
            "
            (click)="onFilterChange('completed')"
          >
            <mat-icon>done_all</mat-icon>
            <span class="ms-3">Completed Tasks</span>
            <span
              class="inline-flex items-center justify-center w-3 h-3 p-3.5 ml-auto text-sm font-medium rounded-full bg-purple-900 text-purple-200"
              >{{ stats().completed }}</span
            >
          </button>
        </li>
        <li>
          <button
            class="flex items-center w-full p-2 cursor-pointer text-white rounded-lg hover:bg-purple-600"
            [ngClass]="
              selectedFilter === 'cancelled' ? 'bg-purple-600' : 'bg-none'
            "
            (click)="onFilterChange('cancelled')"
          >
            <mat-icon>block</mat-icon>
            <span class="ms-3">Cancelled Tasks</span>
            <span
              class="inline-flex items-center justify-center w-3 h-3 p-3.5 ml-auto text-sm font-medium rounded-full bg-purple-900 text-purple-200"
              >{{ stats().cancelled }}</span
            >
          </button>
        </li>
      </ul>
    </aside>
  `,
  styles: ``,
})
export class SidebarComponent {
  onTaskCreateSuccess = output();
  stats = input.required<TasksStats>();
  filterChange = output<string>();

  selectedFilter: string = 'all';
  visible: boolean = false;

  onFilterChange(filter: string) {
    this.selectedFilter = filter;
    this.filterChange.emit(filter);
  }

  showDialog() {
    this.visible = true;
  }
}
