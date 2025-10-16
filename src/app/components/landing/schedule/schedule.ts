import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface ScheduleItem {
  speaker: string;
  role: string;
  title: string;
  image: string;
  date: string;
  expanded: boolean;
}

@Component({
  selector: 'app-schedule',
  imports: [CommonModule],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css'
})
export class Schedule {
  activeDay = 'day1';
   scheduleData: { [key: string]: ScheduleItem[] } = {
    day1: [
      {
        speaker: "Fredric Martin",
        role: "Digital Marketer",
        title: "BITPA Conference Dhaka Meet up 2023",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        date: "November 9-10",
        expanded: true
      },
      {
        speaker: "Betty D. Lucas",
        role: "Network Expert",
        title: "Business Conference Tokyo Meet up - 2023",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
        date: "November 9-10",
        expanded: false
      },
      {
        speaker: "Drew P. Bad",
        role: "Technology Specialist",
        title: "Cyber Security Conference Meet up Japan - 2023",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400",
        date: "November 9-10",
        expanded: false
      }
    ]
  };
  setActiveDay(day: string) {
    this.activeDay = day;
  }
    toggleScheduleItem(index: number) {
this.scheduleData['day1'][index].expanded = !this.scheduleData['day1'][index].expanded;
  }

}
