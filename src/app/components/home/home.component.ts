import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  imports: [SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isLoggedIn: boolean = false;
  searchCriteria = {
    location: '',
    type: 'rent',
    maxPrice: null,
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Έλεγχος αν ο χρήστης είναι συνδεδεμένος
    this.isLoggedIn = !!localStorage.getItem('userToken');
  }

  logout(): void {
    localStorage.removeItem('userToken');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  searchProperties(): void {
    console.log('Αναζήτηση για:', this.searchCriteria);
    // Καλέστε το backend API για αναζήτηση
  }
}
