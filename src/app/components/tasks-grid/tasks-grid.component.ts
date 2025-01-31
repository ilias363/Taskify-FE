import { Component, input, output, SimpleChanges } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { TaskPage } from '../../utils/data.models';
import { CommonModule } from '@angular/common';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-tasks-grid',
  imports: [TaskComponent, CommonModule, PaginatorModule],
  template: `
    <div class="h-full flex flex-col">
      <div
        *ngIf="tasksPage().totalElements === 0"
        class="flex justify-center items-center h-full"
      >
        <p class="text-3xl text-gray-600">
          No
          {{
            currentFilter() === 'all' ? '' : currentFilter().replace('_', ' ')
          }}
          tasks found
          {{ searchQuery() ? 'matching "' + searchQuery() + '"' : '' }}
        </p>
      </div>
      <div
        *ngIf="tasksPage().totalElements > 0"
        class="flex-grow grid grid-cols-3 gap-6 p-4"
      >
        <ng-container *ngFor="let task of tasksPage().content">
          <app-task
            [task]="task"
            (onTaskDeleteSuccess)="onTaskDeleteSuccess.emit()"
          ></app-task>
        </ng-container>
      </div>
      <p-paginator
        (onPageChange)="onPageChange.emit($event)"
        [first]="paginatorFirst"
        [rows]="tasksPage().size"
        [totalRecords]="tasksPage().totalElements"
        [showFirstLastIcon]="true"
        [showCurrentPageReport]="true"
        currentPageReportTemplate="{first} - {last} of {totalRecords}"
      ></p-paginator>
    </div>
  `,
  styles: `
    :host ::ng-deep {
      .p-paginator {
        background: transparent;
      }

      .p-paginator .p-paginator-current {
        min-width: 100px;
        color: black;
        font-weight: 600;
      }

      .p-paginator .p-paginator-pages .p-paginator-page {
        border-radius: 8px;
        transition: none;
        &.p-paginator-page-selected {
          background: var(--color-purple-600);
          color: white;
          font-weight: 600;
          &:hover {
            background: var(--color-purple-700);
          }
        }
        &:not(.p-paginator-page-selected) {
          background: transparent;
          color: black;
          &:hover {
            background: var(--color-gray-300);
          }
        }
      }

      .p-paginator .p-paginator-first,
      .p-paginator .p-paginator-prev,
      .p-paginator .p-paginator-next,
      .p-paginator .p-paginator-last {
        border-radius: 8px;
        color: black;
        &:hover {
          background: var(--color-gray-300);
        }
      }
    }
  `,
})
export class TasksGridComponent {
  tasksPage = input.required<TaskPage>();
  currentFilter = input.required<string>();
  searchQuery = input.required<string>();
  onPageChange = output<PaginatorState>();
  onTaskDeleteSuccess = output();
  paginatorFirst = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if ('tasksPage' in changes) {
      const currentPage = this.tasksPage().currentPage;
      const pageSize = this.tasksPage().size;
      this.paginatorFirst = currentPage * pageSize;
    }
  }
}
