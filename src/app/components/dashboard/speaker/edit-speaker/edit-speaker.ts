import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-speaker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-speaker.html',
  styleUrls: ['./edit-speaker.css']
})
export class EditSpeaker implements OnInit {
  speaker: any = {};

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<any>(`http://localhost:3000/speaker/${id}`).subscribe((data) => {
      this.speaker = data;
    });
  }

  updateSpeaker() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.put(`http://localhost:3000/speaker/${id}`, this.speaker).subscribe(() => {
      alert('تم تعديل بيانات المتحدث بنجاح ✅');
      this.router.navigate(['dashboard/speaker-info', id]);
    });
  }

  cancelEdit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['dashboard/speaker-info', id]);
  }
}
