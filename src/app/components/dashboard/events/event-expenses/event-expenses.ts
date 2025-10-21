import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

interface Expense {
  id: number;
  eventId: number;
  name: string;
  amount: number;
  category: string;
  date: string;
  notes?: string;
}

interface EventItem {
  id: number;
  name: string;
}

@Component({
  selector: 'app-event-expenses',
  templateUrl: './event-expenses.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./event-expenses.css']
})
export class EventExpenses implements OnInit {
  expenses: Expense[] = [];
  filteredExpenses: Expense[] = [];
  events: EventItem[] = [];
  selectedEventId: number | null = null;

  total = 0;
  searchTerm = '';
  newExpense: Partial<Expense> = {};
  categories = ['Venue', 'Decoration', 'Food', 'Music', 'Transport', 'Miscellaneous'];
  jsonUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.http.get<Expense[]>(`${this.jsonUrl}/expenses`).subscribe(expenses => {
      this.expenses = expenses;
      this.filterExpenses();
    });

    this.http.get<EventItem[]>(`${this.jsonUrl}/events`).subscribe(events => {
      this.events = events;
    });
  }

  filterExpenses() {
    let filtered = this.expenses;

    // فلترة حسب الحدث
    if (this.selectedEventId) {
      filtered = filtered.filter(e => e.eventId === this.selectedEventId);
    }

    // فلترة حسب البحث
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(e =>
        e.name.toLowerCase().includes(term) ||
        e.category.toLowerCase().includes(term) ||
        this.getEventName(e.eventId).toLowerCase().includes(term)
      );
    }

    this.filteredExpenses = filtered;
    this.total = this.filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
  }

  addExpense() {
    if (!this.newExpense.name || !this.newExpense.amount || !this.newExpense.category || !this.selectedEventId)
      return;

    const expense: Expense = {
      id: Date.now(),
      eventId: this.selectedEventId,
      name: this.newExpense.name!,
      amount: +this.newExpense.amount!,
      category: this.newExpense.category!,
      date: new Date().toISOString(),
      notes: this.newExpense.notes || ''
    };

    this.http.post(`${this.jsonUrl}/expenses`, expense).subscribe(() => {
      this.newExpense = {};
      this.loadData();
    });
  }

  deleteExpense(id: number) {
    this.http.delete(`${this.jsonUrl}/expenses/${id}`).subscribe(() => {
      this.loadData();
    });
  }

  getEventName(eventId: number): string {
    const ev = this.events.find(e => e.id === eventId);
    return ev ? ev.name : '—';
  }
}
