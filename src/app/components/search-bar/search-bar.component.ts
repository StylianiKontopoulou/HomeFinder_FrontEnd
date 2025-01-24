import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import 'hammerjs';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { Property } from 'src/app/shared/interfaces/property';
import { PropertyService } from 'src/app/shared/services/property.service';
import { MatOption, MatSelect } from '@angular/material/select';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-search-bar',
  imports: [FormsModule,
    MatSliderModule,
    ReactiveFormsModule,
    
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  propertyService = inject(PropertyService);
  
  searchForm: FormGroup;
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  // areas: string[] = ['Athens', 'Thessaloniki', 'Crete', 'Patras']; 
  priceRangeForm: FormGroup;
  selectedValue: 0;
  startValue:10;
  endValue: 10000;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      title: ['', Validators.required],
      // area: ['', Validators.required],
      priceMin: [null],
      priceMax: [null],
    });

    this.priceRangeForm = this.fb.group({
      priceRange: new FormControl([this.startValue, this.endValue]),
      startValue: [''],
      endValue: [''],
    });
  }

  ngOnInit(): void {
    this.loadProperties();
    
    ;
  }

  loadProperties(): void {
    const filters = this.searchForm.value; // Παίρνουμε τα φίλτρα από τη φόρμα
    this.propertyService.searchProperty(filters).subscribe((data: Property[]) => {
      this.properties = data;
      this.filteredProperties = data;
    });
  }
  // Συνάρτηση για την εμφάνιση των τιμών στο slider
  displayPriceRange(value: number): string {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD', // Μπορείς να το αλλάξεις σε οποιοδήποτε νόμισμα
    });
  }

  onSearch(): void {
    const { title, area, priceMin, priceMax } = this.searchForm.value;

    this.loadProperties();
    this.filteredProperties = this.properties.filter((property) => {
      const matchesTitle = property.title.toLowerCase().includes(title.toLowerCase());
      // const matchesArea = property.area.name === area;
      const matchesPrice =
        (!priceMin || property.price >= priceMin) &&
        (!priceMax || property.price <= priceMax);

      // return matchesTitle && matchesArea && matchesPrice;
      return matchesTitle && matchesPrice;
    });
  }

  // searchCriteria = {
  //   location: '',
  //   type: 'rent',
  //   maxPrice: null,
  // };
  // form = new FormGroup({
    
    
  // });

  // ngOnInit(): void {
  //   // Έλεγχος αν ο χρήστης είναι συνδεδεμένος
  //   this.isLoggedIn = !!localStorage.getItem('userToken');
  // }

  // logout(): void {
  //   localStorage.removeItem('userToken');
  //   this.isLoggedIn = false;
  //   this.router.navigate(['/login']);
  // }

  // searchProperty(property)  {
  //   // console.log('Search criteria:', this.searchCriteria);
  //   // Καλέστε το backend API για αναζήτηση
  //   this.propertyService.searchProperty(property).subscribe({
  //     next: (response: any) => {
  //       console.log('Search completed', response);
        
  //       this.propertyService.property.set({
  //         title: response.title,
  //         price: response.price,
  //       });
  //     },
  //     error: (response) => {
  //       const message = response.error.msg;
  //       console.log('Error searching property', message);
  //     },
  //   });
  }
