import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { Property } from 'src/app/shared/interfaces/property';
import { PropertyService } from 'src/app/shared/services/property.service';
import { PropertyFilter } from 'src/app/shared/interfaces/property-filter';
import { PropertyFilterComponent } from '../property-filter/property-filter.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [
    SearchBarComponent,
    PropertyFilterComponent,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  propertyService = inject(PropertyService);
  isLoggedIn: boolean = false;
  properties: Property[] = [];
  filteredProperties: Property[] = [...this.properties];

  // searchCriteria = {
  //   location: '',
  //   type: 'rent',
  //   maxPrice: null,
  // };

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Έλεγχος αν ο χρήστης είναι συνδεδεμένος
    this.isLoggedIn = !!localStorage.getItem('userToken');

    this.propertyService.getAllProperties().subscribe({
      next: (response) => {
        this.properties = response;
      },
      error: (response) => {
        console.log('Error retrieving properties', response);
      },
    });
  }

  logout(): void {
    localStorage.removeItem('userToken');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  onFiltersChanged(filters: PropertyFilter) {
    this.filteredProperties = this.properties.filter((property) => {
      return (
        (!filters.area || property.area.id === filters.area.id) &&
        (!filters.minPrice || property.price >= filters.minPrice) &&
        (!filters.maxPrice || property.price <= filters.maxPrice) &&
        (!filters.condition || property.condition === filters.condition) &&
        (!filters.propertyType ||
          property.propertyType === filters.propertyType) &&
        (!filters.minSquareMeters ||
          property.squareMeters >= filters.minSquareMeters) &&
        (!filters.maxSquareMeters ||
          property.squareMeters <= filters.maxSquareMeters)
      );
    });
  }
  // searchProperties(): void {
  //   console.log('Αναζήτηση για:', this.searchCriteria);
  //   // Καλέστε το backend API για αναζήτηση
  // }
}
