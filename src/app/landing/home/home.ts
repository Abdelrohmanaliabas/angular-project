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
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
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
    }
  ];
  padZero(value: number): string {
    return String(value).padStart(2, '0');
  }
   getTimeUnits(): Array<{unit: string, value: number}> {
    return [
      { unit: 'days', value: this.timeLeft.days },
      { unit: 'hours', value: this.timeLeft.hours },
      { unit: 'minutes', value: this.timeLeft.minutes },
      { unit: 'seconds', value: this.timeLeft.seconds }
    ];
  }
    nextTestimonial() {
    this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
  }
    previousTestimonial() {
    this.currentTestimonial = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
  }
  testimonialAvatars = ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400', 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400', 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'];
    galleryImages = ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600', 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600', 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600', 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600', 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600', 'https://images.unsplash.com/photo-1502764613149-7f1d229e230f?w=600'];

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
}
