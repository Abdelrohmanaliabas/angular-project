import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
interface Testimonial {
  name: string;
  role: string;
  text: string;
  image: string;
}
interface Sponsor {
  name: string;
  color: string;
}

@Component({
  selector: 'app-home',
  standalone: true,               // 👈 مهم جدًا
  imports: [CommonModule],        // 👈 يحتاج standalone
  templateUrl: './home.html',
  styleUrls: ['./home.css']       // 👈 جمع مش مفرد
})
export class Home {
  currentTestimonial = 0;

  timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

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
    },
    {
      name: "John Doe",
      role: "Digital Marketer",
      text: "The conference was a game-changer for my career. The speakers were exceptional, and the networking opportunities were invaluable.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    },
    {
      name: "Emily Johnson",
      role: "Product Manager",
      text: "The conference was a game-changer for my career. The speakers were exceptional, and the networking opportunities were invaluable.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    },
    {
      name: 'Sarah Johnson',
      role: 'Product Designer at UIWorks',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      text: 'Expovent 2023 was a transformative experience! I met inspiring people and gained valuable insights into the future of design and tech.'
    },
    {
      name: 'David Miller',
      role: 'Marketing Lead at BrightBrand',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      text: 'Absolutely amazing conference — great energy, fantastic sessions, and world-class speakers. Highly recommended!'
    },
    {
      name: 'Emma Wilson',
      role: 'Software Engineer at DevLab',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      text: 'Loved every second of it! The workshops were incredibly useful, and the networking opportunities were top-notch.'
    }
  ];

  padZero(value: number): string {
    return String(value).padStart(2, '0');
  }

  getTimeUnits(): Array<{ unit: string; value: number }> {
    return [
      { unit: 'days', value: this.timeLeft.days },
      { unit: 'hours', value: this.timeLeft.hours },
      { unit: 'minutes', value: this.timeLeft.minutes },
      { unit: 'seconds', value: this.timeLeft.seconds }
    ];
  }



  previousTestimonial() {
    this.currentTestimonial = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
  }
ngOnInit() {
  setInterval(() => this.nextTestimonial(), 5000);
}
nextTestimonial() {
  const card = document.querySelector('.fade-target');
  if (card) {
    card.classList.add('fade-enter');
    setTimeout(() => {
      this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
      card.classList.remove('fade-enter');
    }, 300);
  } else {
    this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
  }
}

  testimonialAvatars = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'
  ];

  galleryImages = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600',
    'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600',
    'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600',
    'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600',
    'https://images.unsplash.com/photo-1502764613149-7f1d229e230f?w=600'
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

  stats = [
    {
      number: 1030,
      label: 'Participants',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
    },
    {
      number: 1600,
      label: 'Speakers',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
    },
    {
      number: 1230,
      label: 'Workshops',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
    },
    {
      number: 1070,
      label: 'Awards Won',
      icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
    }
  ];
}
