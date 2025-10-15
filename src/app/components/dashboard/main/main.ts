import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
interface EventItem {
  id: number;
  title: string;
  speaker: string;
  time: string;
  location: string;
  image: string;
}

interface TicketSale {
  event: string;
  sold: number;
  total: number;
}

interface Speaker {
  name: string;
  role: string;
  image: string;
}

interface Registration {
  id: string;
  name: string;
  seminar: string;
  time: string;
  date: string;
  status: string;
}
@Component({
  selector: 'app-main',
  imports: [CommonModule],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main implements OnInit, OnDestroy {
  darkMode = false;
  activeTab: 'this-week' | 'previous' = 'this-week';
  showScrollTop = false;
  currentMonth = new Date();

  events: EventItem[] = [
    {
      id: 1,
      title: 'Digital Business Summit - 2023',
      speaker: 'Andru Hebo',
      time: '9:00am- 5:00 pm',
      location: 'California(CA), 92677',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      title: 'NASA Space Apps Challenge Summit - 2023',
      speaker: 'Andru Hebo',
      time: '9:00am- 5:00 pm',
      location: 'California(CA), 92677',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      title: 'Digital Product Design & Interaction Seminar - 2023',
      speaker: 'Andru Hebo',
      time: '9:00am- 5:00 pm',
      location: 'California(CA), 92677',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&h=100&fit=crop'
    }
  ];

  ticketSales: TicketSale[] = [
    { event: 'Digital Business Summit - 2023', sold: 350, total: 175 },
    { event: 'NASA Space Apps Challenge Summit - 2023', sold: 250, total: 225 },
    { event: 'Digital Product Design & Interaction Seminar - 2023', sold: 163, total: 110 }
  ];

  speakers: Speaker[] = [
    { name: 'Harry Porter', role: 'Digital Marketer', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
    { name: 'Alex Don Smith', role: 'Creative Director', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
    { name: 'Lilyen Demi', role: 'Lilyen Demi', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    { name: 'Harry Porter', role: 'Digital Marketer', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' }
  ];

  notifications = [
    { id: 1, message: 'Mark your calendar for BITPA Conference Dhaka Meet up 2023', time: '2h ago', tag: 'Graphic Design' },
    { id: 2, message: "Get ready for today's Business Conference Tokyo Meet up - 2023!", time: '2h ago', tag: 'Graphic Design' },
    { id: 3, message: "You don't want to miss Digital Innovation Meet up!", time: '2h ago', tag: 'Graphic Design' },
    { id: 4, message: 'Digital Innovation Meet up Canada - 2023 starts in 5 minutes!', time: '2h ago', tag: 'Graphic Design' }
  ];

  registrations: Registration[] = [
    { id: '#3265', name: 'Harry Porter', seminar: 'Digital Product Design Seminar - 2023', time: '9:00am- 5:00 p m', date: '25 Jun 2023', status: 'Approved' },
    { id: '#6259', name: 'Lary go', seminar: 'Graphic Design Innovation Seminar- 2023', time: '9:00am- 5:00 p m', date: '28 Jun 2023', status: 'Pending' },
    { id: '#0326', name: 'Sumona Gang', seminar: 'Digital Product Design Seminar - 2023', time: '9:00am- 5:00 p m', date: '30 Jun 2023', status: 'Paid' },
    { id: '#9236', name: 'David Morph', seminar: 'Digital Product Design Seminar - 2023', time: '9:00am- 5:00 p m', date: '02 Feb 2023', status: 'Unpaid' },
    { id: '#0032', name: 'Willium Cany', seminar: 'Digital Product Design Seminar - 2023', time: '9:00am- 5:00 p m', date: '05 Feb 2023', status: 'Approved' },
    { id: '#0003', name: 'Keny Dinen', seminar: 'Product & Interaction Seminar - 2023', time: '9:00am- 5:00 p m', date: '15 Mar 2023', status: 'Paid' },
    { id: '#1985', name: 'Frintim Zomata', seminar: 'Digital Product Design Seminar - 2023', time: '9:00am- 5:00 p m', date: '25 Mar 2023', status: 'Pending' }
  ];

  // Scroll listener via HostListener
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollTop = window.scrollY > 300;
  }

  ngOnInit(): void {
    // nothing else needed — HostListener handles scroll
  }

  ngOnDestroy(): void {
    // no manual listener to remove thanks to HostListener
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setTab(tab: 'this-week' | 'previous') {
    this.activeTab = tab;
  }

  getStatusColor(status: string) {
    // return CSS classes (tailwind-like names used in template CSS)
    switch (status) {
      case 'Approved': return this.darkMode ? 'status-approved-dark' : 'status-approved';
      case 'Pending': return this.darkMode ? 'status-pending-dark' : 'status-pending';
      case 'Paid': return this.darkMode ? 'status-paid-dark' : 'status-paid';
      case 'Unpaid': return this.darkMode ? 'status-unpaid-dark' : 'status-unpaid';
      default: return this.darkMode ? 'status-default-dark' : 'status-default';
    }
  }

  // Helper to compute progress percent (guard divide by zero)
  progressPercent(item: TicketSale) {
    return item.total ? Math.round((item.sold / item.total) * 100) : 0;
  }
}
