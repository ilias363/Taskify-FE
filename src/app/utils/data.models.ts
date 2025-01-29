export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  startDate: Date;
  deadline: Date;
  appUser: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface TaskPage {
  currentPage: number;
  size: number;
  totalElements: number;
  totalPages: number;
  content: Task[];
}

export interface TasksStats {
  all: number;
  todo: number;
  in_progress: number;
  completed: number;
  cancelled: number;
}