import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

interface Testimonial {
  name: string;
  role: string;
  text: string;
  image: string;
}

interface ScheduleItem {
  speaker: string;
  role: string;
  title: string;
  image: string;
  date: string;
  expanded: boolean;
}

interface BlogPost {
  title: string;
  date: string;
  comments: number;
  image: string;
}

interface Sponsor {
  name: string;
  color: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css'
})
export class LandingPage  implements OnInit, OnDestroy {
  isMenuOpen = false;
  activeDay = 'day1';
  currentTestimonial = 0;
  timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  
  private timerSubscription?: Subscription;

  testimonials: Testimonial[] = [
    {
      name: "Dio Caprio",
      role: "CEO - XYZ Innovation",
      text: "It is a sequence of Latin words that, as they are positioned, do not form sentences with a complete sense, but give life to a test text useful to fill spaces that will subsequently be occupied from ad hoc texts composed by communication professionals.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
    },
    {
      name: "Jane Smith",
      role: "CTO - Tech Solutions",
      text: "An incredible experience that brought together the brightest minds in technology. The networking opportunities were unparalleled.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400"
    }
  ];

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

  speakers = [
    { image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
    { image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400" },
    { image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" },
    { image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400" },
    { image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" }
  ];

  blogPosts: BlogPost[] = [
    {
      title: "How To Get Started Learning JavaScript The Right Way",
      date: "15 Nov, 2023",
      comments: 0,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600"
    },
    {
      title: "How To Get Started Learning JavaScript The Right Way",
      date: "20 Sep, 2023",
      comments: 0,
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600"
    },
    {
      title: "How To Get Started Learning JavaScript The Right Way",
      date: "25 Sep, 2023",
      comments: 3,
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600"
    }
  ];

  sponsors: Sponsor[] = [
    { name: "FINACON", color: "text-emerald-500" },
    { name: "METAZOFI", color: "text-red-500" },
    { name: "SECURIZO", color: "text-blue-600" },
    { name: "TECHTUNE", color: "text-emerald-600" },
    { name: "GLOBEIO", color: "text-blue-500" },
    { name: "SQUAREE", color: "text-yellow-500" },
    { name: "ELECTRO", color: "text-blue-700" },
    { name: "VECUREZ", color: "text-red-400" },
    { name: "ELANMAS", color: "text-orange-500" },
    { name: "GOOGLE", color: "text-blue-600" }
  ];

  galleryImages = Array(8).fill(0).map((_, i) => 
    `https://images.unsplash.com/photo-${1540575467063 + i * 10000}?w=600`
  );

  testimonialAvatars = Array(6).fill(0).map((_, i) => 
    `https://images.unsplash.com/photo-${1500648767791 + i * 1000}?w=100`
  );

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  startCountdown() {
    const targetDate = new Date('2024-11-09T00:00:00');
    
    this.timerSubscription = interval(1000).subscribe(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        this.timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  setActiveDay(day: string) {
    this.activeDay = day;
  }

  toggleScheduleItem(index: number) {
this.scheduleData['day1'][index].expanded = !this.scheduleData['day1'][index].expanded;
  }

  previousTestimonial() {
    this.currentTestimonial = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
  }

  nextTestimonial() {
    this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  padZero(value: number): string {
    return String(value).padStart(2, '0');
  }
getTicket() {
  window.location.href = ('/get-ticket');
}

  getTimeUnits(): Array<{unit: string, value: number}> {
    return [
      { unit: 'days', value: this.timeLeft.days },
      { unit: 'hours', value: this.timeLeft.hours },
      { unit: 'minutes', value: this.timeLeft.minutes },
      { unit: 'seconds', value: this.timeLeft.seconds }
    ];
  }
}
