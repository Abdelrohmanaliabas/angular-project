import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<any>(`http://localhost:3000/speaker/${id}`).subscribe((data) => {
      this.speaker = data;
    });
  }

  // 🖊️ تعديل المتحدث
  editSpeaker() {
    const id = this.speaker.id;
    this.router.navigate(['dashboard/edit-speaker', id]);
  }

  // 🗑️ حذف المتحدث
  deleteSpeaker() {
    if (confirm('هل أنت متأكد أنك تريد حذف هذا المتحدث؟')) {
      const id = this.speaker.id;
      this.http.delete(`http://localhost:3000/speaker/${id}`).subscribe(() => {
        alert('تم حذف المتحدث بنجاح');
        this.router.navigate(['dashboard/speakers']); // رجوع لصفحة قائمة المتحدثين
      });
    }
  }
}
