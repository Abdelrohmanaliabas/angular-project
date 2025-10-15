import { Component } from '@angular/core';
import { LandingFooter } from '../../components/shared/landing-footer/landing-footer';
import { LandingNavbar } from '../../components/shared/landing-navbar/landing-navbar';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-main-layout',
  imports: [LandingFooter, LandingNavbar, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout {

}
