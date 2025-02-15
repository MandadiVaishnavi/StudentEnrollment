import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,  // Mark this component as standalone
  imports: [CommonModule, MatButtonModule, MatToolbarModule],  // Import the required modules
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showNavbar: boolean = true;  // Initially show the navbar
  private routeSub!: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Subscribe to router changes to dynamically hide/show navbar
    this.routeSub = this.router.events.subscribe(() => {
      const currentRoute = this.router.url; // Get the current route
      if (currentRoute === '/') {
        this.showNavbar = false; // Hide navbar if on home page
      } else {
        this.showNavbar = true; // Show navbar for other routes
      }
    });
  }

  // Cleanup subscription on component destroy
  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
