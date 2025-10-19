import { Component, Input, OnInit } from '@angular/core';
import { ExpenseService } from '../../../../core/services/expense.service';
import { Expense } from '../../../../core/models/expense.model';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-expenses',
  templateUrl: './event-expenses.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: './event-expenses.css'
})
export class EventExpenses implements OnInit {
  @Input() eventId!: number;
  expenses: Expense[] = [];
  total = 0;
  newExpense: Partial<Expense> = {};
  categories = ['Venue', 'Decoration', 'Food', 'Music', 'Transport', 'Miscellaneous'];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses() {
    this.expenses = this.expenseService.getByEventId(this.eventId);
    this.total = this.expenseService.getTotal(this.eventId);
  }

  addExpense() {
    if (!this.newExpense.name || !this.newExpense.amount || !this.newExpense.category) return;
    const expense: Expense = {
      id: 0,
      eventId: this.eventId,
      name: this.newExpense.name!,
      amount: +this.newExpense.amount!,
      category: this.newExpense.category! as any,
      date: new Date().toISOString(),
      notes: this.newExpense.notes || ''
    };
    this.expenseService.add(expense);
    this.newExpense = {};
    this.loadExpenses();
  }

  deleteExpense(id: number) {
    this.expenseService.delete(id);
    this.loadExpenses();
  }
}
