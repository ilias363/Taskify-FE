import { Component, input, output, signal } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { Task, TaskPage } from '../../utils/data.models';
import { CommonModule } from '@angular/common';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-tasks-grid',
  imports: [TaskComponent, CommonModule, PaginatorModule],
  //
  template: `
    <div class="grid grid-cols-3 gap-6 p-4">
      <ng-container *ngFor="let task of tasksPage().content">
        <app-task [task]="task"></app-task>
      </ng-container>
    </div>
    <p-paginator
      (onPageChange)="onPageChange.emit($event)"
      [first]="0"
      [rows]="tasksPage().size"
      [totalRecords]="tasksPage().totalElements"
      [showFirstLastIcon]="true"
      [showCurrentPageReport]="true"
      currentPageReportTemplate="{first} - {last} of {totalRecords}"
    ></p-paginator>
  `,
  styles: ``,
})
export class TasksGridComponent {
  tasksPage = input.required<TaskPage>();
  onPageChange = output<PaginatorState>();
}
