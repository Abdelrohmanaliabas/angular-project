import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { firstValueFrom } from 'rxjs';
import { GuestsService, GuestModel } from './guests.service';
import { EventsService, EventModel } from './events.service';
import { environment } from '../../core/services/environments';

@Injectable({ providedIn: 'root' })
export class FeedbackMailService {
  constructor(
    private guestsService: GuestsService,
    private eventsService: EventsService
  ) {}

  // ✉️ إرسال إيميل فردي
  private async sendMail(guest: GuestModel, event: EventModel) {
    const feedbackUrl = `http://localhost:3000/feedback/${event.id}/${guest.id}`;

    const params = {
      to_name: guest.name,
      to_email: guest.email,
      event_title: event.title,
      feedback_link: feedbackUrl,
    };

    try {
      await emailjs.send(
        environment.emailServiceId,
        environment.emailTemplateId,
        params,
        environment.emailPublicKey
      );

      console.log(`✅ Email sent to ${guest.email}`);

      // تحديث حالة الضيف بعد الإرسال
      await firstValueFrom(
        this.guestsService.update(guest.id, { status: 'FeedbackSent' })
      );

    } catch (err) {
      console.error(`❌ Failed to send email to ${guest.email}`, err);
    }
  }

  // 🚀 إرسال روابط feedback لكل الأحداث المكتملة تلقائيًا
  async sendFeedbackLinksForCompletedEvents() {
    // نستخدم firstValueFrom بدل toPromise (لأن toPromise deprecated)
    const events = await firstValueFrom(this.eventsService.list());
    if (!events || events.length === 0) return;

    const completedEvents = events.filter((e) => e.status === 'Completed');

    for (const event of completedEvents) {
      // نجلب الضيوف التابعين لهذا الحدث
      const guestsResponse = await firstValueFrom(
        this.guestsService.list(1, 100, '', [event.id])
      );

      const guests = guestsResponse?.data || [];

      for (const guest of guests) {
        // تأكد أن الإيميل ماتبعتش قبل كده
        if (guest.status !== 'FeedbackSent') {
          await this.sendMail(guest, event);
        }
      }
    }

    console.log('🎉 All feedback emails sent for completed events.');
  }
}
