import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TasksGridComponent } from '../../components/tasks-grid/tasks-grid.component';
import { TaskPage, TasksStats } from '../../utils/data.models';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    TasksGridComponent,
  ],
  template: `
    <div class="flex flex-col h-full">
      <app-header />
      <div class="flex flex-1 overflow-hidden">
        <app-sidebar
          [stats]="tasksStats"
          (filterChange)="onFilterChange($event)"
          (onTaskCreateSuccess)="
            fetchTasks(currentFilter, tasksPage().currentPage)
          "
        />
        <div class="flex-1 overflow-auto h-full bg-gray-100">
          <app-tasks-grid
            [tasksPage]="tasksPage()"
            (onPageChange)="onPageChange($event)"
            (onTaskDeleteSuccess)="
              fetchTasks(currentFilter, tasksPage().currentPage)
            "
          />
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class DashboardComponent {
  tasksService = inject(TasksService);
  dialog = inject(MatDialog);
  currentFilter = 'all';
  tasksPage = signal<TaskPage>({
    currentPage: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
    content: [],
  });
  tasksStats: TasksStats = {
    all: 0,
    todo: 0,
    in_progress: 0,
    completed: 0,
    cancelled: 0,
  };

  ngOnInit() {
    this.fetchTasksStats();
    this.fetchTasks('all', 0);
  }

  fetchTasks(statusFilter: string, page: number) {
    this.tasksService.getTasks(statusFilter, page).subscribe({
      next: (response) => {
        this.tasksPage.set(response.body?.data);
      },
      error: (err) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: err.error.message, errorType: 'Get Tasks' },
        });
      },
    });
  }

  fetchTasksStats() {
    this.tasksService.getStats().subscribe({
      next: (response) => {
        this.tasksStats = response.body?.data;
      },
      error: (err) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: err.error.message, errorType: 'Get Tasks Stats' },
        });
      },
    });
  }

  onFilterChange(filter: string) {
    if (filter !== this.currentFilter) {
      this.currentFilter = filter;
      this.fetchTasks(filter, 0);
    }
  }

  onPageChange(event: PaginatorState) {
    this.fetchTasks(this.currentFilter, event.page || 0);
  }
}
