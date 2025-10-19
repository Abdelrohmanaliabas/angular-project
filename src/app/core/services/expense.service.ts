import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private storageKey = 'expenses';

  getAll(): Expense[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  getByEventId(eventId: number): Expense[] {
    return this.getAll().filter(e => e.eventId === eventId);
  }

  add(expense: Expense): void {
    const expenses = this.getAll();
    expense.id = Date.now();
    expenses.push(expense);
    localStorage.setItem(this.storageKey, JSON.stringify(expenses));
  }

  update(expense: Expense): void {
    const expenses = this.getAll().map(e => e.id === expense.id ? expense : e);
    localStorage.setItem(this.storageKey, JSON.stringify(expenses));
  }

  delete(id: number): void {
    const expenses = this.getAll().filter(e => e.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(expenses));
  }

  getTotal(eventId: number): number {
    return this.getByEventId(eventId).reduce((sum, e) => sum + e.amount, 0);
  }

  getCategoryTotals(eventId: number): Record<string, number> {
    const data: Record<string, number> = {};
    this.getByEventId(eventId).forEach(e => {
      data[e.category] = (data[e.category] || 0) + e.amount;
    });
    return data;
  }
}
