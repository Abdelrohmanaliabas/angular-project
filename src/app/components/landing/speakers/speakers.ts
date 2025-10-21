import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-speakers',
  imports: [CommonModule],
  templateUrl: './speakers.html',
  styleUrl: './speakers.css'
})
export class Speakers {
  speakers = [
    { image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", name: "John Doe", role: "Digital Marketer" },
    { image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400" , name: "Jane Smith", role: "SEO Specialist" },
    { image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" , name: "Mike Johnson", role: "Content Strategist" },
    { image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400" , name: "Emily Davis", role: "Social Media Manager" },
    { image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400", name: "David Wilson", role: "PPC Expert" },
  ];
}
