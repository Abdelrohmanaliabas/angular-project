import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksService, TaskModel } from '../../../core/services/tasks.service';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { EventsService, EventModel } from '../../../core/services/events.service';
import { AuthService } from '../../../core/services/auth.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-tasks-list',
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ToastModule,
    ButtonModule,
    ProgressBarModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.css',
})
export class TasksList implements OnInit {
  tasks: TaskModel[] = [];
  events: EventModel[] = [];
  selectedEventId: number | null = null;
  showDialog = false;
  newTask: Partial<TaskModel> = {};
  loading = false;
  dialogMode = '';
  progress = 0;
  completedCount = 0;
  totalCount = 0;


  constructor(
    private tasksService: TasksService,
    private eventsService: EventsService,
    private auth: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    const user = this.auth.getUser();
    if (user) {
      this.eventsService.listByUser(user.id).subscribe({
        next: (events: EventModel[]) => (this.events = events),
        error: () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load your events.',
          }),
      });
    }
  }

  loadTasks() {
    if (!this.selectedEventId) return;
    this.loading = true;
    this.tasksService.list(this.selectedEventId).subscribe({
      next: (res) => {
        this.tasks = res;
        this.calculateProgress();
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  calculateProgress() {
    this.totalCount = this.tasks.length;
    this.completedCount = this.tasks.filter(t => t.status === 'Completed').length;
    this.progress = this.totalCount ? Math.round((this.completedCount / this.totalCount) * 100) : 0;
  }

  openCreateDialog() {
    if (!this.selectedEventId) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Select Event',
        detail: 'Please select an event before creating a task.',
      });
      return;
    }

    const eventExists = this.events.some(
      (ev) => ev.id === this.selectedEventId
    );
    if (!eventExists) {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid Event',
        detail: 'You cannot create a task for an unknown event.',
      });
      return;
    }

    this.newTask = {
      title: '',
      description: '',
      priority: 'Medium',
      status: 'Not Started',
      deadline: '',
    };
    this.dialogMode = 'create';
    this.showDialog = true;
  }

  openEditDialog(task: TaskModel) {
    this.newTask = { ...task };
    this.dialogMode = 'edit';
    this.showDialog = true;
  }

  saveTask() {
    if (!this.selectedEventId) {
      this.messageService.add({
        severity: 'warn',
        summary: 'No Event Selected',
        detail: 'Please select an event before adding a task.'
      });
      return;
    }

    const selectedEvent = this.events.find(ev => ev.id === this.selectedEventId);
    if (!selectedEvent) {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid Event',
        detail: 'The selected event does not exist.'
      });
      return;
    }

    if (this.newTask.deadline && new Date(this.newTask.deadline) > new Date(selectedEvent.endDate)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid Deadline',
        detail: `Task deadline cannot be after the event's end date (${selectedEvent.endDate}).`
      });
      return;
    }

    if (this.dialogMode === 'create') {
      this.tasksService.create({ ...this.newTask, eventId: this.selectedEventId }).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task created successfully!' });
          this.showDialog = false;
          this.loadTasks();
        },
        error: () =>
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create task!' })
      });
    } else {
      if (!this.newTask.id) return;
      this.tasksService.update(this.newTask.id, this.newTask).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task updated successfully!' });
          this.showDialog = false;
          this.loadTasks();
        },
        error: () =>
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update task!' })
      });
    }
  }


  deleteTask(task: TaskModel) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete the task "${task.title}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      rejectButtonStyleClass: 'p-button-text p-button-sm',
      acceptLabel: 'Yes, Delete',
      rejectLabel: 'Cancel',
      accept: () => {
        this.tasksService.delete(task.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted',
              detail: 'Task deleted successfully!'
            });
            this.loadTasks();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete task!'
            });
          }
        });
      }
    });
  }
}
