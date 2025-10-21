import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-speaker-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './speaker-list.html',
  styleUrls: ['./speaker-list.css']
})
export class SpeakerList implements OnInit {
  speakers: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/users').subscribe((data) => {
      this.speakers = data.filter((u) => u.role === 'speaker');
    });
  }

  viewSpeaker(speaker: any) {
    this.router.navigate(['/dashboard/speaker-info', speaker.id]);
  }
}
