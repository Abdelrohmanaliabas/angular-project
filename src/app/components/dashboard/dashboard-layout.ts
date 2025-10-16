import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './shared/sidebar/sidebar';
import { Navbar } from './shared/navbar/navbar';
import { Footer } from './shared/footer/footer';


@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, Sidebar, Navbar, Footer],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css'
})
export class Dashboard {




}
