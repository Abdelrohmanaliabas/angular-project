import { Component } from '@angular/core';
import { Sidebar } from '../shared/sidebar/sidebar';
import { Navbar } from '../shared/navbar/navbar';


@Component({
  selector: 'app-dashboard',
  imports: [Sidebar ,Navbar ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
