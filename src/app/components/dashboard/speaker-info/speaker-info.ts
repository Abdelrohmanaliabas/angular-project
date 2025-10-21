import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-speaker-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './speaker-info.html',
  styleUrls: ['./speaker-info.css']
})
export class SpeakerInfo implements OnInit {
  speaker: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<any>(`http://localhost:3000/users/${id}`).subscribe((data) => {
      this.speaker = data;
    });
  }
}
