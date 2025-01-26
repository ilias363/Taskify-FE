import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  imports: [NgFor, NgIf, NgClass, DatePipe, HeaderComponent, SidebarComponent],
  template: `
    <div class="flex flex-col h-full">
      <app-header />
      <div class="flex flex-1 overflow-hidden">
        <app-sidebar />
        <main class="flex-1 overflow-y-auto p-4">
          <h1 class="text-2xl font-bold mb-4">Task Dashboard</h1>
          <div *ngIf="tasks().length; else noTasks">
            <table class="w-full border-collapse border border-gray-300">
              <thead class="bg-gray-100">
                <tr>
                  <th class="p-2 border border-gray-300">Title</th>
                  <th class="p-2 border border-gray-300">Description</th>
                  <th class="p-2 border border-gray-300">Status</th>
                  <th class="p-2 border border-gray-300">Deadline</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let task of tasks()">
                  <td class="p-2 border border-gray-300">{{ task.title }}</td>
                  <td class="p-2 border border-gray-300">
                    {{ task.description }}
                  </td>
                  <td
                    class="p-2 border border-gray-300 text-center"
                    [ngClass]="{
                      'text-yellow-500': task.status === 'TODO',
                      'text-blue-500': task.status === 'IN_PROGRESS',
                      'text-green-500': task.status === 'COMPLETED',
                      'text-red-500': task.status === 'CANCELLED'
                    }"
                  >
                    {{ task.status.replace('_', ' ') }}
                  </td>
                  <td class="p-2 border border-gray-300">
                    {{ task.deadline | date : 'short' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <ng-template #noTasks>
            <p class="text-gray-500 text-center">No tasks available!</p>
          </ng-template>
        </main>
      </div>
    </div>
  `,
  styles: `
  table {
    border-spacing: 0;
  }
  
  th, td {
    text-align: left;
  }
  
  th {
    font-weight: bold;
  }
  
  td {
    vertical-align: top;
  }
  `,
})
export class DashboardComponent {
  tasks = signal<any[]>([]);
  tasksService = inject(TasksService);
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe({
      next: (response) => {
        this.tasks.set(response.body?.data);
      },
      error: (err) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: err.error.message, errorType: 'Get Tasks' },
        });
      },
    });
  }
}
