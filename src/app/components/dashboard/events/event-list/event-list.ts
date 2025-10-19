import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Events } from '../../../../services/events';

@Component({
  selector: 'app-event-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList implements OnInit {
  events: any[] = [];
  constructor(private eventService: Events, private router: Router) {}
  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
    });
  }

  deleteEvent(id: number) {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.loadEvents();
    });
  }

  updateEvent(id:number){
    this.router.navigate(['/dashboard/event-edit',id]);
  }




//   userEvents: any[] = [];

// ngOnInit() {
//   const user = this.authService.getUser();

//   if (!user || !user.id) {
//     alert('You must be logged in.');
//     this.router.navigate(['/login']);
//     return;
//   }

//   this.eventService.getEventsByUser(user.id).subscribe((data) => {
//     this.userEvents = data;
//   });
// }
}
