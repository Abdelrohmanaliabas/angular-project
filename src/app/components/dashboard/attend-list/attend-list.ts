import { Component, OnInit } from '@angular/core';
import { GuestsService, GuestModel } from '../../../core/services/guests.service';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select'
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-attend-list',
  imports: [CommonModule,SelectModule ,DialogModule, FormsModule, ButtonModule,],
  templateUrl: './attend-list.html',
  styleUrl: './attend-list.css'
})
export class AttendList {
  attendees: GuestModel[] = [];
  loading = false;
  page = 1;
  limit = 5;
  total = 0;
  q = '';

  showDialog = false;
  selectedAttendant: GuestModel | null = null;
  newStatus = '';

  constructor(private guestsService: GuestsService) {}

  ngOnInit() {
    this.load();
  }

  load(page = this.page) {
    this.loading = true;
    this.guestsService.list(page, this.limit, this.q).subscribe({
      next: (res) => {
        this.attendees = res.data;
        this.total = res.total;
        this.page = page;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  onSearch(term: string) {
    this.q = term;
    this.page = 1;
    this.load(1);
  }

  confirmDelete(att: GuestModel) {
    if (!confirm(`Delete attendant "${att.name}"?`)) return;
    this.loading = true;
    this.guestsService.delete(att.id).subscribe({
      next: () => this.load(this.page),
      error: () => (this.loading = false),
    });
  }

  openEdit(att: GuestModel) {
    this.selectedAttendant = { ...att };
    this.newStatus = att.status;
    this.showDialog = true;
  }

  saveStatus() {
    if (!this.selectedAttendant) return;
    const updated = { ...this.selectedAttendant, status: this.newStatus };

    this.guestsService.update(updated.id, updated).subscribe({
      next: () => {
        this.showDialog = false;
        this.load(this.page);
      },
      error: (err) => console.error(err),
    });
  }

  closeDialog() {
    this.showDialog = false;
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.total / this.limit));
  }

  changePage(p: number) {
    if (p < 1 || p > this.totalPages) return;
    this.load(p);
  }

}
