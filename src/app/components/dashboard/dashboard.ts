import { Component } from '@angular/core';
import { Sidebar } from '../shared/sidebar/sidebar';
import { Navbar } from '../shared/navbar/navbar';
import { EventCreation } from './events/event-creation/event-creation';


@Component({
  selector: 'app-dashboard',
  imports: [Sidebar ,Navbar ,EventCreation],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
