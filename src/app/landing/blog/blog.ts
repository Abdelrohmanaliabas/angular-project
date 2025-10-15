import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface BlogPost {
  title: string;
  date: string;
  comments: number;
  image: string;
}
@Component({
  selector: 'app-blog',
  imports: [CommonModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog {
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

}
