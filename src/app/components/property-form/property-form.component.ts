import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Property } from 'src/app/shared/interfaces/property';
import { PropertyService } from 'src/app/shared/services/property.service';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

@Component({
  selector: 'app-property-form',
  imports: [
  ReactiveFormsModule,
  // BrowserAnimationsModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule, 
  MatIconModule],
  templateUrl: './property-form.component.html',
  styleUrl: './property-form.component.css'
})
export class PropertyFormComponent {

  propertyService = inject(PropertyService);

  propertyConditions = ['NEWLY_BUILT', 'UNDER_CONSTRUCTION', 'RENOVATED', 'NEEDS_RENOVATION'];
  energyClasses = ['Aplus', 'A', 'Bplus', 'B', 'C', 'D', 'E', 'Z', 'H'];
  propertyTypes = [
    'APARTMENT',
    'MAISONETTE',
    'DETACHED_HOUSE',
    'BUILDING',
    'PENTHOUSE',
    'FULL_FLOOR_APARTMENT',
  ];
  areas = []; // To be populated dynamically from the backend.


  form = new FormGroup(
    {
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      yearOfConstruction: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      squareMeters: new FormControl('', Validators.required),
      floor: new FormControl('', Validators.required),
      bathrooms: new FormControl('', Validators.required),
      bedrooms: new FormControl('', Validators.required),
      propertyCondition: new FormControl('', Validators.required),
      energyClass: new FormControl('', Validators.required),
      propertyType: new FormControl('', Validators.required),
      area: new FormControl('', Validators.required),
      
    }
  );

  onSubmit(value: any) {
    console.log(value);

    const property = this.form.value as unknown as Property;
    

    this.propertyService.addProperty(property).subscribe({
      next: (response) => {
        console.log('Property added', response);
        
      },
      error: (response) => {
        const message = response.error.msg;
        console.log('Error adding property', message);
       
      },
    });
  }

}
