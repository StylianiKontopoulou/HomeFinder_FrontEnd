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
import { MatGridListModule } from '@angular/material/grid-list';
import EnumHelpers from 'src/app/shared/helpers/enumHelpers';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyUse } from 'src/app/shared/enums/propertyUse';

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
    MatGridListModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './property-form.component.html',
  styleUrl: './property-form.component.css',
})
export class PropertyFormComponent implements OnInit {
  isEditMode: boolean = false;
  router = inject(Router);
  route = inject(ActivatedRoute);
  propertyService = inject(PropertyService);
  areaService = inject(AreaService);
  propertyConditions: { value: PropertyCondition; label: string }[];
  energyClasses: { value: EnergyClass; label: string }[];
  propertyTypes: { value: PropertyType; label: string }[];
  propertyUses: {value: PropertyUse; label: string }[];
  areas: Area[];
  imageError: string | null = null;

  form = new FormGroup({
    id: new FormControl(null),
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
    areaId: new FormControl('', Validators.required),
    image: new FormControl(''),
    propertyUse: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.propertyConditions = Object.keys(PropertyCondition).map((key) => ({
      value: PropertyCondition[key as keyof typeof PropertyCondition],
      label: EnumHelpers.getLabelForPropertyCondition(
        PropertyCondition[key as keyof typeof PropertyCondition],
      ),
    }));

    this.energyClasses = Object.keys(EnergyClass).map((key) => ({
      value: EnergyClass[key as keyof typeof EnergyClass],
      label: EnumHelpers.getLabelForEnergyClass(
        EnergyClass[key as keyof typeof EnergyClass],
      ),
    }));

    this.propertyUses = Object.keys(PropertyUse).map((key) => ({
      value: PropertyUse[key as keyof typeof PropertyUse],
      label: EnumHelpers.getLabelForPropertyUse(
        PropertyUse[key as keyof typeof PropertyUse],
      ),
    }));

    this.propertyTypes = Object.keys(PropertyType).map((key) => ({
      value: PropertyType[key as keyof typeof PropertyType],
      label: EnumHelpers.getLabelForPropertyType(
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

    let propertyId = this.route.snapshot.paramMap.get('id');
    if (!!propertyId) {
      this.isEditMode = true;
      this.propertyService.getProperty(+propertyId).subscribe({
        next: (response) => {
          this.form.patchValue({
            id: response.id.toString(),
            title: response.title,
            description: response.description,
            yearOfConstruction: response.yearOfConstruction.toString(),
            price: response.price.toString(),
            squareMeters: response.squareMeters.toString(),
            floor: response.floor.toString(),
            bathrooms: response.bathrooms.toString(),
            bedrooms: response.bedrooms.toString(),
            condition: response.condition.toString(),
            energyClass: response.energyClass.toString(),
            propertyType: response.propertyType.toString(),
            areaId: response.area.id,
            image: response.image?.toString(),
            propertyUse: response.propertyUse.toString()
          });
        },
        error: (response) => {
          const message = response.error.msg;
          console.log('Error getting property', message);
        },
      });
    }
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

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      let area = this.areas.find((x) => x.id === +formValue.areaId);
      delete formValue.areaId;
      const property = {
        ...(this.form.value as unknown as Property),
        area: area,
      };
      // Edit mode
      if (this.isEditMode) {
        this.propertyService.updateProperty(property).subscribe({
          next: (response) => {
            this.router.navigate(['my-properties']);
          },
          error: (response) => {
            const message = response.error.msg;
            console.log('Error updating property', message);
          },
        });
      }
      // Add new property
      else {
        this.propertyService.addProperty(property).subscribe({
          next: (response) => {
            this.router.navigate(['my-properties']);
          },
          error: (response) => {
            const message = response.error.msg;
            console.log('Error adding property', message);
          },
        });
      }
    }
  }
}
