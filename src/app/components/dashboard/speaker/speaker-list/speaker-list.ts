import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-speaker-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './speaker-list.html',
  styleUrls: ['./speaker-list.css']
})
export class SpeakerList implements OnInit {
  speakers: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // جلب بيانات الـ speaker من الـ db.json
    this.http.get<any[]>('http://localhost:3000/speaker').subscribe((data) => {
      this.speakers = data;
    });
  }

  viewSpeaker(speaker: any) {
    this.router.navigate(['/dashboard/speaker-info', speaker.id]);
  }
}
