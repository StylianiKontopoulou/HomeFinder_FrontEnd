import { Component, OnInit, inject } from '@angular/core';
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
import { AreaService } from 'src/app/shared/services/area.service';
import { Area } from 'src/app/shared/interfaces/area';
import { PropertyType } from 'src/app/shared/enums/propertyType';
import { EnergyClass } from 'src/app/shared/enums/energyClass';
import { PropertyCondition } from 'src/app/shared/enums/propertyCondition';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './property-form.component.html',
  styleUrl: './property-form.component.css',
})
export class PropertyFormComponent implements OnInit {
  propertyService = inject(PropertyService);
  areaService = inject(AreaService);

  propertyConditions: { value: PropertyCondition; label: string }[];
  energyClasses: { value: EnergyClass; label: string }[];
  propertyTypes: { value: PropertyType; label: string }[];
  areas: Area[];
  imageError: string | null = null;

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    yearOfConstruction: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    squareMeters: new FormControl('', Validators.required),
    floor: new FormControl('', Validators.required),
    bathrooms: new FormControl('', Validators.required),
    bedrooms: new FormControl('', Validators.required),
    condition: new FormControl('', Validators.required),
    energyClass: new FormControl('', Validators.required),
    propertyType: new FormControl('', Validators.required),
    area: new FormControl('', Validators.required),
    image: new FormControl('')
  });

  ngOnInit(): void {
    this.propertyConditions =  Object.keys(PropertyCondition).map((key) => ({
      value: PropertyCondition[key as keyof typeof PropertyCondition],
      label: this.getLabelForPropertyCondition(
        PropertyCondition[key as keyof typeof PropertyCondition],
      ),
    }));

    this.energyClasses = Object.keys(EnergyClass).map((key) => ({
      value: EnergyClass[key as keyof typeof EnergyClass],
      label: this.getLabelForEnergyClass(
        EnergyClass[key as keyof typeof EnergyClass],
      ),
    }));

    this.propertyTypes = Object.keys(PropertyType).map((key) => ({
      value: PropertyType[key as keyof typeof PropertyType],
      label: this.getLabelForPropertyType(
        PropertyType[key as keyof typeof PropertyType],
      ),
    }));
    this.areaService.getAllAreas().subscribe({
      next: (response) => {
        this.areas = response;
      },
      error: (response) => {
        const message = response.error.msg;
        console.log('Error adding property', message);
      },
    });
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      if (file.size > 500 * 1024) {
        this.imageError = 'Image size should not exceed 500KB.';
        this.form.get('image')?.setValue(null);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.form.get('image')?.setValue(base64String);
        this.imageError = null;
      };
      reader.readAsDataURL(file);
    }
  }
  getLabelForPropertyType(type: PropertyType): string {
    const labels = {
      [PropertyType.APARTMENT]: 'Apartment',
      [PropertyType.MAISONETTE]: 'Maisonette',
      [PropertyType.DETACHED_HOUSE]: 'Detached house',
      [PropertyType.BUILDING]: 'Building',
      [PropertyType.PENTHOUSE]: 'Penthouse',
      [PropertyType.FULL_FLOOR_APARTMENT]: 'Full floor apartment',
    };
    return labels[type];
  }

  getLabelForPropertyCondition(type: PropertyCondition): string {
    const labels = {
     
      [PropertyCondition.NEWLY_BUILT]: 'Newly built',
      [PropertyCondition.UNDER_CONSTRUCTION]: 'Under construction',
      [PropertyCondition.RENOVATED]: 'Renovated',
      [PropertyCondition.NEEDS_RENOVATION]: 'Needs renovation',
    };
    return labels[type];
  }

  getLabelForEnergyClass(type: EnergyClass): string {
    const labels = {
      [EnergyClass.A_PLUS]: 'A+',
      [EnergyClass.A]: 'A',
      [EnergyClass.B_PLUS]: 'B+',
      [EnergyClass.B]: 'B',
      [EnergyClass.C]: 'C',
      [EnergyClass.D]: 'D',
      [EnergyClass.E]: 'E',
      [EnergyClass.Z]: 'Z',
      [EnergyClass.H]: 'H',
    };
    return labels[type];
  }

  onSubmit() {
    const property = this.form.value as unknown as Property;
    console.log(property);
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
