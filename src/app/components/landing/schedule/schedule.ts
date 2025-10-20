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
  standalone: true,
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
        date: "November 9",
        expanded: false,
      },
      {
        speaker: "Betty D. Lucas",
        role: "Network Expert",
        title: "Business Growth & Strategy Panel",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
        date: "November 9",
        expanded: false,
      },
      {
        speaker: "David Zhang",
        role: "Tech Evangelist",
        title: "Digital Transformation for 2025",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400",
        date: "November 9",
        expanded: false,
      }
    ],

    day2: [
      {
        speaker: "John Lee",
        role: "AI Researcher",
        title: "Exploring the Future of AI in 2025",
        image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400",
        date: "November 10",
        expanded: false,
      },
      {
        speaker: "Nora Alvarez",
        role: "Machine Learning Expert",
        title: "How Neural Networks Are Changing the World",
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400",
        date: "November 10",
        expanded: false,
      },
      {
        speaker: "Hiro Tanaka",
        role: "Robotics Engineer",
        title: "The Human Touch in Automation",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
        date: "November 10",
        expanded: false,
      }
    ],

    day3: [
      {
        speaker: "Samantha Cruz",
        role: "UX Strategist",
        title: "Designing the Next Era of Experiences",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
        date: "November 11",
        expanded: false,
      },
      {
        speaker: "Marcus Brown",
        role: "Creative Director",
        title: "Storytelling in the Digital Age",
        image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=400",
        date: "November 11",
        expanded: false,
      },
      {
        speaker: "Olivia Bennett",
        role: "Product Manager",
        title: "Building Products That People Love",
        image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400",
        date: "November 11",
        expanded: false,
      }
    ]
  };

  setActiveDay(day: string) {
    this.activeDay = day;
  }

  toggleScheduleItem(index: number) {
    this.scheduleData[this.activeDay][index].expanded =
      !this.scheduleData[this.activeDay][index].expanded;
  }
}
