import { Locations } from './locations/locations';
// import { EventList } from './events/event-list/event-list';
import { Component } from '@angular/core';
import { Sidebar } from '../shared/sidebar/sidebar';
import { Navbar } from '../shared/navbar/navbar';
// import { TabViewModule } from 'primeng/tabview';
// import { EventCreation } from './events/event-creation/event-creation';
// import { Main } from './main/main';
// import { SpeakerList } from './speaker-list/speaker-list';
// import { Profile } from './profile/profile';
// import { Calender } from './calender/calender';
// import { Schedule } from './schedule/schedule';
// import { AttendList } from './attend-list/attend-list';
// import { EventDetails } from './events/event-details/event-details';
// import { ProfileSetting } from './profile/profile-setting/profile-setting';
// import { AttendList } from './attend-list/attend-list';
// import { EventList } from './events/event-list/event-list';

@Component({
  selector: 'app-dashboard',
  imports: [Sidebar,Navbar,Locations],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
